/**
 * The catalogue window's purchase flow while it lives - the parts of Flash's `HabboCatalog` that
 * listen outside the page's widgets, mounted once per catalogue window from `CatalogComponent`
 * (hidden or not):
 *
 * - `toggleCatalog`: when the user opens or closes the window an offer still in the mover is
 *   cancelled (`cancelFurniInMover`), and opening it with new additions pending sends
 *   `MarkCatalogNewAdditionsPageOpened` once (`markNewAdditionPageOpened`). The mover's own
 *   hiding and showing are no toggle (`onCatalogVisibilityChanged`).
 * - the room engine's `REOE_PLACED` / `REOE_PLACED_ON_USER` (`onObjectPlacedInRoom`,
 *   `onObjectPlaceOnUser`), for a drag this catalogue started.
 * - `INIT_PURCHASE` on the page on show: `PurchaseCatalogWidget.initPurchase`, answered from what
 *   the purchase widget recorded, so that a drop still buys while the dragged-from window is hidden
 *   and its widgets unmounted (`initPurchaseFromPurchaseWidget`).
 */
import { RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomEngineObjectPlacedOnUserEvent } from '@nitrodevco/nitro-api';
import { useEffect, useRef } from 'react';

import { initPurchaseFromPurchaseWidget, onCatalogVisibilityChanged, onObjectPlacedInRoom, onObjectPlacedOnUser } from '#base/commands';
import { CatalogWidgetEventEnum, getCatalogWindowName, useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible } from '#base/context/system';

import { useRoomEventDispatcher } from '../room/useRoomEventDispatcher';

export const useCatalogPurchaseFlow = () => {
    const store = useCatalogStoreApi();
    const catalogType = useCatalogStore(x => x.catalogType);
    const activePage = useCatalogStore(x => x.activePage);
    const isVisible = useIsWindowVisible(getCatalogWindowName(catalogType));
    const wasVisible = useRef(isVisible);
    const { send } = useWebSocketContext();

    useEffect(() => {
        if (wasVisible.current === isVisible) return;

        wasVisible.current = isVisible;

        onCatalogVisibilityChanged(send, store, isVisible);
    }, [ isVisible ]);

    useRoomEventDispatcher<RoomEngineObjectPlacedEvent>(RoomEngineObjectEvent.PLACED, event => onObjectPlacedInRoom(send, store, event));
    useRoomEventDispatcher<RoomEngineObjectPlacedOnUserEvent>(RoomEngineObjectEvent.PLACED_ON_USER, event => onObjectPlacedOnUser(store, event));

    useEffect(() => activePage?.events.addEventListener(CatalogWidgetEventEnum.INIT_PURCHASE, () => initPurchaseFromPurchaseWidget(store)), [ activePage ]);
};
