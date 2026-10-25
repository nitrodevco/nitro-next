import { useStore } from 'zustand';

import { CollectiblesStore, collectiblesStore } from './store/CollectiblesStore';

/**
 * A slice of the CollectiblesStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field
 * per call, never an object literal.
 */
export function useCollectiblesStore<T>(selector: (state: CollectiblesStore) => T) {
    return useStore(collectiblesStore, selector);
}
