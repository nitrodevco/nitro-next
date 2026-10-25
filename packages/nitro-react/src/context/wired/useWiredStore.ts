import { useStore } from 'zustand';

import { WiredStore, wiredStore } from './store/WiredStore';

/**
 * A slice of the WiredStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere - there is no provider to be inside. Select one field per
 * call, never an object literal.
 */
export function useWiredStore<T>(selector: (state: WiredStore) => T) {
    return useStore(wiredStore, selector);
}
