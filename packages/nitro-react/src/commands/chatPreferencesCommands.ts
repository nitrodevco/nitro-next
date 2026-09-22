/**
 * The two chat preferences `SetChatStylePreferenceComposer` carries, set the way the Flash
 * `HabboFreeFlowChat` setters set them: each keeps its own value and sends both, so changing the
 * bubble style keeps the font size mode on the server and the other way round.
 */
import { SetChatStylePreferenceComposer } from '@nitrodevco/nitro-packets';

import { clampChatFontSizeMode } from '#base/chat';
import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `HabboFreeFlowChat.preferedChatStyle = styleId`: kept, then sent with the current `chatFontSizeMode`. */
export const setPreferredChatStyle = (send: Send, preferredChatStyle: number) => {
    const { setPreferredChatStyle: setStyle, chatSizePreference } = userStore.getState();

    setStyle(preferredChatStyle);

    send(new SetChatStylePreferenceComposer({ preferredChatStyle, chatFontSizeMode: chatSizePreference }));
};

/**
 * `HabboFreeFlowChat.chatFontSizeMode = mode` (`ChatStyleSelector.fontSizeItemWindowProc`'s click):
 * clamped to 0-4, kept, then sent with the current `preferedChatStyle`. Flash sends it even when
 * the mode is the one already set.
 */
export const setChatFontSizeMode = (send: Send, mode: number) => {
    const { setChatSizePreference, preferredChatStyle } = userStore.getState();
    const chatFontSizeMode = clampChatFontSizeMode(mode);

    setChatSizePreference(chatFontSizeMode);

    send(new SetChatStylePreferenceComposer({ preferredChatStyle, chatFontSizeMode }));
};
