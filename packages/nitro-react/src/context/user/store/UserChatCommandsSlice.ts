/**
 * Not Flash's: the chat commands a Turbo server says the user may use (its `chat.commands.v2`
 * extension), which the chat input completes from as the user types, and the latest values the
 * server offered for one parameter. Flash has no such thing; the completion borrows the look and
 * keys of its gift window's friend suggestions (`PurchaseConfirmationDialog.updateSuggestions`).
 */
import { ITurboCommand } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** The Turbo extension that sends `chatCommands`: see Turbo's `docs/client-capabilities.md`. */
export const TURBO_CHAT_COMMANDS_CAPABILITY = 'chat.commands.v2';

/** What the server offered for one parameter, and the request it answered. */
export interface IChatCommandSuggestions {
    requestId: number;
    /** Command, parameter, syntax path and earlier arguments of the request, so the input can reject stale context. */
    key: string;
    values: string[];
}

type State = {
    /**
     * The commands the user may use, sorted by name, or `null` while the server never sent them:
     * any other server, a Turbo that declined, or `turbo.extensions.disabled`.
     */
    chatCommands: ITurboCommand[] | null;
    /** The answer to the last suggestion request, once it arrives. */
    chatCommandSuggestions: IChatCommandSuggestions | null;
    /** The last request sent, by id and key; an answer to any other is stale and dropped. */
    pendingChatCommandSuggest: { requestId: number; key: string } | null;
    /** Monotonic across tree refreshes so an old answer cannot match a recycled request id. */
    chatCommandSuggestRequestId: number;
};

type Actions = {
    setChatCommands: (chatCommands: ITurboCommand[] | null) => void;
    /** Records a request about to be sent and returns its id. */
    beginChatCommandSuggest: (key: string) => number;
    /** Takes an answer if it is to the last request sent. */
    applyChatCommandSuggestions: (requestId: number, values: string[]) => void;
};

export const UserChatCommandsSliceInitialState: State = {
    chatCommands: null,
    chatCommandSuggestions: null,
    pendingChatCommandSuggest: null,
    chatCommandSuggestRequestId: 0,
};

export type UserChatCommandsSlice = State & Actions;

export const createUserChatCommandsSlice: StateCreator<UserChatCommandsSlice, [], [], State & Actions> = (set, get) => ({
    ...UserChatCommandsSliceInitialState,
    setChatCommands: chatCommands => set({ chatCommands, chatCommandSuggestions: null, pendingChatCommandSuggest: null }),
    beginChatCommandSuggest: (key) => {
        const requestId = get().chatCommandSuggestRequestId + 1;

        set({ chatCommandSuggestRequestId: requestId, pendingChatCommandSuggest: { requestId, key } });

        return requestId;
    },
    applyChatCommandSuggestions: (requestId, values) => {
        const pending = get().pendingChatCommandSuggest;

        if (!pending || (pending.requestId !== requestId)) return;

        set({ chatCommandSuggestions: { requestId, key: pending.key, values } });
    },
});
