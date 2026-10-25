import { useStore } from 'zustand';

import { SystemStore, systemStore } from './store';

/**
 * A slice of the SystemStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere - there is no provider to be inside.
 */
export function useSystemStore<T>(selector: (state: SystemStore) => T) {
    return useStore(systemStore, selector);
}
