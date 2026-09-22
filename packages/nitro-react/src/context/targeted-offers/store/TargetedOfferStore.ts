/**
 * The targeted offer store - the state of Flash's `catalog/targetedoffers/OfferController`, a
 * session-lifetime part of `HabboCatalog`: the offer and which of its views is up. An app-wide
 * singleton, because the offer arrives whether the catalogue is open or not and its minimized
 * view lives in the toolbar's extension column.
 */
import { createStore } from 'zustand';

import { createTargetedOfferSlice, TargetedOfferSlice } from './TargetedOfferSlice';
import { createTargetedOfferViewSlice, TargetedOfferViewSlice } from './TargetedOfferViewSlice';

export type TargetedOfferStore = TargetedOfferSlice & TargetedOfferViewSlice;

export const createTargetedOfferStore = () => createStore<TargetedOfferStore>()((set, get, store) => ({
    ...createTargetedOfferSlice(set, get, store),
    ...createTargetedOfferViewSlice(set, get, store),
}));

export const targetedOfferStore = createTargetedOfferStore();
