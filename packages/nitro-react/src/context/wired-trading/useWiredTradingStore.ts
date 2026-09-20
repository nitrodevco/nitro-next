import { useStore } from 'zustand';

import { WiredTradingStore, wiredTradingStore } from './store/WiredTradingStore';

/**
 * A slice of the WiredTradingStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field
 * per call, never an object literal.
 */
export function useWiredTradingStore<T>(selector: (state: WiredTradingStore) => T) {
    return useStore(wiredTradingStore, selector);
}
