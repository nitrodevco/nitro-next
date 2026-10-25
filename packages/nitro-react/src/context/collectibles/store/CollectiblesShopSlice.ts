/**
 * The shop tab - Flash `tabs/ShopTab`: the offers (`onNftStoreOffers`, taken once), grouped under
 * the localized name of their category (`createNavigationNodes`, in the order the categories
 * first appear), the active category, the offer selected and what `initItemPreview` wrote for it.
 */
import type { INftStoreOffer } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { COLLECTIBLE_PREVIEW_PLACEHOLDER, CollectiblePreview } from './CollectiblesPreview';

/** What `initItemPreview` wrote into the preview's windows. */
export interface CollectiblesShopPreviewInfo {
    /** `preview_furni_name`. */
    productName: string;
    /** `price_text`. */
    price: string;
    /** `mintlimit_container` and its `mintlimit_text`. */
    mintLimitVisible: boolean;
    mintLimitText: string;
    /** `buy_button`. */
    buyEnabled: boolean;
}

type State = {
    /** `_waitingForOffers`. */
    shopWaiting: boolean;
    /** `§_-31s§`. */
    shopReady: boolean;
    /** The navigation nodes' categories, in list order. */
    shopCategories: string[];
    /** `_offersByCategory`. */
    shopOffersByCategory: Record<string, INftStoreOffer[]>;
    /** `§_-21l§`. */
    shopActiveCategory: string | null;
    /** `§_-tC§`: the offer selected in the active category's grid, -1 for none. */
    shopSelectedIndex: number;
    /** `§_-318§`. */
    shopPreview: CollectiblePreview;
    shopPreviewInfo: CollectiblesShopPreviewInfo | null;
};

type Actions = {
    patchCollectiblesShop: (patch: Partial<State>) => void;
};

export const CollectiblesShopSliceInitialState: State = {
    shopWaiting: false,
    shopReady: false,
    shopCategories: [],
    shopOffersByCategory: {},
    shopActiveCategory: null,
    shopSelectedIndex: -1,
    shopPreview: COLLECTIBLE_PREVIEW_PLACEHOLDER,
    shopPreviewInfo: null,
};

export type CollectiblesShopSlice = State & Actions;

export const createCollectiblesShopSlice: StateCreator<CollectiblesShopSlice, [], [], CollectiblesShopSlice> = set => ({
    ...CollectiblesShopSliceInitialState,
    patchCollectiblesShop: patch => set(patch),
});
