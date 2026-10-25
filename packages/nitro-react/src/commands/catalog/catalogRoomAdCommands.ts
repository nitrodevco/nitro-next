/**
 * The catalogue's room ad calls - the parts of Flash's `HabboCatalog` that `RoomAdsCatalogWidget`,
 * `PurchaseCatalogWidget` and the purchase confirmation reach for a room ad:
 * `getRoomAdsPurchaseInfo`, `sendRoomAdPurchaseInitiatedEvent` and `purchaseProduct`, which sends a
 * room ad purchase instead of a plain one when the offer bought is the one the room ads page
 * selected (`roomAdPurchaseData.offerId`).
 */
import { ICatalogNode } from '@nitrodevco/nitro-api';
import { GetRoomAdPurchaseInfoComposer, PurchaseFromCatalogComposer, PurchaseRoomAdMessageComposer, RoomAdPurchaseInitiatedComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CATALOG_ROOM_AD_PURCHASE_DATA_DEFAULTS, CatalogRoomAdExtension, CatalogStore } from '#base/context/catalog';
import { Send } from '#base/context/communication';
import { systemStore } from '#base/context/system';

/**
 * `getRoomAdsPurchaseInfo`: ask which rooms the user may advertise. The last answer is dropped
 * first, so the room ads widget acts on this request's answer (`RoomAdPurchaseInfoEventMessage`).
 */
export const getRoomAdsPurchaseInfo = (send: Send, store: StoreApi<CatalogStore>) => {
    store.getState().setRoomAdPurchaseInfo(undefined);

    send(new GetRoomAdPurchaseInfoComposer({}));
};

/** The room ads page's name - `RoomEventInfoCtrl`'s `openCatalogRoomAdsPage` and `openCatalogRoomAdsExtendPage` both open it. */
export const ROOM_AD_CATALOG_PAGE = 'room_ad';

/**
 * `HabboNavigator.openCatalogRoomAdsExtendPage` -> `HabboCatalog.openRoomAdCatalogPageInExtendedMode`:
 * the normal catalogue opens on the room ads page with the event to extend, which
 * `useCatalogPageRequest` hands to `applyRoomAdExtension`.
 */
export const openCatalogRoomAdsExtendPage = (roomAdExtension: CatalogRoomAdExtension) => {
    const { hideWindow, showWindow } = systemStore.getState();

    hideWindow('builders_catalog');
    showWindow('catalog', { pageName: ROOM_AD_CATALOG_PAGE, roomAdExtension });
};

/** `CatalogNavigator.getNodeByName` over the index. */
const findNodeByPageName = (node: ICatalogNode, pageName: string): ICatalogNode | undefined => {
    if (node.pageName === pageName) return node;

    for (const child of node.children) {
        const found = findNodeByPageName(child, pageName);

        if (found) return found;
    }

    return undefined;
};

/**
 * `openRoomAdCatalogPageInExtendedMode`'s writes: a new `RoomAdPurchaseData` holding the event as an
 * extension in the room the user is in. When the room ads page is the one already up, it is asked
 * for its rooms again (`getRoomAdsPurchaseInfo`), since it will not start over to read the data.
 * Flash compares the page with `lastPageRequestId`; the page shown stands in for it here.
 */
export const applyRoomAdExtension = (send: Send, store: StoreApi<CatalogStore>, extension: CatalogRoomAdExtension) => {
    const { setRoomAdPurchaseData, rootNode, activePageId } = store.getState();

    setRoomAdPurchaseData({
        ...CATALOG_ROOM_AD_PURCHASE_DATA_DEFAULTS,
        name: extension.name,
        extended: true,
        extendedFlatId: extension.flatId,
        description: extension.description,
        flatId: extension.flatId,
        roomName: extension.roomName,
        expirationTime: extension.expirationTime,
        categoryId: extension.categoryId,
    });

    const node = rootNode ? findNodeByPageName(rootNode, ROOM_AD_CATALOG_PAGE) : undefined;

    if (node && (node.pageId === activePageId)) getRoomAdsPurchaseInfo(send, store);
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
