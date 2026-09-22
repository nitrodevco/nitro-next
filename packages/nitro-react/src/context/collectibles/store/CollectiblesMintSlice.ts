/**
 * The minting tab - Flash `tabs/MintInventoryListTab`: the five things it waits for before it is
 * ready (the token balance, whether minting is open, the mintable types, the wallet and the furni
 * inventory), the grid it fills once (`populateItems`), the token packs on sale, the item selected
 * and the preview `initMintItemPreview` writes for it, and whether a mint is on its way (`§_-LA§`).
 *
 * The grid's amounts are the non-rented inventory ids of each type (`getIdsInInventory`),
 * counted when the grid is filled and again when the inventory changes (`amountChangedForItem`,
 * through `bridgeCollectiblesInventory`).
 */
import type { ICollectiblesProductItem, IMintTokenOffer } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { COLLECTIBLE_PREVIEW_PLACEHOLDER, CollectiblePreview } from './CollectiblesPreview';

/** `CollectibleMintableItemResultMessageEventParser.§_-t1s§`: the mint went through. */
export const COLLECTIBLE_MINT_RESULT_SUCCESS = 1;

/** A `MintInventoryItemRenderer`: the product and its `MintableItemWrapper.amount`. */
export interface CollectiblesMintItem {
    item: ICollectiblesProductItem;
    amount: number;
}

/** What `initMintItemPreview` wrote into the preview's windows. */
export interface CollectiblesMintPreviewInfo {
    /** `preview_furni_name`. */
    productName: string;
    /** `stamp_pricing`. */
    price: number;
    /** `no_furni_notify`. */
    noFurni: boolean;
    /** `mint_lock_text` / the lock icons. */
    regionLocked: boolean;
}

type State = {
    /** `§_-32i§`, `§_-62d§`, `§_-L2d§`, `§_-d1l§`, `§_-b29§`: still waiting for it. */
    mintTokensPending: boolean;
    mintEnabledPending: boolean;
    mintItemTypesPending: boolean;
    mintWalletPending: boolean;
    mintInventoryPending: boolean;
    /** `§_-31s§`. */
    mintReady: boolean;
    /** `§_-76§`: the grid has been filled. */
    mintPopulated: boolean;
    /** `§_-U1Z§` - `mint_token_balance`. */
    mintTokenBalance: number;
    /** `§_-Z1L§`. */
    mintingEnabled: boolean;
    /** `_productItems`. */
    mintProductItems: ICollectiblesProductItem[];
    /** `_items`. */
    mintItems: CollectiblesMintItem[];
    /** `§_-tC§`, -1 for none. */
    mintSelectedIndex: number;
    /** `_tokenOffers`. */
    mintTokenOffers: IMintTokenOffer[];
    /** `stamps_purchase_dropdown.selection`. */
    mintSelectedOfferIndex: number;
    /** `silver_cost_text`. */
    mintSilverCost: string;
    /** `silver_buy_button`: disabled until an affordable pack is picked. */
    mintBuyEnabled: boolean;
    /** The wallet setter has run: `stamp_purchasing_container` / `no_wallet_container` follow the wallet from then on. */
    mintWalletKnown: boolean;
    /** `§_-318§`. */
    mintPreview: CollectiblePreview;
    mintPreviewInfo: CollectiblesMintPreviewInfo | null;
    /** `collect_button`. */
    mintCollectEnabled: boolean;
    /** `§_-LA§`: a `MintItem` was sent and has not been answered. */
    minting: boolean;
};

type Actions = {
    patchCollectiblesMint: (patch: Partial<State>) => void;
};

export const CollectiblesMintSliceInitialState: State = {
    mintTokensPending: false,
    mintEnabledPending: false,
    mintItemTypesPending: false,
    mintWalletPending: false,
    mintInventoryPending: false,
    mintReady: false,
    mintPopulated: false,
    mintTokenBalance: 0,
    mintingEnabled: false,
    mintProductItems: [],
    mintItems: [],
    mintSelectedIndex: -1,
    mintTokenOffers: [],
    mintSelectedOfferIndex: -1,
    mintSilverCost: '1',
    mintBuyEnabled: true,
    mintWalletKnown: false,
    mintPreview: COLLECTIBLE_PREVIEW_PLACEHOLDER,
    mintPreviewInfo: null,
    mintCollectEnabled: true,
    minting: false,
};

export type CollectiblesMintSlice = State & Actions;

export const createCollectiblesMintSlice: StateCreator<CollectiblesMintSlice, [], [], CollectiblesMintSlice> = set => ({
    ...CollectiblesMintSliceInitialState,
    patchCollectiblesMint: patch => set(patch),
});
