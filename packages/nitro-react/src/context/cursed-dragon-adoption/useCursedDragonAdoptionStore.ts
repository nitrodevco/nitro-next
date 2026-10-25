import { useStore } from 'zustand';

import { CursedDragonAdoptionStore, cursedDragonAdoptionStore } from './store/CursedDragonAdoptionStore';

/**
 * A slice of the CursedDragonAdoptionStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field
 * per call, never an object literal.
 */
export function useCursedDragonAdoptionStore<T>(selector: (state: CursedDragonAdoptionStore) => T) {
    return useStore(cursedDragonAdoptionStore, selector);
}
