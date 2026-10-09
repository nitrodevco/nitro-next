import { useStore } from 'zustand';

import { ChatHistoryStore, chatHistoryStore } from './store/ChatHistoryStore';

/**
 * A slice of the ChatHistoryStore (`ChatHistoryBuffer`), re-rendering only when that slice changes. It
 * reads the app-wide singleton, so it works anywhere. Select one field per call.
 */
export function useChatHistoryStore<T>(selector: (state: ChatHistoryStore) => T) {
    return useStore(chatHistoryStore, selector);
}
