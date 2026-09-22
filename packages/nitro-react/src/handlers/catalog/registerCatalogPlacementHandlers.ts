/**
 * `FurniModel.addOrUpdateItem`'s call into the catalogue: every furni the inventory adds or
 * updates is offered to `HabboCatalog.itemAddedToInventory`, which places the one bought for an
 * offer dropped in the room where it was dropped. The inventory's own listener for the packet is
 * `registerInventoryFurniHandlers`; this is a second one on the same `FurniListAddOrUpdateEvent`.
 *
 * Flash also calls it for the items a full `FurniListEvent` adds; the server answers a purchase
 * with `FurniListAddOrUpdateEvent`, so that is the one listened to here.
 */
import { FurniListAddOrUpdateEventMessage } from '@nitrodevco/nitro-packets';

import { itemAddedToInventory } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogPlacementHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(FurniListAddOrUpdateEventMessage, (data) => {
        for (const furni of data.furni) itemAddedToInventory(send, furni.itemTypeId, furni.itemId);
    }),
]);
