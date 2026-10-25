/**
 * The catalogue's marketplace - what Flash's `catalog/marketplace/MarketPlaceLogic` keeps between
 * packets: the last search's offers and hit count (`_latestOffers`, `§_-hu§`), the own offers of
 * the category last asked for (`_latestOwnOffers`, `§_-v1d§`) with the credits waiting
 * (`§_-vI§`), the average price period from `MarketplaceConfiguration` (`§_-pH§`), the stats of the
 * furni last asked about (`§_-J2K§`, and `§_-F2C§` / `§_-G11§`, which furni that was), the
 * category a clear is pending for (`§_-G3§`), the last search's arguments (`refreshOffers` repeats
 * them) and the `MarketplaceConfirmationDialog` on show.
 *
 * `IMarketPlaceVisualization.listUpdatedNotify` is a serial here: `marketplaceOffersSerial` and
 * `marketplaceOwnOffersSerial` count the lists received, and the widgets react to a change the
 * way Flash's do to the call (the public widget closes its details view). `removeOfferIds` is the
 * own list losing those offers.
 *
 * Flash's logic lives as long as the catalogue component and survives a republished catalogue
 * (`HabboCatalog.reset` leaves it alone), so `resetCatalog` does not reset this slice.
 */
import { StateCreator } from 'zustand';

import { MarketplaceItemStats, MarketplaceOfferData } from '#base/utils';

/** `MarketPlaceLogic.requestOffers`' arguments, kept for `refreshOffers`. */
export interface MarketplaceSearch {
    minPrice: number;
    maxPrice: number;
    searchString: string;
    sortType: number;
    combineUniques: boolean;
}

/** `MarketplaceConfirmationDialog.showConfirmation(type, offer)`. */
export interface MarketplaceConfirmation {
    type: number;
    offer: MarketplaceOfferData;
}

type State = {
    marketplaceOffers: MarketplaceOfferData[] | undefined;
    marketplaceTotalItemsFound: number;
    marketplaceOffersSerial: number;
    marketplaceOwnOffers: MarketplaceOfferData[] | undefined;
    marketplaceOwnOffersSerial: number;
    marketplaceCreditsWaiting: number;
    marketplaceOwnOffersCategory: number;
    marketplacePendingClearCategory: number;
    marketplaceAveragePricePeriod: number;
    marketplaceStatsCategory: number;
    marketplaceStatsFurniTypeId: number;
    marketplaceItemStats: MarketplaceItemStats | undefined;
    marketplaceSearch: MarketplaceSearch;
    marketplaceConfirmation: MarketplaceConfirmation | undefined;
};

type Actions = {
    /** `onOffers`: the new list replaces the old, and the widgets are told. */
    setMarketplaceOffers: (offers: MarketplaceOfferData[], totalItemsFound: number) => void;
    /** A change to the held list the widgets are told of (`onBuyResult` 2 and 3). */
    updateMarketplaceOffers: (offers: MarketplaceOfferData[]) => void;
    /** `onOwnOffers`. */
    setMarketplaceOwnOffers: (offers: MarketplaceOfferData[], creditsWaiting: number) => void;
    /** `removeOfferIds` after a cancel, a recall or a clear: the offers leave the own list without a new one arriving. */
    removeMarketplaceOwnOffers: (offerIds: readonly number[]) => void;
    setMarketplaceOwnOffersCategory: (category: number) => void;
    setMarketplacePendingClearCategory: (category: number) => void;
    setMarketplaceAveragePricePeriod: (period: number) => void;
    /** `requestItemStats`: which furni the next stats are for. */
    setMarketplaceStatsRequest: (category: number, furniTypeId: number) => void;
    setMarketplaceItemStats: (stats: MarketplaceItemStats) => void;
    setMarketplaceSearch: (search: MarketplaceSearch) => void;
    setMarketplaceConfirmation: (confirmation: MarketplaceConfirmation | undefined) => void;
};

export const CatalogMarketplaceSliceInitialState: State = {
    marketplaceOffers: undefined,
    marketplaceTotalItemsFound: 0,
    marketplaceOffersSerial: 0,
    marketplaceOwnOffers: undefined,
    marketplaceOwnOffersSerial: 0,
    marketplaceCreditsWaiting: 0,
    marketplaceOwnOffersCategory: 1,
    marketplacePendingClearCategory: 0,
    marketplaceAveragePricePeriod: -1,
    marketplaceStatsCategory: 0,
    marketplaceStatsFurniTypeId: 0,
    marketplaceItemStats: undefined,
    marketplaceSearch: { minPrice: 0, maxPrice: 0, searchString: '', sortType: -1, combineUniques: true },
    marketplaceConfirmation: undefined,
};

export type CatalogMarketplaceSlice = State & Actions;

export const createCatalogMarketplaceSlice: StateCreator<CatalogMarketplaceSlice, [], [], CatalogMarketplaceSlice> = set => ({
    ...CatalogMarketplaceSliceInitialState,
    setMarketplaceOffers: (marketplaceOffers, marketplaceTotalItemsFound) => set(x => ({ marketplaceOffers, marketplaceTotalItemsFound, marketplaceOffersSerial: x.marketplaceOffersSerial + 1 })),
    updateMarketplaceOffers: marketplaceOffers => set(x => ({ marketplaceOffers, marketplaceOffersSerial: x.marketplaceOffersSerial + 1 })),
    setMarketplaceOwnOffers: (marketplaceOwnOffers, marketplaceCreditsWaiting) => set(x => ({ marketplaceOwnOffers, marketplaceCreditsWaiting, marketplaceOwnOffersSerial: x.marketplaceOwnOffersSerial + 1 })),
    removeMarketplaceOwnOffers: offerIds => set((x) => {
        if (!x.marketplaceOwnOffers || !offerIds.length) return x;

        const removed = new Set(offerIds);

        return { marketplaceOwnOffers: x.marketplaceOwnOffers.filter(offer => !removed.has(offer.offerId)) };
    }),
    setMarketplaceOwnOffersCategory: marketplaceOwnOffersCategory => set({ marketplaceOwnOffersCategory }),
    setMarketplacePendingClearCategory: marketplacePendingClearCategory => set({ marketplacePendingClearCategory }),
    setMarketplaceAveragePricePeriod: marketplaceAveragePricePeriod => set({ marketplaceAveragePricePeriod }),
    setMarketplaceStatsRequest: (marketplaceStatsCategory, marketplaceStatsFurniTypeId) => set({ marketplaceStatsCategory, marketplaceStatsFurniTypeId }),
    setMarketplaceItemStats: marketplaceItemStats => set({ marketplaceItemStats }),
    setMarketplaceSearch: marketplaceSearch => set({ marketplaceSearch }),
    setMarketplaceConfirmation: marketplaceConfirmation => set({ marketplaceConfirmation }),
});
