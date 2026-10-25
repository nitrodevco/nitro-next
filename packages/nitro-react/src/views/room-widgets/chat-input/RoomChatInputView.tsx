import { isNftChatStyle, isStaticChatStyle } from '@nitrodevco/nitro-theme/chat';
import { useEffect, useMemo, useRef, useState } from 'react';

import { IChatStyle } from '#base/chat';
import { openClientLink, openHabbiconHub, resetUnseenHabbicons, runClientModuleChatCommand, runRoomChatCommand, runWiredChatCommand, sayChat, sendChatTyping, setChatFontSizeMode, setPreferredChatStyle, shoutChat, trackEventLogOncePerSession, triggerHabbicon, whisperChat, withSelectedAvatarName } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { HabbiconsStore, useHabbiconsStore } from '#base/context/habbicons';
import { getUnseenItemCount, UnseenItemCategory, useInventoryStore } from '#base/context/inventory';
import { useRoom, useRoomIsSpectating, useRoomStore } from '#base/context/room';
import { useConfigBoolean, useConfigValue, useTranslation } from '#base/context/system';
import { ClientGates, useClientGate, useOwnHasClub, useOwnIsAmbassador, useUserStore } from '#base/context/user';
import { useChatInputContentRequest, useChatStyles, useReopenGuard } from '#base/hooks';
import { Box, findTemplateChild, GlobalRect, Template, templateFontSize, templateTextFormat, TemplateWindow, TextInput, useLatest, useTemplate } from '#base/theme';
import { UnseenItemCounterView } from '#base/views/shared/UnseenItemCounterView';

import { ChatCommandSuggestionsView } from './ChatCommandSuggestionsView';
import { ChatStyleSelectorView } from './ChatStyleSelectorView';
import { HabbiconSelectorView } from './HabbiconSelectorView';
import { useChatFloodCountdown } from './useChatFloodCountdown';
import { useChatInputCompletion } from './useChatInputCompletion';
import { useChatInputPlacement } from './useChatInputPlacement';
import { useChatNuxReminder } from './useChatNuxReminder';

/** `createWindow`'s `chatinput_window_new`; `bubblecont` is the bar it places. */
const CHAT_INPUT_TEMPLATE = 'habbo-room-ui-com/chatinput_window_new';
/** The Flash `chat_input` field: Ubuntu 17, 100 characters. */
const MAX_CHARS = 100;
/** `_typingTimer` / `_idleTimer` - typing is announced after a second of it, withdrawn after ten idle. */
const TYPING_DELAY_MS = 1000;
const IDLE_DELAY_MS = 10000;
/** No style picked in this session yet - send whatever the account preference says (`ChatStyleSelector._Str_22824`). */
const NO_STYLE_SELECTED = -1;
/** `startHelpButtonHideTimer`: the help button goes this long after the pointer leaves the field and the button. */
const HELP_BUTTON_HIDE_DELAY_MS = 400;
/** `CHAT_HELP_INTERNAL_CLIENT_LINK`. */
const CHAT_HELP_LINK = 'habbopages/chat/commands';

type Rect = { x: number; y: number; width: number; height: number };

/**
 * What the bar is placed by, read off its layout: `bubblecont`'s width, `chat_input_container`'s y in
 * it, `input_border` in that row (the command list stands on it, as wide), `chat_input` in the
 * border, and the `styles` and `chat_extra_button` buttons in the row - and `chat_input`'s face, size and
 * format vars (Ubuntu 17, advanced anti-aliasing), as a theme's face override leaves them (`templateTextFormat`).
 *
 * `chat_input` reaches 5 past the left edge of `helpbutton`, which lies over the field's end while
 * it shows; Flash's 2 px text gutter hides less under it than this field would, so the field stops
 * where the button starts (`inputWidth`).
 */
