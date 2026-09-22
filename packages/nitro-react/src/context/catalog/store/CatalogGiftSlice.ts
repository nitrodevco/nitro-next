/**
 * Buying as a gift - the two things Flash's `HabboCatalog` keeps for it:
 *
 * - `giftWrappingConfiguration` - `GiftWrappingConfiguration`, built from
 *   `GiftWrappingConfigurationEvent` (`onGiftWrappingConfiguration`), which `CatalogComponent`
 *   asks for when the catalogue first opens: whether wrapping is on, its price, the box furni
 *   types (`stuffTypes`), the box and ribbon types, and the default boxes one of which a gift gets
 *   when no box is picked (`defaultStuffTypes`).
 * - `purchaseWillBeGift` - `§_-1h§`, set by `purchaseWillBeGift(isGift)`: the purchase widget's
 *   gift button opens the purchase confirmation turned into gifting (`turnIntoGifting`), and
 *   `showPurchaseConfirmation` clears it again once it has done so.
 */
import { StateCreator } from 'zustand';

/** `GiftWrappingConfiguration`: the parser's lists as the gift dialog reads them. */
export interface CatalogGiftWrappingConfiguration {
    readonly isEnabled: boolean;
    readonly price: number;
    readonly stuffTypes: readonly number[];
    readonly boxTypes: readonly number[];
    readonly ribbonTypes: readonly number[];
    readonly defaultStuffTypes: readonly number[];
}

type State = {
    giftWrappingConfiguration: CatalogGiftWrappingConfiguration | undefined;
    purchaseWillBeGift: boolean;
};

type Actions = {
    setGiftWrappingConfiguration: (giftWrappingConfiguration: CatalogGiftWrappingConfiguration | undefined) => void;
    setPurchaseWillBeGift: (purchaseWillBeGift: boolean) => void;
};

export const CatalogGiftSliceInitialState: State = {
    giftWrappingConfiguration: undefined,
    purchaseWillBeGift: false,
};

export type CatalogGiftSlice = State & Actions;

export const createCatalogGiftSlice: StateCreator<CatalogGiftSlice, [], [], CatalogGiftSlice> = set => ({
    ...CatalogGiftSliceInitialState,
    setGiftWrappingConfiguration: giftWrappingConfiguration => set({ giftWrappingConfiguration }),
    setPurchaseWillBeGift: purchaseWillBeGift => set({ purchaseWillBeGift }),
});
