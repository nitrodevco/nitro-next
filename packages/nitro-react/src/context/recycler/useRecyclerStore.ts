import { useStore } from 'zustand';

import { RecyclerStore, recyclerStore } from './store/RecyclerStore';

/**
 * A slice of the RecyclerStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere. Select one field per call, never an object literal.
 */
export function useRecyclerStore<T>(selector: (state: RecyclerStore) => T) {
    return useStore(recyclerStore, selector);
}
