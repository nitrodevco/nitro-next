/**
 * The purchase confirmation dialog's controller - Flash's `PurchaseConfirmationDialog` (its
 * buttons, `showGiftDialog`, `giveGift`, `dispose`) and the `HabboCatalog` calls it makes
 * (`purchaseWillBeGift`, `purchaseProduct`, `purchaseProductAsGift`). The dialog's state is
 * `CatalogPurchaseSlice` / `CatalogGiftSlice` of the window's catalogue store; `showPurchaseConfirmation`
 * (`catalogCommands`) opens it.
 */
import { FurnitureTypeEnum } from '@nitrodevco/nitro-api';
import { PurchaseFromCatalogAsGiftComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore, CatalogWidgetEventEnum } from '#base/context/catalog';
import { catalogPurchaseStore } from '#base/context/catalog-purchase';
import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';
import { getOfferProduct } from '#base/utils';

import { resetPlacedOfferData } from './catalogPlacementCommands';
import { purchaseProduct } from './catalogRoomAdCommands';
import { purchaseGameTokensOffer } from './gameTokensCommands';
import { habbiconsEnabled, isHabbiconOwned, showHabbiconAlreadyOwnedAlert } from './habbiconCommands';

type Send = WebSocketConnection['send'];
type CatalogStoreApi = StoreApi<CatalogStore>;

/** What `giveGift` reads off the gift dialog. */
export interface CatalogGiftPurchase {
    readonly receiverName: string;
    readonly message: string;
    /** The box furni: a default box, or the colour picked. */
    readonly boxStuffTypeId: number;
    /** 0 with a default box. */
    readonly boxTypeId: number;
    /** 0 with a default box. */
    readonly ribbonTypeId: number;
    /** `isShowPurchaserName`: always for a user, the `show_face_checkbox` for a moderator. */
    readonly showPurchaserName: boolean;
}

/** `HabboCatalog.purchaseWillBeGift`: the next `showPurchaseConfirmation` opens as a gift. */
export const purchaseWillBeGift = (store: CatalogStoreApi, isGift: boolean) => store.getState().setPurchaseWillBeGift(isGift);

/**
 * `PurchaseConfirmationDialog.dispose` (and `hideRaffle` inside it): a raffle still running when
 * the dialog goes says so in an `ltd` bubble (`notification.raffle.ongoing`); its result arrives on
 * its own later.
 */
export const disposePurchaseDialog = (store: CatalogStoreApi) => {
    const { activePurchase, ltdRaffleRunning, setLtdRaffleRunning, setActivePurchase } = store.getState();

    if (!activePurchase) return;

    if (ltdRaffleRunning) {
        setLtdRaffleRunning(false);

        notificationStore.getState().addNotification(systemStore.getState().getLocalizationValue('notification.raffle.ongoing'), 'ltd');
    }

    setActivePurchase(undefined);
};

/** `onClose` / `onCancelGift`: the header close, `cancel_button` or `cancel_link_region` - the dropped offer goes too. */
export const closePurchaseDialog = (store: CatalogStoreApi) => {
    resetPlacedOfferData();
    disposePurchaseDialog(store);
};

/**
 * `onBuyButtonClick`: a habbicon is not bought while habbicons are off or when it is owned
 * already (`showHabbiconAlreadyOwnedAlert`); otherwise the buttons lock until the server answers,
 * the purchase goes out (`purchaseProduct`, a room ad when the offer is the one the room ads page
 * is buying), and the page's widgets hear `PURCHASE`. A dialog turned into gifting shows the gift
 * dialog instead (`turnIntoGifting` swapped the listener for `onGiftButtonClick`).
 *
 * A game token offer is bought with `purchaseGameTokensOffer(localizationId)` (the `GAME_TOKEN`
 * branch). The mint token and NFT branches buy offers the port never opens this dialog for (the
 * collectibles have a window of their own), so they are not here.
 */
export const buyFromPurchaseDialog = (send: Send, store: CatalogStoreApi) => {
    const { activePurchase, activePage, setIsPurchasing } = store.getState();

    if (!activePurchase) return;

    if (activePurchase.asGift) {
        showGiftDialog(store);

        return;
    }

    // `showOffer`'s product type: `Offer.product`, or `GAME_TOKEN` for a game token offer.
    const product = getOfferProduct(activePurchase.offer);

    if (product?.productType === FurnitureTypeEnum.Habbicon) {
        if (!habbiconsEnabled()) return;

        if (isHabbiconOwned(parseInt(product.extraParam, 10))) {
            showHabbiconAlreadyOwnedAlert();

            return;
        }
    }

    setIsPurchasing(true);

    if (activePurchase.isGameTokensOffer) {
        purchaseGameTokensOffer(send, activePurchase.extraParameter);

        return;
    }

    purchaseProduct(send, store, activePurchase.pageId, activePurchase.offer.offerId, activePurchase.extraParameter, activePurchase.quantity);

    activePage?.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.PURCHASE });
};

/**
 * `showGiftDialog`: the gift window replaces the confirmation. A gift with no box picked gets one
 * of the configuration's default boxes, drawn at random now (`defaultStuffTypes`, 0 when there
 * are none).
 */
export const showGiftDialog = (store: CatalogStoreApi) => {
    const { giftWrappingConfiguration, openGiftDialog } = store.getState();
    const defaults = giftWrappingConfiguration?.defaultStuffTypes ?? [];

    openGiftDialog(defaults.length ? defaults[Math.floor(Math.random() * defaults.length)] : 0);
};

/**
 * `onGiveGiftButtonClick`: `giveGift` sends `PurchaseFromCatalogAsGiftComposer`, the give button
 * locks (`enableGiftButton(false)`), the gift receiver is forgotten and the dropped offer, if
 * any, goes.
 */
export const giveGift = (send: Send, store: CatalogStoreApi, gift: CatalogGiftPurchase) => {
    const { activePurchase, setGiveGiftEnabled } = store.getState();

    if (!activePurchase) return;

    send(new PurchaseFromCatalogAsGiftComposer({
        pageId: activePurchase.pageId,
        offerCode: activePurchase.offer.offerId,
        extraParam: activePurchase.extraParameter,
        recieverName: gift.receiverName,
        message: gift.message,
        boxStuffTypeId: gift.boxStuffTypeId,
        boxTypeId: gift.boxTypeId,
        ribbonTypeId: gift.ribbonTypeId,
        showPurchaserName: gift.showPurchaserName,
    }));

    setGiveGiftEnabled(false);
    catalogPurchaseStore.getState().setGiftReceiver(undefined);
    resetPlacedOfferData();
};
