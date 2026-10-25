import { useStore } from 'zustand';

import { HintStore, hintStore } from './store/HintStore';

/**
 * A slice of the HintStore (`HintManager`), re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere.
 */
export function useHintStore<T>(selector: (state: HintStore) => T) {
    return useStore(hintStore, selector);
}
