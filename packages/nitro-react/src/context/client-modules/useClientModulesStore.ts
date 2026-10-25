import { useStore } from 'zustand';

import { ClientModulesStore, clientModulesStore } from './store';

/** A slice of the ClientModulesStore, re-rendering only when that slice changes. */
export function useClientModulesStore<T>(selector: (state: ClientModulesStore) => T) {
    return useStore(clientModulesStore, selector);
}
