import { ClubLevelEnum, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { CancelTypingComposer, ChatComposer, ShoutComposer, StartTypingComposer, WhisperComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo, useRef, useState } from 'react';

import { IChatStyle, isNftChatStyle, isStaticChatStyle } from '#base/chat';
import { openHabbiconHub, requestChatCommandSuggestions, resetUnseenHabbicons, runRoomChatCommand, runWiredChatCommand, setChatFontSizeMode, setPreferredChatStyle, triggerHabbicon, withSelectedAvatarName } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { HabbiconsStore, useHabbiconsStore } from '#base/context/habbicons';
import { getUnseenItemCount, UnseenItemCategory, useInventoryStore } from '#base/context/inventory';
import { roomStore, useRoom, useRoomChatActions, useRoomIsSpectating, useRoomStore } from '#base/context/room';
import { useConfigValue, useFriendBarWidth, useToolbarAreaWidth, useTranslation } from '#base/context/system';
import { ClientGates, useClientGate, useOwnClubLevel, useOwnIsAmbassador, useRoomToolsCollapsed, useUserStore } from '#base/context/user';
import { useChatStyles, useViewportSize } from '#base/hooks';
import { Box, findTemplateChild, GlobalRect, Template, TemplateWindow, TextInput, useTemplate } from '#base/theme';
import { completeChatCommand, findInvalidArguments, IChatCommandCompletion, mergeChatCommands } from '#base/utils';
import { roomToolsRight } from '#base/views/room-widgets/room-tools/roomToolsGeometry';
import { UnseenItemCounterView } from '#base/views/system/UnseenItemCounterView';

import { ChatCommandSuggestionsView } from './ChatCommandSuggestionsView';
import { chatInputClientCommands } from './chatInputClientCommands';
import { ChatStyleSelectorView } from './ChatStyleSelectorView';
import { HabbiconSelectorView } from './HabbiconSelectorView';

/** `createWindow`'s `chatinput_window_new`; `bubblecont` is the bar it places. */
const CHAT_INPUT_TEMPLATE = 'habbo-room-ui-com/chatinput_window_new';
/** `RoomChatInputView.updatePosition` - the gap kept from whatever sits left of the chat bar. */
const LEFT_MARGIN = 12;
/** The room the centred bar must leave the toolbar's icons on top of its own margin - `updatePosition`'s `+ 100`. */
const TOOLBAR_CLEARANCE = 100;
/** `bubblecont.y`: `height - 104` in the toolbar, `height - 160` above it. */
const BUBBLECONT_FROM_BOTTOM_IN_TOOLBAR = 104;
const BUBBLECONT_FROM_BOTTOM_ABOVE_TOOLBAR = 160;
/** The Flash `chat_input` field: Ubuntu 17, 100 characters. */
const MAX_CHARS = 100;
/** `_typingTimer` / `_idleTimer` - typing is announced after a second of it, withdrawn after ten idle. */
const TYPING_DELAY_MS = 1000;
const IDLE_DELAY_MS = 10000;
/** No style picked in this session yet - send whatever the account preference says (`ChatStyleSelector._Str_22824`). */
const NO_STYLE_SELECTED = -1;
/** How long typing pauses before the server is asked what to offer (`chat.commands.v2`). */
const SUGGEST_DELAY_MS = 120;
const NO_COMPLETION: IChatCommandCompletion = { suggestions: [], request: null };
/** An argument the server would refuse: the red of the field's own flood warning (`block_text`). */
const INVALID_ARGUMENT_COLOR = '#ff0000';

type Rect = { x: number; y: number; width: number; height: number };

/**
 * What the bar is placed by, read off its layout: `bubblecont`'s width, `chat_input_container`'s y in
 * it, `input_border` in that row (the command list stands on it, as wide), `chat_input` in the
 * border, and the `styles` and `chat_extra_button` buttons in the row.
 */
const readLayout = (template: Template) => {
    const rectOf = (name: string): Rect | undefined => {
        const element = findTemplateChild(template.elements, name);

        return element && { x: element.x, y: element.y, width: element.width, height: element.height };
    };
    const bubble = rectOf('bubblecont');
    const row = rectOf('chat_input_container');
    const border = rectOf('input_border');
    const input = rectOf('chat_input');
    const styles = rectOf('styles');
    const extra = rectOf('chat_extra_button');

    return (bubble && row && border && input && styles && extra) ? { width: bubble.width, row, border, input, styles, extra } : undefined;
};

/**
 * `resolveHabbiconButtonSetIconCollectionId`: with the shop data in, the set of the last habbicon
 * used - its shop item's, or the set it is the reward of - else the shop's first set; 0 for none.
 */
const resolveHabbiconButtonSetIconCollectionId = (state: HabbiconsStore): number => {
    if (!state.hasLoadedShopData) return 0;

    const recent = state.recentHabbiconIds[0] ?? 0;

    if (recent > 0) {
        const itemCollection = state.shopItems[recent]?.collectionId ?? 0;

        if (itemCollection > 0) return itemCollection;

        const rewarding = state.shopCollections.find(collection => collection.rewardHabbiconId === recent);

        if (rewarding) return rewarding.collectionId;
    }

    return state.shopCollections[0]?.collectionId ?? 0;
};

/**
 * The Flash `RoomChatInputWidget` + `RoomChatInputView` (`chatinput_window_new`): the bar above
 * the toolbar with the style picker on the left and the text field. Typing anywhere focuses it;
 * Enter speaks, Shift+Enter shouts; a leading `:whisper name`, `:shout` or `:speak` picks the
 * mode (Space after `:whisper` fills in the selected avatar's name); typing status is sent
 * after a second and cancelled after ten idle; a flood-control block swaps the field for the
 * countdown; the avatar menu's "whisper" pre-fills the field through the room store.
 *
 * Not Flash's: with a Turbo server's `chat.commands.v2`, a `:command` being typed is completed from
 * the commands the user may use (`ChatCommandSuggestionsView`), with the keys of Habbo's gift
 * window's friend suggestions (`PurchaseConfirmationDialog.onNameInputKeyUp`): Up and Down move
 * the highlight round the list, Enter takes it - when it would change the line; a line already
 * whole is still sent - and Tab always does. Escape puts the list away until the line changes.
 */
export const RoomChatInputView = () => {
    const t = useTranslation();
    const room = useRoom();
    // `RoomUI` creates `RWE_CHAT_INPUT_WIDGET` only for a session that is not spectating.
    const isSpectating = useRoomIsSpectating();
    const { send } = useWebSocketContext();
    const floodBlockSeconds = useRoomStore(x => x.floodBlockSeconds);
    const floodBlockStamp = useRoomStore(x => x.floodBlockStamp);
    const allStyles = useChatStyles();
    const { clearChatInputContent } = useRoomChatActions();
    const preferredChatStyle = useUserStore(x => x.preferredChatStyle);
    const chatSizePreference = useUserStore(x => x.chatSizePreference);
    const clubLevel = useOwnClubLevel();
    const isStaff = useClientGate(ClientGates.StaffChatStyles);
    const mayUseWired = useClientGate(ClientGates.WiredMenu);
    const isAmbassador = useOwnIsAmbassador();
    const nftChatStyles = useUserStore(x => x.nftChatStyles);
    const purchasableChatStyles = useUserStore(x => x.purchasableChatStyles);
    const selectedAvatarId = useRoomStore(x => x.selectedAvatarId);
    const selectedAvatarName = useRoomStore(x => x.usersByRoomObjectId[selectedAvatarId]?.name ?? '');
    const customStylesEnabled = useConfigValue<boolean>('custom.chat.styles.enabled') === true;
    const habbiconsEnabled = useConfigValue<boolean>('habbicons.enabled') === true;
    const unseenHabbicons = useInventoryStore(x => getUnseenItemCount(x.unseenItems, UnseenItemCategory.HABBICONS));
    const setIconCollectionId = useHabbiconsStore(resolveHabbiconButtonSetIconCollectionId);
    const hasSetIcon = useHabbiconsStore(x => !!x.outlinedCollectionIcons[setIconCollectionId]);
    const setIconAsset = hasSetIcon ? `habbicon_collection_icon_outlined_${setIconCollectionId}` : undefined;
    const disabledStyles = useConfigValue<string>('disabled.custom.chat.styles') ?? '';
    const chatCommands = useUserStore(x => x.chatCommands);
    const chatCommandSuggestions = useUserStore(x => x.chatCommandSuggestions);
    const controllerLevel = useRoomStore(x => x.controllerLevel);
    const usersByRoomObjectId = useRoomStore(x => x.usersByRoomObjectId);
    // The bar starts where the room tools end, as `RoomToolsWidget.getWidgetAreaWidth` told it to.
    const roomToolsCollapsed = useRoomToolsCollapsed();
    const { width: viewportWidth, height: viewportHeight } = useViewportSize();
    const toolbarAreaWidth = useToolbarAreaWidth();
    const friendBarWidth = useFriendBarWidth();
    const template = useTemplate(CHAT_INPUT_TEMPLATE);
    const layout = useMemo(() => (template ? readLayout(template) : undefined), [ template ]);

    const [ value, setValue ] = useState('');
    const [ cursor, setCursor ] = useState(0);
    const [ replacementCursor, setReplacementCursor ] = useState<number | null>(null);
    const [ selectionRequestId, setSelectionRequestId ] = useState(0);
    const [ focused, setFocused ] = useState(false);
    const [ floodRemaining, setFloodRemaining ] = useState(0);
    // Where the `styles` button is on screen while its menu is open (the menu floats above it), or null while it is shut.
    const [ stylesAnchor, setStylesAnchor ] = useState<GlobalRect | null>(null);
    const [ selectedStyleId, setSelectedStyleId ] = useState(NO_STYLE_SELECTED);
    const [ highlightIndex, setHighlightIndex ] = useState(0);
    // The suggestions shown last, so the highlight goes back to the top when they change.
    const [ highlightFor, setHighlightFor ] = useState('');
    // The line the command list was put away on (Escape, a click elsewhere); it stays away until the line changes.
    const [ suggestionsDismissedFor, setSuggestionsDismissedFor ] = useState<string | null>(null);

    const isTypingRef = useRef(false);
    const typingStartedSentRef = useRef(false);
    const typingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const lastContentRef = useRef('');
    const valueRef = useRef(value);
    const focusedRef = useRef(focused);
    const onChangeRef = useRef<(next: string) => void>(() => undefined);
    /** The style menu closes on any outside pointerdown - including the one that starts a tap on its own button, which must not reopen it. */
    const stylesClosedAtRef = useRef(0);
    const [ habbiconsAnchor, setHabbiconsAnchor ] = useState<GlobalRect | null>(null);
    const habbiconsClosedAtRef = useRef(0);

    useEffect(() => {
        valueRef.current = value;
        focusedRef.current = focused;
    });

    const roomUserNames = useMemo(() => Object.values(usersByRoomObjectId).filter(x => x.userType === RoomObjectUserType.User).map(x => x.name), [ usersByRoomObjectId ]);

    // The client's own `:words` and, from a Turbo server, the commands it says the user may use.
    const commands = useMemo(() => mergeChatCommands(chatInputClientCommands({
        whisperMode: t('widgets.chatinput.mode.whisper', ':whisper'),
        shoutMode: t('widgets.chatinput.mode.shout', ':shout'),
        speakMode: t('widgets.chatinput.mode.speak', ':speak'),
        whisper: t('widgets.chatinput.command.whisper', 'Whisper to someone in the room'),
        shout: t('widgets.chatinput.command.shout', 'Shout to the whole room'),
        speak: t('widgets.chatinput.command.speak', 'Talk normally'),
        wiredMenu: t('widgets.chatinput.command.wired', 'Open the wired menu'),
        variables: t('widgets.chatinput.command.variables', 'Open the wired variables'),
        inspection: t('widgets.chatinput.command.inspection', 'Open the wired inspection'),
        playTest: t('widgets.chatinput.command.playtest', 'Turn wired play test on or off'),
        wiredReset: t('widgets.chatinput.command.wiredreset', 'Close the wired setup'),
        userChooser: t('widgets.chatinput.command.chooser', 'List everyone in the room'),
        furniChooser: t('widgets.chatinput.command.furni', 'List the furni in the room'),
        pickAll: t('widgets.chatinput.command.pickall', 'Pick up all your furni in the room'),
        pickAllBuildersClub: t('widgets.chatinput.command.pickallbc', 'Pick up all Builders Club furni in the room'),
        resetScores: t('widgets.chatinput.command.resetscores', 'Reset the room\'s scores'),
        ejectAll: t('widgets.chatinput.command.ejectall', 'Eject everyone else\'s furni from the room'),
        ejectPets: t('widgets.chatinput.command.ejectpets', 'Send the pets in the room home'),
    }, mayUseWired), chatCommands ?? []), [ t, mayUseWired, chatCommands ]);

    const completion = useMemo<IChatCommandCompletion>(() => (focused
        ? completeChatCommand({ text: value, cursor, commands, controllerLevel, roomUserNames, serverValues: chatCommandSuggestions })
        : NO_COMPLETION), [ commands, focused, value, cursor, controllerLevel, roomUserNames, chatCommandSuggestions ]);
    // What the server would refuse, drawn in red as it is typed (`TextField.setTextFormat`).
    const invalidArguments = useMemo(() => findInvalidArguments({ text: value, commands, controllerLevel, roomUserNames })
        .map(x => ({ ...x, color: INVALID_ARGUMENT_COLOR })), [ value, commands, controllerLevel, roomUserNames ]);
    const suggestions = completion.suggestions;
    const suggestionsKey = suggestions.map(x => x.label).join('\n');

    // `updateSuggestions` highlights the first row each time the list is rebuilt.
    if (highlightFor !== suggestionsKey) {
        setHighlightFor(suggestionsKey);
        setHighlightIndex(0);
    }

    const showSuggestions = (suggestions.length > 0) && (suggestionsDismissedFor !== value);
    const selectableSuggestions = suggestions.filter(x => x.replacement !== null).length;
    // The request by its parts: a new object asking the same thing is the same request.
    const requestCommand = completion.request?.command ?? null;
    const requestParameter = completion.request?.parameter ?? -1;
    const requestPrefix = completion.request?.prefix ?? '';
    const requestSyntax = completion.request?.syntax ?? '';
    const requestArgumentText = completion.request?.argumentText ?? '';

    const whisperMode = t('widgets.chatinput.mode.whisper', ':whisper');
    const shoutMode = t('widgets.chatinput.mode.shout', ':shout');
    const speakMode = t('widgets.chatinput.mode.speak', ':speak');
    const isFloodBlocked = floodRemaining > 0;

    /**
     * The styles this user may pick - `RoomChatInputView.createOrUpdateChatStylesView`. System
     * styles never; NFT styles (1000-9999) when the account holds one; the client's own styles
     * (under 1000, not purchasable) for staff when staff-overrideable, for ambassadors and staff
     * when ambassador-only, else unless the config disables them, HC ones only with club; and
     * anything else the account has bought.
     */
    const pickableStyles = useMemo<IChatStyle[]>(() => {
        if (!customStylesEnabled) return [];

        const disabled = disabledStyles.split(',');
        const hasClub = (clubLevel >= ClubLevelEnum.Club);
        const styles: IChatStyle[] = [];

        for (const style of allStyles) {
            const styleId = style.id;

            if (style.isSystemStyle) continue;

            if (isNftChatStyle(styleId)) {
                if (nftChatStyles.includes(styleId)) styles.push(style);

                continue;
            }

            if (isStaticChatStyle(styleId) && !style.isPurchasable) {
                if (style.isStaffOverrideable && isStaff) {
                    styles.push(style);
                    continue;
                }

                if (style.isAmbassadorOnly && (isStaff || isAmbassador)) {
                    styles.push(style);
                    continue;
                }

                if (disabled.includes(String(styleId))) continue;

                if ((style.isHcOnly && hasClub) || (!style.isHcOnly && !style.isAmbassadorOnly)) {
                    styles.push(style);
                    continue;
                }
            }

            if (purchasableChatStyles.includes(styleId)) styles.push(style);
        }

        return styles;
    }, [ allStyles, customStylesEnabled, disabledStyles, isStaff, clubLevel, isAmbassador, nftChatStyles, purchasableChatStyles ]);

    const sendTypingStatus = () => {
        if (isFloodBlocked) return;

        send(isTypingRef.current ? new StartTypingComposer({}) : new CancelTypingComposer({}));
    };

    const clearTimers = () => {
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        typingTimerRef.current = undefined;
        idleTimerRef.current = undefined;
    };

    const onTypingTimer = () => {
        if (isTypingRef.current) typingStartedSentRef.current = true;

        sendTypingStatus();
    };

    const onIdleTimer = () => {
        if (isTypingRef.current) typingStartedSentRef.current = false;

        isTypingRef.current = false;

        sendTypingStatus();
    };

    /** `_Str_14673` - the field changed. */
    const onChange = (next: string) => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        if (!next.length) {
            isTypingRef.current = false;

            if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

            typingTimerRef.current = setTimeout(onTypingTimer, TYPING_DELAY_MS);
        } else {
            if (!isTypingRef.current) {
                isTypingRef.current = true;

                if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

                typingTimerRef.current = setTimeout(onTypingTimer, TYPING_DELAY_MS);
            }

            idleTimerRef.current = setTimeout(onIdleTimer, IDLE_DELAY_MS);
        }

        lastContentRef.current = next;
        setReplacementCursor(null);
        setValue(next);
    };

    useEffect(() => {
        onChangeRef.current = onChange;
    });

    /** `ChatStyleSelector.windowProc`: a click on `styles` opens or shuts the menu, aligned to the button. */
    const toggleStyles = (button: GlobalRect) => {
        if (!pickableStyles.length) return;

        if ((Date.now() - stylesClosedAtRef.current) < 250) return;

        setStylesAnchor(stylesAnchor ? null : button);
    };

    const closeStyles = () => {
        stylesClosedAtRef.current = Date.now();
        setStylesAnchor(null);
    };

    /** `HabbiconSelector.hide(resetUnseen)`: every hide but a pick marks the habbicons seen. */
    const closeHabbicons = (resetUnseen: boolean) => {
        habbiconsClosedAtRef.current = Date.now();
        setHabbiconsAnchor(null);

        if (resetUnseen) resetUnseenHabbicons(send);
    };

    /**
     * `onHabbiconButtonMouseEvent`: the chat style menu goes and the habbicon menu opens or shuts.
     * A press that just closed the menu from outside does not open it again.
     */
    const toggleHabbicons = (button: GlobalRect) => {
        if ((Date.now() - habbiconsClosedAtRef.current) < 250) return;

        setStylesAnchor(null);

        if (habbiconsAnchor) {
            closeHabbicons(true);

            return;
        }

        setHabbiconsAnchor(button);
    };

    /** `_Str_21815` - Enter. */
    const sendChat = (shout: boolean) => {
        const text = valueRef.current;

        if (!room || !text.length || isFloodBlocked) return;

        const parts = text.split(' ');
        let mode: 'speak' | 'shout' | 'whisper' = shout ? 'shout' : 'speak';
        let recipient = '';
        let remainder = '';

        switch (parts[0]) {
            case whisperMode:
                mode = 'whisper';
                recipient = parts[1] ?? '';
                remainder = `${whisperMode} ${recipient} `;
                parts.shift();
                parts.shift();
                break;
            case shoutMode:
                mode = 'shout';
                parts.shift();
                break;
            case speakMode:
                mode = 'speak';
                parts.shift();
                break;
        }

        // `:command x`: the selected avatar's name for the x.
        const message = withSelectedAvatarName(parts.join(' '));

        let styleId = preferredChatStyle;

        if (customStylesEnabled && (selectedStyleId !== NO_STYLE_SELECTED)) {
            // `ChatInputWidgetHandler`: `freeFlowChat.preferedChatStyle = styleId`, which sends the font size mode with it.
            if (selectedStyleId !== preferredChatStyle) setPreferredChatStyle(send, selectedStyleId);

            styleId = selectedStyleId;
        }

        clearTimers();

        // `ChatInputWidgetHandler`: a chat command is run, not said.
        const isCommand = (mode !== 'whisper') && (runWiredChatCommand(send, message) || runRoomChatCommand(send, message));

        if (message.length && !isCommand) {
            const cleaned = message.replace(/&#[0-9]+;/g, '');

            switch (mode) {
                case 'speak':
                    send(new ChatComposer({ text: cleaned, styleId }));
                    break;
                case 'shout':
                    send(new ShoutComposer({ text: cleaned, styleId }));
                    break;
                case 'whisper':
                    send(new WhisperComposer({ recipientName: recipient, text: cleaned, styleId }));
                    break;
            }
        }

        isTypingRef.current = false;

        if (typingStartedSentRef.current) sendTypingStatus();

        typingStartedSentRef.current = false;
        lastContentRef.current = remainder;
        setReplacementCursor(null);
        setValue(remainder);
    };

    /** A suggestion taken: the line becomes what it completes to, and the field keeps the keyboard. */
    const takeSuggestion = (index: number) => {
        const replacement = suggestions[index]?.replacement;

        if (replacement === null || replacement === undefined) return;

        const next = replacement;
        const nextCursor = suggestions[index]?.replacementCursor ?? next.length;
        onChange(next);
        setReplacementCursor(nextCursor);
        setSelectionRequestId(current => current + 1);
    };

    /** `highlightSuggestion`: wraps past either end of the list. */
    const moveHighlight = (step: number) => {
        let next = highlightIndex + step;

        if (next < 0) next = suggestions.length - 1;
        if (next >= suggestions.length) next = 0;

        setHighlightIndex(next);
    };

    /** `onNameInputKeyUp`, on the chat field: the command list's keys, before the field's own. */
    const onSuggestionKey = (event: KeyboardEvent): boolean => {
        if (!showSuggestions || !selectableSuggestions) {
            if (showSuggestions && (event.key === 'Escape')) {
                setSuggestionsDismissedFor(valueRef.current);

                return true;
            }

            return false;
        }

        switch (event.key) {
            case 'ArrowUp':
                moveHighlight(-1);
                return true;
            case 'ArrowDown':
                moveHighlight(1);
                return true;
            case 'Tab':
                takeSuggestion(highlightIndex);
                return true;
            case 'Enter': {
                // A line that taking the row would not change goes as it is.
                const replacement = suggestions[highlightIndex]?.replacement;

                if (!replacement || (replacement.trim() === valueRef.current.trim()) || event.shiftKey) return false;

                takeSuggestion(highlightIndex);
                return true;
            }
            case 'Escape':
                setSuggestionsDismissedFor(valueRef.current);
                return true;
        }

        return false;
    };

    /** `_Str_10572` - Space autocompletes the whisper target, Backspace clears a bare `:whisper name `. */
    const onKeyDown = (event: KeyboardEvent): boolean | void => {
        if (onSuggestionKey(event)) return true;

        const current = valueRef.current;

        if (event.key === ' ') {
            if ((current === whisperMode) && selectedAvatarName.length) {
                onChange(`${whisperMode} ${selectedAvatarName} `);

                return true;
            }
        }

        if (event.key === 'Backspace') {
            const parts = current.split(' ');

            if ((parts[0] === whisperMode) && (parts.length === 3) && (parts[2] === '')) {
                onChange('');

                return true;
            }
        }

        return undefined;
    };

    // Flood control: swap the field for the countdown until the server's seconds have passed.
    useEffect(() => {
        if (!floodBlockSeconds || !floodBlockStamp) return;

        const endsAt = floodBlockStamp + (floodBlockSeconds * 1000);
        const tick = () => setFloodRemaining(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));

        tick();

        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);
    }, [ floodBlockSeconds, floodBlockStamp ]);

    /*
     * The avatar menu asked us to whisper to someone (`RoomWidgetUpdateChatInputContentEvent`).
     * It is a one-off request rather than state to render, so it is taken as the store announces
     * it and cleared straight away.
     */
    useEffect(() => roomStore.subscribe(({ chatInputContent }) => {
        if (!chatInputContent) return;

        const prefix = (chatInputContent.mode === 'whisper') ? whisperMode : shoutMode;
        const next = `${prefix} ${chatInputContent.userName.length ? `${chatInputContent.userName} ` : ''}`;

        setReplacementCursor(null);
        setValue(next);
        lastContentRef.current = next;
        setFocused(true);
        clearChatInputContent();
    }), [ whisperMode, shoutMode, clearChatInputContent ]);

    // `focus_capturer`: typing anywhere while nothing else has the keyboard starts a message.
    useEffect(() => {
        const onWindowKeyDown = (event: KeyboardEvent) => {
            if (focusedRef.current || isFloodBlocked) return;

            if ((event.key.length !== 1) || event.ctrlKey || event.metaKey || event.altKey) return;

            const active = document.activeElement;

            if (active && ((active.tagName === 'INPUT') || (active.tagName === 'TEXTAREA') || (active as HTMLElement).isContentEditable)) return;

            // Other Pixi text inputs claim their keys with `preventDefault` - let them run first.
            setTimeout(() => {
                if (event.defaultPrevented || focusedRef.current) return;

                setFocused(true);
                onChangeRef.current(valueRef.current.length < MAX_CHARS ? valueRef.current + event.key : valueRef.current);
            }, 0);
        };

        window.addEventListener('keydown', onWindowKeyDown);

        return () => window.removeEventListener('keydown', onWindowKeyDown);
    }, [ isFloodBlocked ]);

    useEffect(() => () => clearTimers(), []);

    // What only the server knows is asked for once typing pauses; the answer lands in the user store.
    useEffect(() => {
        if (requestCommand === null) return;

        const timer = setTimeout(() => requestChatCommandSuggestions(send, requestCommand, requestParameter, requestPrefix, requestSyntax, requestArgumentText), SUGGEST_DELAY_MS);

        return () => clearTimeout(timer);
    }, [ send, requestCommand, requestParameter, requestPrefix, requestSyntax, requestArgumentText ]);

    if (!room || isSpectating || !template || !layout) return null;

    /*
     * `RoomChatInputView.updatePosition`: `bubblecont` sits centred in the toolbar when the
     * toolbar's icons and the friend bar leave it the room - its top `height - 104` - and otherwise
     * moves up to `height - 160` and starts right of the room tools, still centred if the centre is
     * clear of them.
     */
    const centredLeft = ~~((viewportWidth / 2) - (layout.width / 2));
    const fitsInToolbar = ((viewportWidth - toolbarAreaWidth - friendBarWidth) > (layout.width + LEFT_MARGIN))
        && (centredLeft >= (toolbarAreaWidth + LEFT_MARGIN + TOOLBAR_CLEARANCE))
        && ((centredLeft + layout.width) <= (viewportWidth - friendBarWidth));
    const left = fitsInToolbar ? centredLeft : Math.max(centredLeft, roomToolsRight(roomToolsCollapsed) + LEFT_MARGIN);
    const top = viewportHeight - (fitsInToolbar ? BUBBLECONT_FROM_BOTTOM_IN_TOOLBAR : BUBBLECONT_FROM_BOTTOM_ABOVE_TOOLBAR);
    // The `styles` button on screen, which its menu is aligned to (`alignToSelector`).
    const stylesRect: GlobalRect = { x: left + layout.styles.x, y: top + layout.row.y + layout.styles.y, width: layout.styles.width, height: layout.styles.height };
    const extraRect: GlobalRect = { x: left + layout.extra.x, y: top + layout.row.y + layout.extra.y, width: layout.extra.width, height: layout.extra.height };

    /*
     * The field, in `chat_input`'s place in `input_border`: the client's own text input rather than
     * the template's, for what the port adds to it - the command completion's cursor and selection,
     * and the red of an argument the server would refuse.
     */
    const field = (
        <TextInput
            value={value}
            onChange={onChange}
            onSelectionChange={(_start, end) => {
                if (end !== cursor) setSuggestionsDismissedFor(null);
                setCursor(end);
            }}
            selectionAfterChange={replacementCursor}
            selectionRequestId={selectionRequestId}
            onEnter={event => sendChat(event.shiftKey)}
            onKeyDown={onKeyDown}
            marks={invalidArguments}
            focused={focused}
            onFocusChange={setFocused}
            placeholder={t('widgets.chatinput.default')}
            placeholderColor="#777777"
            maxLength={MAX_CHARS}
            fontFamily="Ubuntu"
            fontSize={17}
            // `chat_input`'s own `antialias_type` var. Without it the field falls back
            // to `regular`'s `normal`, which the exact renderer has only for the
            // Volter faces - so Ubuntu 17 dropped to the browser's canvas text.
            flashFormat={{ antiAliasType: 'advanced' }}
            textColor="#000000"
            flashPlacement
            alwaysShowSelection
            backgroundColor={null}
            focusedBackgroundColor={null}
            layout={{ position: 'absolute', left: layout.input.x, width: layout.input.width, top: layout.input.y, height: layout.input.height }}
        />
    );

    return (
        <Box layout={{ position: 'absolute', left, top }}>
            <TemplateWindow
                id={CHAT_INPUT_TEMPLATE}
                part="bubblecont"
                bindings={{
                    // `hideFloodBlocking` / `showFloodBlocking`: the field or the countdown, never both.
                    block_text: { visible: isFloodBlocked, caption: t('chat.input.alert.flood', 'You are talking too fast. Wait %time% seconds.', { time: String(floodRemaining) }) },
                    chat_input: { visible: false },
                    input_border: { children: isFloodBlocked ? undefined : field },
                    styles: { onPointerTap: () => toggleStyles(stylesRect) },
                    // `chat_extra_button` under `habbicons.enabled`, with the unseen count while the menu is
                    // shut (`updateHabbiconUnseenCounter`), 2 in from its top right.
                    chat_extra_button: {
                        visible: habbiconsEnabled,
                        onPointerTap: () => toggleHabbicons(extraRect),
                        children: !habbiconsAnchor && (
                            <Box layout={{ position: 'absolute', right: 2, top: 2 }}>
                                <UnseenItemCounterView count={unseenHabbicons} />
                            </Box>
                        ),
                    },
                    // `updateHabbiconButtonSetIcon`: the set of the last habbicon used, else the shop's first set, outlined.
                    chat_extra_set_icon: { visible: habbiconsEnabled && !!setIconAsset, asset: setIconAsset },
                    // `createWindow`: the chat commands help button starts hidden; what shows it is not ported.
                    helpbutton: { visible: false },
                }}
            />
            {stylesAnchor && (
                <ChatStyleSelectorView
                    anchor={stylesAnchor}
                    styles={pickableStyles}
                    selectedStyleId={selectedStyleId}
                    // `gridItemWindowProc` only selects: the menu stays open until a click lands
                    // outside it (`hideIfClickAway`).
                    onSelect={styleId => setSelectedStyleId(styleId)}
                    fontSizeMode={chatSizePreference}
                    onSelectFontSize={mode => setChatFontSizeMode(send, mode)}
                    onClose={closeStyles}
                />
            )}
            {habbiconsEnabled && habbiconsAnchor && (
                <HabbiconSelectorView
                    anchor={habbiconsAnchor}
                    onPick={(habbiconId, keepOpen) => {
                        triggerHabbicon(send, habbiconId);

                        if (!keepOpen) closeHabbicons(false);
                    }}
                    // `onOpenHubClicked`: `openHabbiconHub`, then `hide()`.
                    onOpenHub={() => {
                        openHabbiconHub(send);
                        closeHabbicons(true);
                    }}
                    onClose={() => closeHabbicons(true)}
                />
            )}
            {showSuggestions && !isFloodBlocked && (
                <ChatCommandSuggestionsView
                    x={left + layout.border.x}
                    bottom={top + layout.row.y}
                    width={layout.border.width}
                    suggestions={suggestions}
                    highlightIndex={highlightIndex}
                    onHover={setHighlightIndex}
                    onSelect={(index) => {
                        takeSuggestion(index);
                        setFocused(true);
                    }}
                    onClose={() => setSuggestionsDismissedFor(value)}
                />
            )}
        </Box>
    );
};
