/**
 * Renting a rentable furni again or buying it out - Flash's `RentConfirmationWindow` (`show`,
 * `onFurniRentOrBuyoutOffer`, `windowProcedure`, `close`) behind
 * `HabboCatalog.openRentConfirmationWindow`. The window's state is `CatalogRentSlice` of the
 * app-wide `catalogPurchaseStore`, because the infostand and the inventory open it; the view is
 * `views/catalog/purchase/CatalogRentConfirmationView`.
 *
 * `openRentConfirmationWindow` is what `InfoStandFurniView.onExtendButtonClicked` /
 * `onBuyoutButtonClicked` (with the room object id) and `FurniModel`'s rent extend and buyout
 * (with the strip id) call.
 */
import { FurnitureTypeEnum, IFurnitureData } from '@nitrodevco/nitro-api';
import { ExtendRentOrBuyoutFurniComposer, ExtendRentOrBuyoutStripItemComposer, GetRentOrBuyoutOfferComposer } from '@nitrodevco/nitro-packets';

import { catalogPurchaseStore, RENT_CONFIRMATION_MODE_INFOSTAND, RENT_CONFIRMATION_MODE_INVENTORY } from '#base/context/catalog-purchase';
import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { showNotEnoughActivityPointsAlert, showNotEnoughCreditsAlert } from './catalogClubCommands';

type Send = WebSocketConnection['send'];

/**
 * `openRentConfirmationWindow(furniData, isBuyout, objectId, stripId)` -> `show`: the open window
 * closes, the mode follows from which id was given, and the server is asked what it would cost.
 */
export const openRentConfirmationWindow = (send: Send, furniData: IFurnitureData, isBuyout: boolean, objectId: number = -1, stripId: number = -1) => {
    catalogPurchaseStore.getState().setRentRequest({
        furniData,
        isBuyout,
        objectId,
        stripId,
        mode: (objectId > -1) ? RENT_CONFIRMATION_MODE_INFOSTAND : RENT_CONFIRMATION_MODE_INVENTORY,
    });

    send(new GetRentOrBuyoutOfferComposer({ isWallItem: (furniData.type === FurnitureTypeEnum.Wall), furniTypeName: furniData.fullName, isBuyout }));
};

/**
 * `onFurniRentOrBuyoutOffer`: an answer for the furni type asked about builds the window, unless
 * the purse cannot pay it (the not enough credits / activity points alerts instead).
 */
export const onFurniRentOrBuyoutOffer = (offer: { furniTypeName: string; buyout: boolean; priceInCredits: number; priceInActivityPoints: number; activityPointType: number }) => {
    const { rentRequest, setRentOffer } = catalogPurchaseStore.getState();

    if (!rentRequest || (rentRequest.furniData.fullName !== offer.furniTypeName)) return;

    const { credits, activityPoints } = userStore.getState();

    if (credits < offer.priceInCredits) {
        showNotEnoughCreditsAlert();

        return;
    }

    if ((activityPoints[offer.activityPointType] ?? 0) < offer.priceInActivityPoints) {
        showNotEnoughActivityPointsAlert(offer.activityPointType);

        return;
    }

    setRentOffer({ isBuyout: offer.buyout, priceInCredits: offer.priceInCredits, priceInActivityPoints: offer.priceInActivityPoints, activityPointType: offer.activityPointType });
};

/** `close()`: the window goes; the furni type it was for is kept, as Flash keeps `§_-V2i§`. */
export const closeRentConfirmation = () => catalogPurchaseStore.getState().setRentOffer(undefined);

/**
 * `ok_button`: extend or buy out the furni in the room (`ExtendRentOrBuyoutFurniMessageComposer`)
 * or in the inventory (`ExtendRentOrBuyoutStripItemMessageComposer`), then close.
 */
export const confirmRentConfirmation = (send: Send) => {
    const { rentRequest, rentOffer } = catalogPurchaseStore.getState();

    if (!rentRequest || !rentOffer) return;

    switch (rentRequest.mode) {
        case RENT_CONFIRMATION_MODE_INFOSTAND:
            send(new ExtendRentOrBuyoutFurniComposer({ isWallItem: (rentRequest.furniData.type === FurnitureTypeEnum.Wall), objectId: rentRequest.objectId, isBuyout: rentOffer.isBuyout }));
            break;
        case RENT_CONFIRMATION_MODE_INVENTORY:
            send(new ExtendRentOrBuyoutStripItemComposer({ itemId: rentRequest.stripId, isBuyout: rentOffer.isBuyout }));
            break;
    }

    closeRentConfirmation();
};
