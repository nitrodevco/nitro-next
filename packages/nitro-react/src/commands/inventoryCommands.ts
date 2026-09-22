/**
 * What the inventory's furni page does - the public methods of Flash `inventory/furni/FurniModel`
 * that talk to the server or read another model: `requestInitialization` (through
 * `HabboInventory.checkCategoryInitilization`), `updateItemLocks` and
 * `requestSelectedFurniToTrading`. Each sends its packet and writes `inventoryStore`.
 *
 * The only trading model in this client is the wired trade (`WiredTradingModel`); the
 * user-to-user trade (`TradingModel`) does not exist, so `activeTradingModel` is the wired trade
 * while it runs and nothing otherwise.
 */
import { RequestFurniInventoryComposer, RequestFurniInventoryWhenNotInRoomComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getInventoryFurniItemsForTrade, INVENTORY_TRADE_MAX_ITEMS, inventoryStore } from '#base/context/inventory';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { wiredTradingStore } from '#base/context/wired-trading';

import { requestAddItemsToWiredTrade } from './wiredTradingCommands';

type Send = WebSocketConnection['send'];

/** `FurniModel.requestInitialization`: the room-less variant outside a room (`roomEntered` / `roomLeft`). */
export const requestFurniInventory = (send: Send) => send(getRoom() ? new RequestFurniInventoryComposer({}) : new RequestFurniInventoryWhenNotInRoomComposer({}));

/** `HabboInventory.checkCategoryInitilization('furni')`: asks for the list unless the one held is current. */
export const checkFurniInventoryInitialization = (send: Send) => {
    if (inventoryStore.getState().furniCategoryInitialized) return;

    requestFurniInventory(send);
};

/** `WiredTradingModel.getOwnItemIdsInTrade` through `HabboInventory.activeTradingModel`: none unless the trade runs. */
const getOwnItemRefsInTrade = (): number[] => {
    const { tradeRunning, tradeItems } = wiredTradingStore.getState();

    if (!tradeRunning || !tradeItems) return [];

    return tradeItems.firstUserItemArray.map(item => item.roomItemId);
};

/**
 * `FurniModel.updateItemLocks`: the items the running trade holds, the recycler's
 * (`RecyclerModel.getOwnItemsInRecycler`) and the offer being made (`MarketplaceModel.getOfferItemRefs`)
 * are locked, every other one is not. As in Flash the recycler's list is of strip ids while the
 * locks compare room item ids.
 */
export const updateInventoryFurniLocks = () => {
    const { recyclerItemIds, marketplaceOfferItems, updateFurniLocks } = inventoryStore.getState();

    updateFurniLocks([ ...getOwnItemRefsInTrade(), ...(recyclerItemIds ?? []), ...(marketplaceOfferItems ?? []).map(item => item.ref) ]);
};

/** `FurniModel.removeAllLocks` - what `subCategorySwitch('empty')` does when the trade sub page goes. */
export const removeAllInventoryFurniLocks = () => inventoryStore.getState().updateFurniLocks([]);

/**
 * `FurniModel.requestSelectedFurniToTrading`: up to `count` unlocked tradeable items of the
 * selected group go to the running trade, unless that would put more than 1500 of the user's
 * items in it, which is an alert instead.
 *
 * Returns what Flash writes back into the amount field (`offertotrade_cnt`): the number of items
 * offered, 1 after the alert or with no trade running, and undefined where Flash leaves the field
 * as it is (nothing selected, nothing to offer).
 */
export const offerSelectedFurniToTrade = (send: Send, count: number): number | undefined => {
    const { furniGroups, furniSelectedGroupId } = inventoryStore.getState();
    const group = furniGroups.find(furniGroup => furniGroup.id === furniSelectedGroupId);

    if (!group) return undefined;

    const items = getInventoryFurniItemsForTrade(group, count);

    if (!items.length) return undefined;

    if (!wiredTradingStore.getState().tradeRunning) return 1;

    const itemIds = items.map(item => item.id);

    if ((getOwnItemRefsInTrade().length + itemIds.length) > INVENTORY_TRADE_MAX_ITEMS) {
        const { getLocalizationValue, showAlert } = systemStore.getState();

        showAlert(getLocalizationValue('trading.items.too_many_items.title'), getLocalizationValue('trading.items.too_many_items.desc'));

        return 1;
    }

    requestAddItemsToWiredTrade(send, itemIds);

    return itemIds.length;
};
