/**
 * `HabboCatalog.onRoomSessionEvent` -> `dispatchRoomChangedToCatalogPages`: when a room session
 * starts or ends, the page on show hears `CWE_ROOM_CHANGED` (the builders club placement widget
 * re-checks whether its offer can be placed, the product view its room preview). The port's room
 * session is `roomStore.room`, set on entering and cleared on leaving, so this watches it. Not a
 * packet listener: it returns the store subscription's unsubscribe, and the window registers it
 * with its packet handlers (`CatalogComponent`).
 */
import { StoreApi } from 'zustand';

import { CatalogStore, CatalogWidgetEventEnum } from '#base/context/catalog';
import { roomStore } from '#base/context/room';

export const bridgeCatalogRoomChanged = (store: StoreApi<CatalogStore>) => roomStore.subscribe((state, previous) => {
    if (state.room === previous.room) return;

    store.getState().activePage?.dispatchWidgetEvent({ type: CatalogWidgetEventEnum.ROOM_CHANGED });
});
