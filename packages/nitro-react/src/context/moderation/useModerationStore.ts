import { useStore } from 'zustand';

import { ModerationStore, moderationStore } from './store/ModerationStore';

/** A slice of the ModerationStore (`ModerationManager`'s state), re-rendering only when that slice changes. */
export function useModerationStore<T>(selector: (state: ModerationStore) => T) {
    return useStore(moderationStore, selector);
}
