/**
 * The catalogue's purchase flows that reach past the catalogue window - what Flash's
 * `HabboCatalog` keeps for the whole session rather than per catalogue window: dragging an offer
 * into the room (`CatalogPlacementSlice`), the rent and buyout confirmation the infostand and the
 * inventory open (`CatalogRentSlice`), and the gift receiver the present widget names
 * (`CatalogGiftReceiverSlice`).
 *
 * An app-wide singleton, unlike the window-scoped catalogue store (`context/catalog`): the room
 * widgets and the inventory call into these flows, and a drag hides the catalogue window it
 * started from.
 */
import { createStore } from 'zustand';

import { CatalogGiftReceiverSlice, createCatalogGiftReceiverSlice } from './CatalogGiftReceiverSlice';
import { CatalogPlacementSlice, createCatalogPlacementSlice } from './CatalogPlacementSlice';
import { CatalogRentSlice, createCatalogRentSlice } from './CatalogRentSlice';

export type CatalogPurchaseStore = CatalogPlacementSlice & CatalogRentSlice & CatalogGiftReceiverSlice;

export const createCatalogPurchaseStore = () => createStore<CatalogPurchaseStore>()((set, get, store) => ({
    ...createCatalogPlacementSlice(set, get, store),
    ...createCatalogRentSlice(set, get, store),
    ...createCatalogGiftReceiverSlice(set, get, store),
}));

export const catalogPurchaseStore = createCatalogPurchaseStore();
