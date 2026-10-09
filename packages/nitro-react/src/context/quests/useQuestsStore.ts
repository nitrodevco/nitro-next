import { useStore } from 'zustand';

import { QuestsStore, questsStore } from './store/QuestsStore';

/**
 * A slice of the QuestsStore (`QuestsList`), re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field per
 * call, never an object literal.
 */
export function useQuestsStore<T>(selector: (state: QuestsStore) => T) {
    return useStore(questsStore, selector);
}
