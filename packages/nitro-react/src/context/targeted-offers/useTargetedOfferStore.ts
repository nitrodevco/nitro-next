import { useStore } from 'zustand';

import { TargetedOfferStore, targetedOfferStore } from './store/TargetedOfferStore';

/**
 * A slice of the TargetedOfferStore (`OfferController`), re-rendering only when that slice
 * changes. It reads the app-wide singleton, so it works anywhere - there is no provider to be
 * inside. Select one field per call, never an object literal.
 */
export function useTargetedOfferStore<T>(selector: (state: TargetedOfferStore) => T) {
    return useStore(targetedOfferStore, selector);
}
