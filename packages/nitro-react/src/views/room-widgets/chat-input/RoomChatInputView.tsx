import { ClubLevelEnum, SecurityLevelEnum } from '@nitrodevco/nitro-api';
import { CancelTypingComposer, ChatComposer, SetChatStylePreferenceComposer, ShoutComposer, StartTypingComposer, WhisperComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo, useRef, useState } from 'react';

import { IChatStyle } from '#base/chat';
import { useConfigValue, useOwnChatPreferences, useOwnClubLevel, useOwnIsAmbassador, useOwnSecurityLevel, useRoomChatActions, useRoomChatSelector, useRoomContext, useRoomSelectedObjectDetails, useRoomSelector, useTranslation, useUserActions, useWebSocketContext } from '#base/context';
import { useChatStyles } from '#base/hooks';
import { Border, Box, Icon, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { ChatStyleSelectorView } from './ChatStyleSelectorView';

/** `RoomChatInputView._Str_10663` - the gap kept from whatever sits left of the chat bar. */
const LEFT_MARGIN = 12;
/** Clears the 54px toolbar the way the Flash bar sat just above its own. */
const BOTTOM_OFFSET = 60;
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
    const room = useRoomSelector();
    const { send } = useWebSocketContext();
    const { floodBlockSeconds, floodBlockStamp, chatInputContent } = useRoomChatSelector();
    const allStyles = useChatStyles();
    const { clearChatInputContent } = useRoomChatActions();
    const { preferredChatStyle, chatSizePreference } = useOwnChatPreferences();
    const { setPreferredChatStyle } = useUserActions();
    const clubLevel = useOwnClubLevel();
    const securityLevel = useOwnSecurityLevel();
    const isAmbassador = useOwnIsAmbassador();
    const { selectedAvatarId } = useRoomSelectedObjectDetails();
    const selectedAvatarName = useRoomContext(x => x.usersByRoomObjectId[selectedAvatarId]?.name ?? '');
    const customStylesEnabled = useConfigValue<boolean>('custom.chat.styles.enabled') ?? true;
    const disabledStyles = useConfigValue<string>('disabled.custom.chat.styles') ?? '';

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

    /** The styles this user may pick - `RoomChatInputView.createWindow`'s filter. */
    const pickableStyles = useMemo<IChatStyle[]>(() => {
        if (!customStylesEnabled) return [];

        const disabled = disabledStyles.split(',').map(x => x.trim()).filter(x => x.length);
        const isStaff = securityLevel >= SecurityLevelEnum.Moderator;
        const styles: IChatStyle[] = [];

        for (const style of allStyles) {
            const styleId = style.id;

            if (style.minRankRequired > 0) {
                if (Number(securityLevel) >= style.minRankRequired) styles.push(style);

                continue;
            }

            if (!style.isSystemStyle && (disabled.indexOf(String(styleId)) === -1)) {
                if (style.isHcOnly && (clubLevel >= ClubLevelEnum.Club)) styles.push(style);
                else if (!style.isHcOnly && !style.isAmbassadorOnly) styles.push(style);
            }

            if (style.isAmbassadorOnly && (isStaff || isAmbassador)) styles.push(style);
        }

        return styles.filter((style, index) => styles.indexOf(style) === index);
    }, [ allStyles, customStylesEnabled, disabledStyles, securityLevel, clubLevel, isAmbassador ]);

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

        if (message.length) {
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

    // The avatar menu asked us to whisper to someone (`RoomWidgetUpdateChatInputContentEvent`).
    useEffect(() => {
        if (!chatInputContent) return;

        const prefix = (chatInputContent.mode === 'whisper') ? whisperMode : shoutMode;
        const next = `${prefix} ${chatInputContent.userName.length ? `${chatInputContent.userName} ` : ''}`;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(next);
        lastContentRef.current = next;
        setFocused(true);
        clearChatInputContent();
    }, [ chatInputContent, whisperMode, shoutMode, clearChatInputContent ]);

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

    return (
        <Box layout={{ position: 'absolute', left: LEFT_MARGIN, bottom: BOTTOM_OFFSET, width: 451, height: 39, flex: 1, gap: 5 }}>
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
                        src={LayoutImage('common_chat_style_block.png')}
                        layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 38 }}
                    />
                    <ThemeImage
                        name="style_icon"
                        src={LayoutImage('common_chat_styles.png')}
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
                    <ThemeText
                        name="block_text"
                        text={t('chat.input.alert.flood', 'You are talking too fast. Wait %time% seconds.', { time: String(floodRemaining) })}
                        textOptions={{ fill: '#ff0000', fontFamily: 'UbuntuBold', fontSize: 14 }}
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
                        src={LayoutImage('habbicons_sticky_note.png')}
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
                        src={LayoutImage('habbicons_clip.png')}
                        layout={{ position: 'absolute', right: 0, width: 18, top: 2, height: 15 }}
                    />
                    <ThemeImage
                        name="chat_extra_bg"
                        src={LayoutImage('habbicons_sticky_note2.png')}
                        layout={{ position: 'absolute', right: 5, width: 12, bottom: 0, height: 12 }}
                    />
                </Region>
            </Region>
        </Box>
    );
};