const readLayout = (template: Template, targetWidth?: number) => {
    const rectOf = (name: string): Rect | undefined => {
        const element = findTemplateChild(template.elements, name);

        return element && { x: element.x, y: element.y, width: element.width, height: element.height };
    };
    const bubble = rectOf('bubblecont');
    const row = rectOf('chat_input_container');
    const border = rectOf('input_border');
    const input = rectOf('chat_input');
    const inputElement = findTemplateChild(template.elements, 'chat_input');
    const styles = rectOf('styles');
    const extra = rectOf('chat_extra_button');
    const help = rectOf('helpbutton');

    if (!bubble || !row || !border || !input || !inputElement || !styles || !extra) return undefined;

    const width = Math.max(1, targetWidth ?? bubble.width);
    const widthDelta = width - bubble.width;
    const resizedRow = { ...row, width: Math.max(0, row.width + widthDelta) };
    const resizedBorder = { ...border, width: Math.max(0, border.width + widthDelta) };
    const resizedInput = { ...input, width: Math.max(0, input.width + widthDelta) };
    const resizedHelp = help && { ...help, x: Math.max(0, help.x + widthDelta) };
    const resizedExtra = { ...extra, x: Math.max(0, extra.x + widthDelta) };

    // `helpbutton` is in `bubblecont`; the field is in `input_border`, in the row.
    const inputWidth = resizedHelp ? Math.max(0, Math.min(resizedInput.width, resizedHelp.x - (resizedRow.x + resizedBorder.x + resizedInput.x))) : resizedInput.width;

    const { fontFamily, flash } = templateTextFormat(inputElement);

    return {
        width,
        height: bubble.height,
        row: resizedRow,
        border: resizedBorder,
        input: resizedInput,
        inputWidth,
        styles,
        extra: resizedExtra,
        help: resizedHelp,
        font: { fontFamily, fontSize: templateFontSize(inputElement), flash },
    };
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
 *
 * A new user (`isNoob`) who has not been reminded this session (`nux.chat.reminder.shown`) and types
 * nothing in a room for `nux.noob.chat.reminder.delay` seconds is reminded (`onNuxIdleTimerComplete` ->
 * `highlightChatInput`): the field's text becomes `widgets.chatinput.mode.remind.noobie`, the field is
 * the `nux_chat_reminder` hint target with the arrow at it, and the bar bobs a pixel every 500 ms. After
 * ten bobs, or a key or a press in the field, the reminder is over (`chatBarReminderShown`): the arrow
 * goes and `nux.chat.reminder.shown` is set.
 */
export const RoomChatInputView = () => {
    const t = useTranslation();
    const room = useRoom();
    // `RoomUI` creates `RWE_CHAT_INPUT_WIDGET` only for a session that is not spectating.
    const isSpectating = useRoomIsSpectating();
    const { send } = useWebSocketContext();
    const allStyles = useChatStyles();
    const preferredChatStyle = useUserStore(x => x.preferredChatStyle);
    const chatSizePreference = useUserStore(x => x.chatSizePreference);
    const hasClub = useOwnHasClub();
    const isStaff = useClientGate(ClientGates.StaffChatStyles);
    const isAmbassador = useOwnIsAmbassador();
    const nftChatStyles = useUserStore(x => x.nftChatStyles);
    const purchasableChatStyles = useUserStore(x => x.purchasableChatStyles);
    const selectedAvatarId = useRoomStore(x => x.selectedAvatarId);
    const selectedAvatarName = useRoomStore(x => x.usersByRoomObjectId[selectedAvatarId]?.name ?? '');
    const customStylesEnabled = useConfigBoolean('custom.chat.styles.enabled');
    const habbiconsEnabled = useConfigBoolean('habbicons.enabled');
    const unseenHabbicons = useInventoryStore(x => getUnseenItemCount(x.unseenItems, UnseenItemCategory.HABBICONS));
    const setIconCollectionId = useHabbiconsStore(resolveHabbiconButtonSetIconCollectionId);
    const hasSetIcon = useHabbiconsStore(x => !!x.outlinedCollectionIcons[setIconCollectionId]);
    const setIconAsset = hasSetIcon ? `habbicon_collection_icon_outlined_${setIconCollectionId}` : undefined;
    const disabledStyles = useConfigValue<string>('disabled.custom.chat.styles') ?? '';
    const template = useTemplate(CHAT_INPUT_TEMPLATE);
    const baseLayout = useMemo(() => (template ? readLayout(template) : undefined), [ template ]);
    const placement = useChatInputPlacement(baseLayout?.width ?? 0, baseLayout?.height ?? 0);
    const layout = useMemo(() => (template ? readLayout(template, placement.width) : undefined), [ template, placement.width ]);

    const [ value, setValue ] = useState('');
    const [ cursor, setCursor ] = useState(0);
    const [ replacementCursor, setReplacementCursor ] = useState<number | null>(null);
    const [ selectionRequestId, setSelectionRequestId ] = useState(0);
    const [ focused, setFocused ] = useState(false);
    const floodRemaining = useChatFloodCountdown();
    // Where the `styles` button is on screen while its menu is open (the menu floats above it), or null while it is shut.
    const [ stylesAnchor, setStylesAnchor ] = useState<GlobalRect | null>(null);
    const [ selectedStyleId, setSelectedStyleId ] = useState(NO_STYLE_SELECTED);

    const isTypingRef = useRef(false);
    const typingStartedSentRef = useRef(false);
    const typingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const lastContentRef = useRef('');
    /** The style menu closes on any outside pointerdown - including the one that starts a tap on its own button, which must not reopen it. */
    const stylesGuard = useReopenGuard();
    const [ habbiconsAnchor, setHabbiconsAnchor ] = useState<GlobalRect | null>(null);
    const habbiconsGuard = useReopenGuard();
    // `helpbutton`: shown while the pointer is over the field's row or the button.
    const [ helpButtonVisible, setHelpButtonVisible ] = useState(false);
    const overHelpButtonRef = useRef(false);
    const helpButtonHideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const roomId = room?.roomId ?? -1;
    const { nuxReminded, nuxReminderTicks, nuxHintTarget, onTyped, endNuxReminder } = useChatNuxReminder(roomId);
    const { left, top } = placement;

    const valueRef = useLatest(value);

    const { invalidArguments, suggestions, showSuggestions, highlightIndex, setHighlightIndex, setSuggestionsDismissedFor, takeSuggestion, onSuggestionKey } = useChatInputCompletion({
        value,
        valueRef,
        cursor,
        focused,
        onTake: (next, nextCursor) => {
            onChange(next);
            setReplacementCursor(nextCursor);
            setSelectionRequestId(current => current + 1);
        },
    });

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
    }, [ allStyles, customStylesEnabled, disabledStyles, isStaff, hasClub, isAmbassador, nftChatStyles, purchasableChatStyles ]);

    const sendTypingStatus = () => {
        if (isFloodBlocked) return;

        sendChatTyping(send, isTypingRef.current);
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

        // `onInputChanged`: typing stops the nux timer.
        if (next.length) onTyped();

        lastContentRef.current = next;
        // Enter can land before React has rendered the last keystroke (the field's `input` event is
        // a native one, so its update is not flushed synchronously): `sendChat` must see this text.
        valueRef.current = next;
        setReplacementCursor(null);
        setValue(next);
    };

    /** `ChatStyleSelector.windowProc`: a click on `styles` opens or shuts the menu, aligned to the button. */
    const toggleStyles = (button: GlobalRect) => {
        if (!pickableStyles.length) return;

        if (stylesGuard.justClosed()) return;

        setStylesAnchor(stylesAnchor ? null : button);
    };

    const closeStyles = () => {
        stylesGuard.markClosed();
        setStylesAnchor(null);
    };

    /** `HabbiconSelector.hide(resetUnseen)`: every hide but a pick marks the habbicons seen. */
    const closeHabbicons = (resetUnseen: boolean) => {
        habbiconsGuard.markClosed();
        setHabbiconsAnchor(null);

        if (resetUnseen) resetUnseenHabbicons(send);
    };

    /**
     * `onHabbiconButtonMouseEvent`: the chat style menu goes and the habbicon menu opens or shuts.
     * A press that just closed the menu from outside does not open it again.
     */
    const toggleHabbicons = (button: GlobalRect) => {
        if (habbiconsGuard.justClosed()) return;

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

        // `ChatInputWidgetHandler`: a chat command is run, not said; then a client module's (not Flash's), before the line goes to the server.
        const isCommand = (mode !== 'whisper') && (runWiredChatCommand(send, message) || runRoomChatCommand(send, message) || runClientModuleChatCommand(message));

        if (message.length && !isCommand) {
            const cleaned = message.replace(/&#[0-9]+;/g, '');

            switch (mode) {
                case 'speak':
                    sayChat(send, cleaned, styleId);
                    break;
                case 'shout':
                    shoutChat(send, cleaned, styleId);
                    break;
                case 'whisper':
                    whisperChat(send, recipient, cleaned, styleId);
                    break;
            }

            trackEventLogOncePerSession(send, 'Tutorial', 'interaction', 'avatar.chat');
        }

        isTypingRef.current = false;

        if (typingStartedSentRef.current) sendTypingStatus();

        typingStartedSentRef.current = false;
        lastContentRef.current = remainder;
        setReplacementCursor(null);
        setValue(remainder);
    };

    // The field calls it through a ref. Every closure of a render shares that render's scope, so a cached closure keeps its
    // whole render: `sendChat` (new each room) and `toggleStyles`, cached at different renders, linked each render to an
    // older one and kept every room the session had entered.
    const sendChatRef = useLatest(sendChat);

    /** `_Str_10572` - Space autocompletes the whisper target, Backspace clears a bare `:whisper name `. */
    const onKeyDown = (event: KeyboardEvent): boolean | void => {
        // `windowKeyEventProcessor` -> `setInputFieldFocus`.
        endNuxReminder();

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

    // The avatar menu asked us to whisper or shout to someone (`onChatInputUpdate`).
    useChatInputContentRequest((content) => {
        const prefix = (content.mode === 'whisper') ? whisperMode : shoutMode;
        const next = `${prefix} ${content.userName.length ? `${content.userName} ` : ''}`;

        setReplacementCursor(null);
        setValue(next);
        lastContentRef.current = next;
        setFocused(true);
    });

    useEffect(() => () => clearTimers(), []);

    /** `stopHelpButtonHideTimer`. */
    const stopHelpButtonHideTimer = () => {
        clearTimeout(helpButtonHideTimerRef.current);
        helpButtonHideTimerRef.current = undefined;
    };

    useEffect(() => () => clearTimeout(helpButtonHideTimerRef.current), []);

    /** `onInputHoverRegionMouseEvent` / `onHelpButtonMouseEvent`'s `WME_OVER`. */
    const showHelpButton = () => {
        setHelpButtonVisible(true);
        stopHelpButtonHideTimer();
    };

    /** `startHelpButtonHideTimer` -> `onHelpButtonHideTimer`: hidden unless the pointer is on the button by then. */
    const startHelpButtonHideTimer = () => {
        stopHelpButtonHideTimer();
        helpButtonHideTimerRef.current = setTimeout(() => {
            helpButtonHideTimerRef.current = undefined;

            if (!overHelpButtonRef.current) setHelpButtonVisible(false);
        }, HELP_BUTTON_HIDE_DELAY_MS);
    };

    if (!room || isSpectating || !template || !layout) return null;

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
            onEnter={event => sendChatRef.current(event.shiftKey)}
            onKeyDown={onKeyDown}
            marks={invalidArguments}
            focused={focused}
            onFocusChange={setFocused}
            // `chat_input`'s `focus_capturer`: it has the keyboard whenever nothing else does.
            focusCapturer
            // `highlightChatInput` sets the field's text to the reminder, which stays there.
            placeholder={nuxReminded ? t('widgets.chatinput.mode.remind.noobie') : t('widgets.chatinput.default')}
            placeholderColor="#777777"
            maxLength={MAX_CHARS}
            fontFamily={layout.font.fontFamily}
            fontSize={layout.font.fontSize}
            // `chat_input`'s own `antialias_type` var among them. Without it the field falls back
            // to `regular`'s `normal`, which the exact renderer has only for the
            // Volter faces - so Ubuntu 17 dropped to the browser's canvas text.
            flashFormat={layout.font.flash}
            textColor="#000000"
            flashPlacement
            alwaysShowSelection
            backgroundColor={null}
            focusedBackgroundColor={null}
            layout={{ position: 'absolute', left: layout.input.x, width: layout.inputWidth, top: layout.input.y, height: layout.input.height }}
        />
    );

    return (
        // `onChatReminderTimer` lifts the bar a pixel on every other tick.
        <Box layout={{ position: 'absolute', left, top: top - (((nuxReminderTicks ?? 0) % 2 === 1) ? 1 : 0) }}>
            <TemplateWindow
                id={CHAT_INPUT_TEMPLATE}
                part="bubblecont"
                // `block_text` lies 10 into `input_border`, under the `styles` button that covers the
                // border's first 46: the countdown's start was hidden. It goes where `chat_input` is.
                arrange={({ root, find }) => {
                    root()?.setWidth(layout.width);
                    find('chat_input_container')?.setWidth(layout.row.width);
                    find('input_border')?.setWidth(layout.border.width);
                    find('chat_input')?.setWidth(layout.input.width);
                    if (layout.help) find('helpbutton')?.setX(layout.help.x);
                    find('chat_extra_button')?.setX(layout.extra.x);

                    const blockText = find('block_text');

                    blockText?.setRectangle(layout.input.x, blockText.y, layout.input.width, blockText.height);
                }}
                bindings={{
                    // `hideFloodBlocking` / `showFloodBlocking`: the field or the countdown, never both.
                    block_text: { visible: isFloodBlocked, caption: t('chat.input.alert.flood', 'You are talking too fast. Wait %time% seconds.', { time: String(floodRemaining) }) },
                    chat_input: { visible: false },
                    // `helpbutton_show_hover_region` (the whole border) and `chat_input` show the help button.
                    input_border: {
                        children: (
                            <>
                                {!isFloodBlocked && field}
                                {/* `chat_input`, the `nux_chat_reminder` hint target. */}
                                <Box
                                    ref={nuxHintTarget}
                                    pointerTransparent
                                    layout={{ position: 'absolute', left: layout.input.x, width: layout.inputWidth, top: layout.input.y, height: layout.input.height }}
                                />
                            </>
                        ),
                        // `windowMouseEventProcessor`'s `WME_DOWN` on the field -> `setInputFieldFocus`.
                        onPointerDown: endNuxReminder,
                        onPointerOver: showHelpButton,
                        onPointerOut: () => {
                            if (!overHelpButtonRef.current) startHelpButtonHideTimer();
                        },
                    },
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
                    // `onHelpButtonMouseEvent`: the chat commands page on a click; the button stays while the pointer is on it.
                    helpbutton: {
                        visible: helpButtonVisible,
                        onPointerTap: () => openClientLink(send, CHAT_HELP_LINK),
                        onPointerOver: () => {
                            overHelpButtonRef.current = true;
                            showHelpButton();
                        },
                        onPointerOut: () => {
                            overHelpButtonRef.current = false;
                            startHelpButtonHideTimer();
                        },
                    },
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
