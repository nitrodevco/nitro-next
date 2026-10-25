/**
 * Not Flash's: asks a Turbo server what to offer for one parameter of a chat command
 * (`chat.commands.v2`). The answer lands in the user store through `registerChatCommandHandlers`;
 * an answer to an older request is dropped there.
 */
import { TurboCommandSuggestComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { userStore } from '#base/context/user';
import { chatCommandSuggestKey } from '#base/utils';

export const requestChatCommandSuggestions = (send: Send, command: string, parameter: number, prefix: string, syntax = '', argumentText = '') => {
    const requestId = userStore.getState().beginChatCommandSuggest(chatCommandSuggestKey(command, parameter, prefix, syntax, argumentText));

    send(new TurboCommandSuggestComposer({ requestId, command, parameter, prefix, syntax, argumentText }));
};
