/**
 * The unseen item tracker's packet - Flash `inventory/UnseenItemTracker.onUnseenItems`: every
 * category's ids are added to what is already tracked (`addItems`), then `onUnseenItemsUpdate`
 * refreshes the furni grid's marks and order (`FurniModel.updateUnseenItemsThumbs`). The pets',
 * bots' and badges' marks and the tab and toolbar counts (`updateUnseenItemCounts`,
 * `HabboUnseenItemsUpdatedEvent`) are read from the store, so they follow on their own.
 *
 * Flash runs the furni refresh only once the inventory has been opened (`isInitialized`); before
 * that the port's grid holds nothing to mark unless a trade loaded it, and marking it then is
 * what the next open would do anyway.
 */
import { UnseenItemsMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerInventoryUnseenHandlers = ({ subscribe }: WebSocketConnection) => {
    const { addUnseenItems, updateFurniUnseenThumbs } = inventoryStore.getState();

    return subscribeAll(subscribe, [
        on(UnseenItemsMessage, (data) => {
            for (const [ category, ids ] of data.items) addUnseenItems(category, ids);

            updateFurniUnseenThumbs();
        }),
    ]);
};
