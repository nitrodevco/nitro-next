import { useStore } from 'zustand';

import { SpecialItemsStore, specialItemsStore } from './store/SpecialItemsStore';

/**
 * A slice of the SpecialItemsStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field
 * per call, never an object literal.
 */
export function useSpecialItemsStore<T>(selector: (state: SpecialItemsStore) => T) {
    return useStore(specialItemsStore, selector);
}
