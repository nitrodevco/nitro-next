import { ClubLevelEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { CancelTypingComposer, ChatComposer, SetChatStylePreferenceComposer, ShoutComposer, StartTypingComposer, WhisperComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo, useRef, useState } from 'react';

import { IChatStyle, isNftChatStyle, isStaticChatStyle } from '#base/chat';
import { runWiredChatCommand } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { roomStore, useRoom, useRoomChatActions, useRoomStore } from '#base/context/room';
import { useConfigValue, useFriendBarWidth, useToolbarAreaWidth, useTranslation } from '#base/context/system';
import { useOwnClubLevel, useOwnIsAmbassador, useOwnSecurityLevel, useRoomToolsCollapsed, useUserActions, useUserStore } from '#base/context/user';
import { useChatStyles, useViewportSize } from '#base/hooks';
import { Border, Box, Icon, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { roomToolsRight } from '#base/views/room-widgets/room-tools/roomToolsGeometry';

import { ChatStyleSelectorView } from './ChatStyleSelectorView';

/** `RoomChatInputView.updatePosition` - the gap kept from whatever sits left of the chat bar. */
const LEFT_MARGIN = 12;
/** The bar's own size: the field, the gap and the habbicon button. */
const CHAT_BAR_WIDTH = 451;
const CHAT_BAR_HEIGHT = 39;
/** `ToolbarView`'s height; the bar is centred in it when it sits there. */
const TOOLBAR_HEIGHT = 54;
/** The room the centred bar must leave the toolbar's icons on top of its own margin - `updatePosition`'s `+ 100`. */
const TOOLBAR_CLEARANCE = 100;
/** Where the bar goes when it does not fit in the toolbar: one toolbar height up (Flash: `height - 160` against `height - 104`). */
const ABOVE_TOOLBAR_OFFSET = 56;
/** The Flash `chat_input` field: Ubuntu 17, 100 characters. */
const MAX_CHARS = 100;
/** `_typingTimer` / `_idleTimer` - typing is announced after a second of it, withdrawn after ten idle. */
const TYPING_DELAY_MS = 1000;
const IDLE_DELAY_MS = 10000;
/** No style picked in this session yet - send whatever the account preference says (`ChatStyleSelector._Str_22824`). */
const NO_STYLE_SELECTED = -1;

/**
 * The Flash `RoomChatInputWidget` + `RoomChatInputView` (`chatinput_window_new`): the bar above
 * the toolbar with the style picker on the left and the text field. Typing anywhere focuses it;
 * Enter speaks, Shift+Enter shouts; a leading `:whisper name`, `:shout` or `:speak` picks the
 * mode (Space after `:whisper` fills in the selected avatar's name); typing status is sent
 * after a second and cancelled after ten idle; a flood-control block swaps the field for the
 * countdown; the avatar menu's "whisper" pre-fills the field through the room store.
 */
export const RoomChatInputView = () => {
    const t = useTranslation();
    const room = useRoom();
    const { send } = useWebSocketContext();
    const floodBlockSeconds = useRoomStore(x => x.floodBlockSeconds);
    const floodBlockStamp = useRoomStore(x => x.floodBlockStamp);
    const allStyles = useChatStyles();
    const { clearChatInputContent } = useRoomChatActions();
    const preferredChatStyle = useUserStore(x => x.preferredChatStyle);
    const chatSizePreference = useUserStore(x => x.chatSizePreference);
    const { setPreferredChatStyle } = useUserActions();
    const clubLevel = useOwnClubLevel();
    const securityLevel = useOwnSecurityLevel();
    const isAmbassador = useOwnIsAmbassador();
    const nftChatStyles = useUserStore(x => x.nftChatStyles);
    const purchasableChatStyles = useUserStore(x => x.purchasableChatStyles);
    const selectedAvatarId = useRoomStore(x => x.selectedAvatarId);
    const selectedAvatarName = useRoomStore(x => x.usersByRoomObjectId[selectedAvatarId]?.name ?? '');
    const customStylesEnabled = useConfigValue<boolean>('custom.chat.styles.enabled') ?? true;
    const disabledStyles = useConfigValue<string>('disabled.custom.chat.styles') ?? '';
    // The bar starts where the room tools end, as `RoomToolsWidget.getWidgetAreaWidth` told it to.
    const roomToolsCollapsed = useRoomToolsCollapsed();
    const { width: viewportWidth } = useViewportSize();
    const toolbarAreaWidth = useToolbarAreaWidth();
    const friendBarWidth = useFriendBarWidth();

    const [ value, setValue ] = useState('');
    const [ focused, setFocused ] = useState(false);
    const [ floodRemaining, setFloodRemaining ] = useState(0);
    const [ stylesOpen, setStylesOpen ] = useState(false);
    const [ selectedStyleId, setSelectedStyleId ] = useState(NO_STYLE_SELECTED);

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

    useEffect(() => {
        valueRef.current = value;
        focusedRef.current = focused;
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
        const isStaff = (securityLevel >= SecurityLevelEnum.Employee);
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
    }, [ allStyles, customStylesEnabled, disabledStyles, securityLevel, clubLevel, isAmbassador, nftChatStyles, purchasableChatStyles ]);

    const highlightedStyleId = (selectedStyleId !== NO_STYLE_SELECTED)
        ? selectedStyleId
        : (pickableStyles.some(style => style.id === preferredChatStyle) ? preferredChatStyle : (pickableStyles[0]?.id ?? 0));

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
        setValue(next);
    };

    useEffect(() => {
        onChangeRef.current = onChange;
    });

    const toggleStyles = () => {
        if (!pickableStyles.length) return;

        if ((Date.now() - stylesClosedAtRef.current) < 250) return;

        setStylesOpen(open => !open);
    };

    const closeStyles = () => {
        stylesClosedAtRef.current = Date.now();
        setStylesOpen(false);
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

        const message = parts.join(' ');

        let styleId = preferredChatStyle;

        if (customStylesEnabled && (selectedStyleId !== NO_STYLE_SELECTED)) {
            if (selectedStyleId !== preferredChatStyle) {
                setPreferredChatStyle(selectedStyleId);
                send(new SetChatStylePreferenceComposer({ param1: selectedStyleId, chatFontSizeMode: chatSizePreference }));
            }

            styleId = selectedStyleId;
        }

        clearTimers();

        // `ChatInputWidgetHandler`: a chat command is run, not said.
        const isCommand = (mode !== 'whisper') && runWiredChatCommand(send, message);

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
        setValue(remainder);
    };

    /** `_Str_10572` - Space autocompletes the whisper target, Backspace clears a bare `:whisper name `. */
    const onKeyDown = (event: KeyboardEvent): boolean | void => {
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

    if (!room) return null;

    /*
     * `RoomChatInputView.updatePosition`: the bar sits centred in the toolbar when the toolbar's
     * icons and the friend bar leave it the room; otherwise it moves up one toolbar height and
     * starts right of the room tools - still centred if the centre is clear of them.
     */
    const centredLeft = ~~((viewportWidth / 2) - (CHAT_BAR_WIDTH / 2));
    const fitsInToolbar = ((viewportWidth - toolbarAreaWidth - friendBarWidth) > (CHAT_BAR_WIDTH + LEFT_MARGIN))
        && (centredLeft >= (toolbarAreaWidth + LEFT_MARGIN + TOOLBAR_CLEARANCE))
        && ((centredLeft + CHAT_BAR_WIDTH) <= (viewportWidth - friendBarWidth));
    const left = fitsInToolbar ? centredLeft : Math.max(centredLeft, roomToolsRight(roomToolsCollapsed) + LEFT_MARGIN);
    const bottom = ~~((TOOLBAR_HEIGHT - CHAT_BAR_HEIGHT) / 2) + (fitsInToolbar ? 0 : ABOVE_TOOLBAR_OFFSET);

    return (
        <Box layout={{ position: 'absolute', left, bottom, width: CHAT_BAR_WIDTH, height: CHAT_BAR_HEIGHT, flex: 1, gap: 5 }}>
            <Border
                variant="8"
                tintColor="#e5e5e5"
                layout={{ width: 400, height: 38, flexDirection: 'row', alignItems: 'center' }}
            >
                <Region
                    name="styles"
                    onPointerTap={toggleStyles}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 39, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="style_bg"
                        src={LayoutImage('room-ui/common_chat_style_block.png')}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 38 }}
                    />
                    <ThemeImage
                        name="style_icon"
                        src={LayoutImage('room-ui/common_chat_styles.png')}
                        layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 17, top: 10, height: 19 }}
                    />
                    <Icon
                        variant="7"
                        dynamicStyle="brightness_and_shadow_under"
                        tintColor="#4c4c4c"
                        layout={{ position: 'absolute', left: 10, width: 10, alignSelf: 'center', height: 5 }}
                    />
                    {stylesOpen && (
                        <ChatStyleSelectorView
                            styles={pickableStyles}
                            selectedStyleId={highlightedStyleId}
                            onSelect={(styleId) => {
                                setSelectedStyleId(styleId);
                                setStylesOpen(false);
                            }}
                            onClose={closeStyles}
                        />
                    )}
                </Region>
                {isFloodBlocked && (
                    // `block_text`'s own vars in `chatinput_window_new_xml`, over the default
                    // `regular` style: Ubuntu bold 14 in advanced anti-aliasing, unkerned, red.
                    <ThemeText
                        name="block_text"
                        text={t('chat.input.alert.flood', 'You are talking too fast. Wait %time% seconds.', { time: String(floodRemaining) })}
                        textOptions={{ fill: '#ff0000', fontFamily: 'UbuntuBold', fontSize: 14 }}
                        flashFormat={{ antiAliasType: 'advanced', sharpness: 0, thickness: 0, kerning: false }}
                        layout={{ position: 'absolute', left: 10, top: 9, width: 325, height: 23 }}
                    />
                )}
                {!isFloodBlocked && (
                    <TextInput
                        value={value}
                        onChange={onChange}
                        onEnter={event => sendChat(event.shiftKey)}
                        onKeyDown={onKeyDown}
                        focused={focused}
                        onFocusChange={setFocused}
                        placeholder={t('widgets.chatinput.default')}
                        placeholderColor="#777777"
                        maxLength={MAX_CHARS}
                        fontFamily="Ubuntu"
                        fontSize={17}
                        textColor="#000000"
                        backgroundColor=""
                        focusedBackgroundColor=""
                        layout={{ marginLeft: 60, width: 326, height: 24 }}
                    />
                )}
            </Border>
            <Region
                dynamicStyle="lifted_hover"
                layout={{ width: 41, height: 38 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                    <ThemeImage
                        name="chat_extra_bg"
                        src={LayoutImage('room-ui/habbicons_sticky_note.png')}
                        layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 38 }}
                    />
                    {/* <ThemeImage
                        name="chat_extra_set_icon"
                        src={srcChatExtraSetIcon}
                        tint={tintChatExtraSetIcon}
                        layout={{ position: 'absolute', left: 3, width: 30, top: 3, height: 30 }}
                    /> */}
                    <ThemeImage
                        name="chat_extra_icon"
                        src={LayoutImage('room-ui/habbicons_clip.png')}
                        layout={{ position: 'absolute', right: 0, width: 18, top: 2, height: 15 }}
                    />
                    <ThemeImage
                        name="chat_extra_bg"
                        src={LayoutImage('room-ui/habbicons_sticky_note2.png')}
                        layout={{ position: 'absolute', right: 5, width: 12, bottom: 0, height: 12 }}
                    />
                </Region>
            </Region>
        </Box>
    );
};
