/**
 * The catalogue window's store - what Flash's `HabboCatalog` keeps for one catalogue type, one
 * slice per part: the index and navigation (`CatalogIndexSlice`), the page on show
 * (`CatalogPageSlice`) and the purchase confirmation (`CatalogPurchaseSlice`). Window-scoped:
 * `CatalogContextProvider` creates one per catalogue type, and its packet handlers are registered
 * from the window (`handlers/catalog`).
 *
 * `resetCatalog` is `HabboCatalog.reset` after `CatalogPublishedMessage`: every slice goes back to
 * its initial state and the open page is disposed; the catalogue type stays.
 */
import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { CatalogBuildersClubSlice, createCatalogBuildersClubSlice } from './CatalogBuildersClubSlice';
import { CatalogBundleDiscountSlice, createCatalogBundleDiscountSlice } from './CatalogBundleDiscountSlice';
import { CatalogClubSlice, createCatalogClubSlice } from './CatalogClubSlice';
import { CatalogGiftSlice, createCatalogGiftSlice } from './CatalogGiftSlice';
import { CatalogGuildSlice, createCatalogGuildSlice } from './CatalogGuildSlice';
import { CatalogIndexSlice, CatalogIndexSliceInitialState, createCatalogIndexSlice } from './CatalogIndexSlice';
import { CatalogLimitedEditionSlice, CatalogLimitedEditionSliceInitialState, createCatalogLimitedEditionSlice } from './CatalogLimitedEditionSlice';
import { CatalogMarketplaceSlice, createCatalogMarketplaceSlice } from './CatalogMarketplaceSlice';
import { CatalogMediaSlice, createCatalogMediaSlice } from './CatalogMediaSlice';
import { CatalogPageSlice, CatalogPageSliceInitialState, createCatalogPageSlice } from './CatalogPageSlice';
import { CatalogPetSlice, createCatalogPetSlice } from './CatalogPetSlice';
import { CatalogPurchaseSlice, CatalogPurchaseSliceInitialState, createCatalogPurchaseSlice } from './CatalogPurchaseSlice';
import { CatalogRoomAdSlice, createCatalogRoomAdSlice } from './CatalogRoomAdSlice';

type State = {
    catalogType: CatalogTypeEnum;
};

type Actions = {
    resetCatalog: () => void;
};

export type CatalogStore = State & Actions & CatalogIndexSlice & CatalogPageSlice & CatalogPurchaseSlice
    & CatalogBuildersClubSlice
    & CatalogBundleDiscountSlice
    & CatalogLimitedEditionSlice
    & CatalogPetSlice
    & CatalogGuildSlice
    & CatalogRoomAdSlice
    & CatalogMediaSlice
    & CatalogClubSlice
    & CatalogMarketplaceSlice
    & CatalogGiftSlice;

export const createCatalogStore = (catalogType: CatalogTypeEnum) => createStore<CatalogStore>()((set, get, store) => ({
    catalogType,
    resetCatalog: () => {
        get().activePage?.dispose();

        set({ ...CatalogIndexSliceInitialState, ...CatalogPageSliceInitialState, ...CatalogPurchaseSliceInitialState, ...CatalogLimitedEditionSliceInitialState, pageSerial: get().pageSerial + 1 });
    },
    ...createCatalogIndexSlice(set, get, store),
    ...createCatalogPageSlice(set, get, store),
    ...createCatalogPurchaseSlice(set, get, store),
    // `HabboCatalog`'s builder fields outlive `reset()`, so `resetCatalog` leaves this slice alone.
    ...createCatalogBuildersClubSlice(set, get, store),
    // `HabboCatalog.reset` keeps the ruleset and asks for it again on the next `init()`.
    ...createCatalogBundleDiscountSlice(set, get, store),
    // The raffle belongs to the purchase confirmation, which `resetCatalog` closes.
    ...createCatalogLimitedEditionSlice(set, get, store),
    // `HabboCatalog.reset` keeps `_sellablePetPalettes`, the guild controller and the room ad data, so `resetCatalog` leaves these three alone.
    ...createCatalogPetSlice(set, get, store),
    ...createCatalogGuildSlice(set, get, store),
    ...createCatalogRoomAdSlice(set, get, store),
    // An official song's id never changes, so `resetCatalog` leaves the song disk page's table alone.
    ...createCatalogMediaSlice(set, get, store),
    // `MarketPlaceLogic` lives as long as the catalogue component, so `resetCatalog` leaves the marketplace alone.
    ...createCatalogMarketplaceSlice(set, get, store),
    // The club controllers outlive `HabboCatalog.reset()` (`init()` only creates them when null), so `resetCatalog` leaves the club alone.
    ...createCatalogClubSlice(set, get, store),
    // `HabboCatalog.reset` keeps `_giftWrappingConfiguration` (and `§_-1h§`), so `resetCatalog` leaves the gift slice alone.
    ...createCatalogGiftSlice(set, get, store),
}));
