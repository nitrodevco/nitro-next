/**
 * The catalogue's room ad calls - the parts of Flash's `HabboCatalog` that `RoomAdsCatalogWidget`,
 * `PurchaseCatalogWidget` and the purchase confirmation reach for a room ad:
 * `getRoomAdsPurchaseInfo`, `sendRoomAdPurchaseInitiatedEvent` and `purchaseProduct`, which sends a
 * room ad purchase instead of a plain one when the offer bought is the one the room ads page
 * selected (`roomAdPurchaseData.offerId`).
 */
import { GetRoomAdPurchaseInfoComposer, PurchaseFromCatalogComposer, PurchaseRoomAdMessageComposer, RoomAdPurchaseInitiatedComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

type Send = WebSocketConnection['send'];

/**
 * `getRoomAdsPurchaseInfo`: ask which rooms the user may advertise. The last answer is dropped
 * first, so the room ads widget acts on this request's answer (`RoomAdPurchaseInfoEventMessage`).
 */
export const getRoomAdsPurchaseInfo = (send: Send, store: StoreApi<CatalogStore>) => {
    store.getState().setRoomAdPurchaseInfo(undefined);

    send(new GetRoomAdPurchaseInfoComposer({}));
};

/** `sendRoomAdPurchaseInitiatedEvent`: the buy button of a `ROOM_INITIATE_PURCHASE` purchase widget was pressed. */
export const sendRoomAdPurchaseInitiatedEvent = (send: Send) => send(new RoomAdPurchaseInitiatedComposer({}));

/**
 * `HabboCatalog.purchaseProduct(pageId, offerId, extraParameter, quantity)`: a plain
 * `PurchaseFromCatalog`, unless the offer is the room ad the room ads page is buying - then
 * `PurchaseRoomAdMessageComposer` with its room, name, description and category, as an extension
 * of the running ad only while that ad has not expired.
 */
export const purchaseProduct = (send: Send, store: StoreApi<CatalogStore>, pageId: number, offerId: number, extraParam: string = '', quantity: number = 1) => {
    const { roomAdPurchaseData, updateRoomAdPurchaseData } = store.getState();

    if (!roomAdPurchaseData || (roomAdPurchaseData.offerId !== offerId)) {
        send(new PurchaseFromCatalogComposer({ pageId, offerId, extraParam, quantity }));

        return;
    }

    let extended = roomAdPurchaseData.extended;

    if (extended && roomAdPurchaseData.expirationTime && (roomAdPurchaseData.expirationTime.getTime() < Date.now())) {
        extended = false;

        updateRoomAdPurchaseData({ extended });
    }

    send(new PurchaseRoomAdMessageComposer({
        pageId,
        offerId,
        flatId: roomAdPurchaseData.flatId,
        name: roomAdPurchaseData.name ?? '',
        extended,
        description: roomAdPurchaseData.description,
        categoryId: roomAdPurchaseData.categoryId,
    }));
};
