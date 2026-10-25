/**
 * The Builders Club packets the catalogue listens to - `HabboCatalog.onBuildersClubSubscriptionStatus`
 * and `onBuildersClubFurniCount`, and the `YouAreOwnerMessageEvent` `BuilderCatalogWidget` adds to
 * the connection for itself. The first two store what they carry, tell the open page the
 * membership changed (`CWE_BUILDER_SUBSCRIPTION_UPDATED`) and refresh the header's status
 * (`refreshBuilderStatus`); the third is counted for the widget to act on (see
 * `CatalogBuildersClubSlice`). Window-scoped like the rest of `handlers/catalog`: each catalogue
 * window's store keeps its own copy, as each of Flash's catalogue states reads the one `HabboCatalog`.
 *
 * The subscription packet also goes to the floor plan editor, which keeps its own countdown
 * (`registerRoomFloorPlanHandlers`), and Flash tells the web page through
 * `FlashExternalInterface.updateBuildersClub` - the port has no page around it to tell.
 */
import { BuildersClubFurniCountMessage, BuildersClubSubscriptionStatusMessage, YouAreOwnerMessage } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { dispatchBuilderSubscriptionUpdated, refreshBuilderStatus } from '#base/commands';
import { CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogBuildersClubHandlers = (store: StoreApi<CatalogStore>, { subscribe }: WebSocketConnection) => {
    const { setBuildersClubSubscription, setBuilderFurniCount, countYouAreOwner } = store.getState();

    return subscribeAll(subscribe, [
        on(BuildersClubSubscriptionStatusMessage, (data) => {
            setBuildersClubSubscription(data.secondsLeft, data.secondsLeftWithGrace, data.furniLimit, data.maxFurniLimit, performance.now());
            dispatchBuilderSubscriptionUpdated(store);
            refreshBuilderStatus(store);
        }),

        on(BuildersClubFurniCountMessage, (data) => {
            setBuilderFurniCount(data.furniCount);
            dispatchBuilderSubscriptionUpdated(store);
            refreshBuilderStatus(store);
        }),

        on(YouAreOwnerMessage, () => countYouAreOwner()),
    ]);
};
