/**
 * The purchase confirmation of a mint token pack or a shop offer - `HabboCatalog.showPurchaseConfirmation`
 * with a `MintTokenPurchaseOffer` or an `NftStorePurchaseOffer`, which opens the catalogue's one
 * `PurchaseConfirmationDialog` (`§_-Q1J§`). The port's catalogue dialog lives in the catalogue
 * window's own store and sells catalogue offers only, so the collectibles hub keeps its own:
 * the offer, the wallet it is bought into (`showOffer`'s extra parameter), the `nft_image`
 * widget's preview for a shop offer, and whether the buy was sent.
 */
import type { IMintTokenOffer, INftStoreOffer } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL, COLLECTIBLE_PREVIEW_NONE, CollectiblePreview, CollectiblePreviewEasterEgg } from './CollectiblesPreview';

/** `MintTokenPurchaseOffer` (product type `MINT_TOKEN`) or `NftStorePurchaseOffer` (product type `n`). */
export type CollectiblesPurchaseOffer
    = | { kind: 'mint_token'; offer: IMintTokenOffer }
        | { kind: 'nft'; offer: INftStoreOffer };

type State = {
    purchaseOffer: CollectiblesPurchaseOffer | null;
    /** `§_-527§`: the wallet. */
    purchaseWallet: string;
    /** `buy_button` / `cancel_button` were disabled by `onBuyButtonClick`. */
    purchasing: boolean;
    /** `nft_image`'s `product_image` widget. */
    purchasePreview: CollectiblePreview;
    purchasePreviewEasterEgg: CollectiblePreviewEasterEgg;
};

type Actions = {
    patchCollectiblesPurchase: (patch: Partial<State>) => void;
};

export const CollectiblesPurchaseSliceInitialState: State = {
    purchaseOffer: null,
    purchaseWallet: '',
    purchasing: false,
    purchasePreview: COLLECTIBLE_PREVIEW_NONE,
    purchasePreviewEasterEgg: COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL,
};

export type CollectiblesPurchaseSlice = State & Actions;

export const createCollectiblesPurchaseSlice: StateCreator<CollectiblesPurchaseSlice, [], [], CollectiblesPurchaseSlice> = set => ({
    ...CollectiblesPurchaseSliceInitialState,
    patchCollectiblesPurchase: patch => set(patch),
});
