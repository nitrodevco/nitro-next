/**
 * The purchase confirmation dialog - Flash's `HabboCatalog._purchaseWindow`, the
 * `PurchaseConfirmationDialog` `showPurchaseConfirmation` opens with the offer, the page, the
 * extra parameter, the quantity and the stuff data the page's purchase widget collected.
 *
 * `isPurchasing` is the dialog waiting for the server's answer to its `PurchaseFromCatalog`:
 * `onBuyButtonClick` disables its buy and cancel buttons. Every answer clears it -
 * `PurchaseOKMessage`, `PurchaseErrorMessage`, `PurchaseNotAllowedMessage` and
 * `NotEnoughBalanceMessage` - so a refused purchase can be tried again instead of leaving the
 * button dead.
 *
 * The dialog is one object with two windows: `purchaseDialogView` is `confirmation`
 * (`showConfirmationDialog`, `purchase_confirmation`) until a gift purchase's buy button calls
 * `showGiftDialog`, which replaces it with `gift` (`gift_wrapping`) and draws the box a gift gets
 * when none is picked from the configuration's defaults at random (`giftDefaultStuffType`,
 * `§_-t1o§`). `giveGiftEnabled` is that
 * window's `enableGiftButton`: off once the gift is sent, on again when the receiver is not found
 * or the purse is short. The limited edition raffle the dialog shows is
 * `CatalogLimitedEditionSlice.ltdRaffleRunning`.
 *
 * `purchaseWidgetState` is the port's own. Flash keeps a page's widgets alive while the catalogue
 * window is hidden, and a drag into the room hides it (`requestSelectedItemToMover`): the drop
 * then reaches `PurchaseCatalogWidget.initPurchase` through `CatalogWidgetInitPurchaseEvent`. The
 * port unmounts a hidden window's widgets, so the purchase widget records here, for its page,
 * what `initPurchase` would buy with, and the catalogue's always-mounted purchase flow
 * (`useCatalogPurchaseFlow`) answers `INIT_PURCHASE` from it.
 */
import { IObjectData, IPetCustomPart, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

/** What Flash's `IRoomEngine.getPetImage(type, palette, color, direction, 64, listener, true, 0, customParts)` is asked for. */
export interface PetImageRequest {
    readonly typeId: number;
    readonly paletteId: number;
    readonly color: number;
    /** The render direction in degrees (`new Vector3d(90)`). */
    readonly direction: number;
    /** `null` in Flash when none are passed: then no part count is written at all. */
    readonly customParts?: readonly IPetCustomPart[];
}

/** What `showPurchaseConfirmation` hands the dialog (`PurchaseConfirmationDialog.showOffer`). */
export interface CatalogPurchaseRequest {
    readonly offer: IPurchasableOffer;
    /** The page the purchase is sent for: a search result's own page, never the search page's id. */
    readonly pageId: number;
    readonly extraParameter: string;
    readonly quantity: number;
    readonly stuffData: IObjectData | undefined;
    /** `_userName`: the name the gift dialog starts with - the caller's, else `HabboCatalog.giftReceiver`. */
    readonly receiverName: string | undefined;
    /** `turnIntoGifting()`: the buy button reads "gift" and opens the gift dialog instead of buying. */
    readonly asGift: boolean;
    /**
     * `showPurchaseConfirmation`'s eighth argument (`showOffer`'s `param10`): the picture the pets
     * widgets pass (`getPetImage()`, a fresh `roomEngine.getPetImage` render), shown in place of
     * the product's own picture. Carried as the render request, so the dialog renders - and owns -
     * its own copy, as Flash's `getPetImage` hands over a new bitmap.
     */
    readonly previewImage: PetImageRequest | undefined;
    /**
     * `param1 is GameTokensOffer`: a snowwar game token offer (`gameTokensStore`), which skips the
     * purse check, has no product, and on buy is bought with `purchaseGameTokensOffer(extraParameter)`
     * (`showOffer` sets the product type `GAME_TOKEN`).
     */
    readonly isGameTokensOffer: boolean;
}

/** What `PurchaseCatalogWidget.initPurchase` buys with, recorded for the page it belongs to. */
export interface CatalogPurchaseWidgetState {
    /** The `CatalogPage` the widget is on; a record for any other page is stale. */
    readonly page: object;
    readonly offer: IPurchasableOffer | undefined;
    readonly additionalParameters: string;
    readonly quantity: number;
    readonly stuffData: IObjectData | undefined;
}

export type CatalogPurchaseDialogView = 'confirmation' | 'gift';

type State = {
    activePurchase: CatalogPurchaseRequest | undefined;
    isPurchasing: boolean;
    purchaseDialogView: CatalogPurchaseDialogView;
    giftDefaultStuffType: number;
    giveGiftEnabled: boolean;
    purchaseWidgetState: CatalogPurchaseWidgetState | undefined;
};

type Actions = {
    setActivePurchase: (activePurchase: CatalogPurchaseRequest | undefined) => void;
    setIsPurchasing: (isPurchasing: boolean) => void;
    /** `showGiftDialog`: the gift window replaces the confirmation, with its default box. */
    openGiftDialog: (giftDefaultStuffType: number) => void;
    setGiveGiftEnabled: (giveGiftEnabled: boolean) => void;
    setPurchaseWidgetState: (purchaseWidgetState: CatalogPurchaseWidgetState | undefined) => void;
};

export const CatalogPurchaseSliceInitialState: State = {
    activePurchase: undefined,
    isPurchasing: false,
    purchaseDialogView: 'confirmation',
    giftDefaultStuffType: 0,
    giveGiftEnabled: true,
    purchaseWidgetState: undefined,
};

export type CatalogPurchaseSlice = State & Actions;

export const createCatalogPurchaseSlice: StateCreator<CatalogPurchaseSlice, [], [], CatalogPurchaseSlice> = set => ({
    ...CatalogPurchaseSliceInitialState,
    // A new offer is a new `showConfirmationDialog` window; no offer is `dispose()`.
    setActivePurchase: activePurchase => set({ activePurchase, isPurchasing: false, purchaseDialogView: 'confirmation', giveGiftEnabled: true }),
    setIsPurchasing: isPurchasing => set({ isPurchasing }),
    openGiftDialog: giftDefaultStuffType => set({ purchaseDialogView: 'gift', giftDefaultStuffType }),
    setGiveGiftEnabled: giveGiftEnabled => set({ giveGiftEnabled }),
    setPurchaseWidgetState: purchaseWidgetState => set({ purchaseWidgetState }),
});
