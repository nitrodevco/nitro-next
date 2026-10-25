import { TurboCommandSuggestionsMessage, TurboCommandTreeMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { TURBO_CHAT_COMMANDS_CAPABILITY, userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Not Flash's: Turbo's `chat.commands.v2` extension, which `registerUserInfoHandlers` asks for with
 * `permission.nodes`. The tree replaces the last whole; it is taken only once the server has
 * accepted the extension, as the permission nodes are. The suggestions answer
 * `requestChatCommandSuggestions`, and only the latest request's answer is kept.
 */
export const registerChatCommandHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setChatCommands, applyChatCommandSuggestions } = userStore.getState();

    return subscribeAll(subscribe, [
        on(TurboCommandTreeMessage, (data) => {
            if (userStore.getState().turboCapabilities.has(TURBO_CHAT_COMMANDS_CAPABILITY)) setChatCommands(data.commands);
        }),

        on(TurboCommandSuggestionsMessage, data => applyChatCommandSuggestions(data.requestId, data.values)),
    ]);
};
