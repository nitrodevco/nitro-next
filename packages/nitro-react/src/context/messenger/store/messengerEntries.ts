/**
 * How `MainView` lays a conversation's entries out as list items: consecutive messages from the
 * same side within ten minutes share one `illumina_chat_bubble` (`shouldCombineWithPreviousEntry`,
 * applied by `addToConversationAndCombine`); every notice is an item of its own.
 */
import { MESSENGER_COMBINE_THRESHOLD_MS, MESSENGER_ENTRY_OTHER, MESSENGER_ENTRY_OWN, MessengerChatEntry } from './MessengerStore';

/** `MainView.shouldCombineWithPreviousEntry`. */
export const shouldCombineMessengerEntries = (chatId: number, entry: MessengerChatEntry, previous: MessengerChatEntry | null | undefined): boolean => {
    if (!previous) return false;

    const recent = entry.sentAt < (previous.sentAt + MESSENGER_COMBINE_THRESHOLD_MS);

    if (chatId > 0) return (entry.type === previous.type) && ((entry.type === MESSENGER_ENTRY_OWN) || (entry.type === MESSENGER_ENTRY_OTHER)) && recent;

    // A group chat: another member's message only joins a bubble of the same sender.
    const sameSender = (entry.type === MESSENGER_ENTRY_OTHER) && (previous.senderId === entry.senderId);

    return (entry.type === previous.type) && ((entry.type === MESSENGER_ENTRY_OWN) || sameSender) && recent;
};

/** One conversation list item: a bubble's run of messages, or a single notice. */
export interface MessengerListItem {
    key: string;
    entries: MessengerChatEntry[];
}

/** The entries of `chatId` as list items, oldest first. */
export const groupMessengerEntries = (chatId: number, entries: readonly MessengerChatEntry[]): MessengerListItem[] => {
    const items: MessengerListItem[] = [];

    entries.forEach((entry, index) => {
        const last = items[items.length - 1];

        if (last && shouldCombineMessengerEntries(chatId, entry, last.entries[last.entries.length - 1])) last.entries.push(entry);
        else items.push({ key: `${index}:${entry.messageId || entry.awaitConfirmationId || entry.type}`, entries: [ entry ] });
    });

    return items;
};
