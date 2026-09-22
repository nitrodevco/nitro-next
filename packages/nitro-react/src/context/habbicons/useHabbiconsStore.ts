import { useStore } from 'zustand';

import { HabbiconsStore, habbiconsStore } from './store/HabbiconsStore';

/**
 * A slice of the HabbiconsStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field
 * per call, never an object literal.
 */
export function useHabbiconsStore<T>(selector: (state: HabbiconsStore) => T) {
    return useStore(habbiconsStore, selector);
}
