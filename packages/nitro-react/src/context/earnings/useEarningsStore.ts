import { useStore } from 'zustand';

import { EarningsStore, earningsStore } from './store/EarningsStore';

/**
 * A slice of the EarningsStore (the vault, `EarningsController`), re-rendering only when that
 * slice changes. It reads the app-wide singleton, so it works anywhere - there is no provider to
 * be inside. Select one field per call, never an object literal.
 */
export function useEarningsStore<T>(selector: (state: EarningsStore) => T) {
    return useStore(earningsStore, selector);
}
