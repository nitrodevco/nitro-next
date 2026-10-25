import { useStore } from 'zustand';

import { InventoryStore, inventoryStore } from './store/InventoryStore';

/**
 * A slice of the InventoryStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field
 * per call, never an object literal.
 */
export function useInventoryStore<T>(selector: (state: InventoryStore) => T) {
    return useStore(inventoryStore, selector);
}
