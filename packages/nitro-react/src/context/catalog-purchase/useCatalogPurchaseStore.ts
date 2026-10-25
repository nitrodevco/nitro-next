import { useStore } from 'zustand';

import { CatalogPurchaseStore, catalogPurchaseStore } from './store/CatalogPurchaseStore';

/**
 * A slice of the catalogue purchase flows' store, re-rendering only when that slice changes. It
 * reads the app-wide singleton, so it works anywhere - there is no provider to be inside. Select
 * one field per call, never an object literal.
 */
export function useCatalogPurchaseStore<T>(selector: (state: CatalogPurchaseStore) => T) {
    return useStore(catalogPurchaseStore, selector);
}
