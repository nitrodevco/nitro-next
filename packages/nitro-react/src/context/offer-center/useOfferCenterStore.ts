import { useStore } from 'zustand';

import { OfferCenterStore, offerCenterStore } from './store/OfferCenterStore';

/**
 * A slice of the OfferCenterStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside. Select one field
 * per call, never an object literal.
 */
export function useOfferCenterStore<T>(selector: (state: OfferCenterStore) => T) {
    return useStore(offerCenterStore, selector);
}
