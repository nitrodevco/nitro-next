/**
 * The chat settings of the toolbar's chat settings window
 * (`toolbar/extensions/settings/ChatSettingsView`), which are `HabboFreeFlowChat`'s account-level
 * preferences. `updateChatPreferences` sanitizes each of the three against its own enum, drops a
 * change that alters nothing, and only then sends - so a menu reporting the selection it already
 * has costs no packet.
 */
import { RoomChatBubbleWidthType, RoomChatModeType, RoomChatScrollSpeedType } from '@nitrodevco/nitro-api';
import { SetChatPreferencesComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `sanitizeChatMode` / `sanitizeChatBubbleWidth` / `sanitizeChatScrollSpeed`: an unknown value is the default. */
const sanitize = <T extends number>(value: number, allowed: readonly T[], fallback: T): T =>
    (allowed.includes(value as T) ? (value as T) : fallback);

const CHAT_MODES = [ RoomChatModeType.FreeFlow, RoomChatModeType.Old ] as const;
const BUBBLE_WIDTHS = [ RoomChatBubbleWidthType.Wide, RoomChatBubbleWidthType.Normal, RoomChatBubbleWidthType.Thin ] as const;
const SCROLL_SPEEDS = [ RoomChatScrollSpeedType.Fast, RoomChatScrollSpeedType.Normal, RoomChatScrollSpeedType.Slow ] as const;

/** `HabboFreeFlowChat.updateChatPreferences`. */
export const updateChatPreferences = (send: Send, chatMode: number, chatBubbleWidth: number, chatScrollSpeed: number) => {
    const state = userStore.getState();
    const mode = sanitize(chatMode, CHAT_MODES, RoomChatModeType.FreeFlow);
    const bubbleWidth = sanitize(chatBubbleWidth, BUBBLE_WIDTHS, RoomChatBubbleWidthType.Normal);
    const scrollSpeed = sanitize(chatScrollSpeed, SCROLL_SPEEDS, RoomChatScrollSpeedType.Normal);

    if ((state.chatMode === mode) && (state.chatBubbleWidth === bubbleWidth) && (state.chatScrollSpeed === scrollSpeed)) return;

    state.setChatPreferences({
        preferredChatStyle: state.preferredChatStyle,
        freeFlowChatDisabled: state.freeFlowChatDisabled,
        chatSizePreference: state.chatSizePreference,
        chatMode: mode,
        chatBubbleWidth: bubbleWidth,
        chatScrollSpeed: scrollSpeed,
    });

    send(new SetChatPreferencesComposer({ chatMode: mode, chatBubbleWidth: bubbleWidth, chatScrollSpeed: scrollSpeed }));
};
