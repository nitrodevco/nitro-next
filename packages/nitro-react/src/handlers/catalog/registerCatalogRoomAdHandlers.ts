/**
 * `RoomAdPurchaseInfoEventMessage` - the answer to `getRoomAdsPurchaseInfo`. In Flash the room ads
 * widget adds the listener itself (`RoomAdsCatalogWidget.init`, `onPurchaseInfoEvent`); here the
 * answer is kept in `CatalogRoomAdSlice.roomAdPurchaseInfo`, which the widget acts on when it
 * changes. An answer with no room ads page on show is kept and never read, as Flash drops it.
 */
import { RoomAdPurchaseInfoEventMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogRoomAdHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setRoomAdPurchaseInfo } = store.getState();

    return subscribeAll(subscribe, [
        on(RoomAdPurchaseInfoEventMessage, data => setRoomAdPurchaseInfo({ isVip: data.isVip, rooms: data.rooms.slice() })),
    ]);
};
