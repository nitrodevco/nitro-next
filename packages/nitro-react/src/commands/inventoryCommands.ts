/**
 * What the inventory's furni page does - the public methods of Flash `inventory/furni/FurniModel`
 * that talk to the server or read another model: `requestInitialization` (through
 * `HabboInventory.checkCategoryInitilization`), `updateItemLocks` and
 * `requestSelectedFurniToTrading`. Each sends its packet and writes `inventoryStore`.
 *
 * `HabboInventory.activeTradingModel` is the user-to-user trade (`TradingModel`) while one runs,
 * the wired trade (`WiredTradingModel`) while that one does, and nothing otherwise - in that
 * order, as Flash checks them.
 */
import { RoomObjectCategoryEnum, RoomObjectPlacementSource } from '@nitrodevco/nitro-api';
import { RequestFurniInventoryComposer, RequestFurniInventoryWhenNotInRoomComposer, RequestRoomPropertySetComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getInventoryFurniItemsForTrade, getInventoryFurniUnlockedCount, INVENTORY_TRADE_MAX_ITEMS, InventoryFurniItem, inventoryStore, peekInventoryFurni } from '#base/context/inventory';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { wiredTradingStore } from '#base/context/wired-trading';

import { cancelRoomObjectInsert, initializeRoomObjectInsert } from './catalogPlacementCommands';
import { offerSelectedFurniToUserTrade } from './inventoryTradingCommands';
import { requestAddItemsToWiredTrade } from './wiredTradingCommands';

type Send = WebSocketConnection['send'];

/** `FurniModel.requestInitialization`: the room-less variant outside a room (`roomEntered` / `roomLeft`). */
export const requestFurniInventory = (send: Send) => send(getRoom() ? new RequestFurniInventoryComposer({}) : new RequestFurniInventoryWhenNotInRoomComposer({}));

/** `HabboInventory.checkCategoryInitilization('furni')`: asks for the list unless the one held is current. */
export const checkFurniInventoryInitialization = (send: Send) => {
    if (inventoryStore.getState().furniCategoryInitialized) return;

    requestFurniInventory(send);
};

/**
 * `activeTradingModel.getOwnItemIdsInTrade`: the room item ids the running trade holds of the
 * user's own - the user-to-user trade's if one runs, else the wired trade's, else none.
 */
const getOwnItemRefsInTrade = (): number[] => {
    const { tradingActive, tradingOwnUser } = inventoryStore.getState();

    if (tradingActive) return tradingOwnUser.groups.flatMap(group => group.items.map(item => item.ref));

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

    // `activeTradingModel`: the user-to-user trade takes precedence, and has its own offer command.
    if (inventoryStore.getState().tradingActive) return offerSelectedFurniToUserTrade(send, count);

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

/** `FurnitureItem` categories that are room papers rather than placeable furni. */
const CATEGORY_WALLPAPER = 2;
const CATEGORY_FLOOR = 3;
const CATEGORY_LANDSCAPE = 4;
const CATEGORY_POSTER = 6;

/**
 * `HabboInventory.requestSelectedFurniToMover`: the item becomes the room's placement ghost. A
 * poster carries its poster id as the instance data and no stuff data; anything else carries its
 * `extra` and its stuff data.
 */
const requestSelectedFurniToMover = (item: InventoryFurniItem): boolean => {
    const category = item.isWallItem ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor;
    const started = (item.category === CATEGORY_POSTER)
        ? initializeRoomObjectInsert(RoomObjectPlacementSource.INVENTORY, item.id, category, item.typeId, item.stuffData.getLegacyString())
        : initializeRoomObjectInsert(RoomObjectPlacementSource.INVENTORY, item.id, category, item.typeId, String(item.extra), item.stuffData);

    if (started) hideInventoryForPlacement();

    return started;
};

/**
 * `GroupItem.itemEventProc`'s `WME_UP` -> `FurniModel.cancelFurniInMover`: letting go of a thumb
 * without having dragged off it puts back whatever was on its way into the room, and the window
 * with it - nothing is going to be placed, so nothing is waiting for `REOE_PLACED`.
 */
export const cancelInventoryFurniInMover = () => {
    cancelRoomObjectInsert();
    returnInventoryAfterPlacement();
};

/**
 * The window covers the room the ghost is dropped into, so every page that starts a placement hides
 * it and marks the mover as ours (`PetsModel.placePetToRoom`'s `§_-ih§` and its twins).
 */
export const hideInventoryForPlacement = () => {
    inventoryStore.getState().setInventoryMoverRequested(true);
    systemStore.getState().hideWindow('inventory');
};

/**
 * `onObjectPlaced`: the item is in the room, so the window comes back and the flag is cleared. Does
 * nothing unless the inventory is the one that started the placement - the catalogue's own drags
 * end here too, and they restore their own window.
 */
export const returnInventoryAfterPlacement = () => {
    const { inventoryMoverRequested, setInventoryMoverRequested } = inventoryStore.getState();

    if (!inventoryMoverRequested) return;

    setInventoryMoverRequested(false);
    systemStore.getState().showWindow('inventory');
};

/**
 * `FurniModel.requestSelectedFurniPlacement`: puts the selected group's item into the room - the
 * three room papers by asking the server to apply them (`RequestRoomPropertySet`), everything else
 * by starting a placement the user drops on a tile.
 *
 * `isDoubleClick` is Flash's first argument: a double click never applies a paper, it only places
 * furni. Nothing happens for an empty selection, a group whose every item is locked in a trade, or
 * a rented item that is already standing in a room.
 */
export const requestSelectedFurniPlacement = (send: Send, isDoubleClick: boolean = false): boolean => {
    const { furniGroups, furniSelectedGroupId } = inventoryStore.getState();
    const group = furniGroups.find(furniGroup => furniGroup.id === furniSelectedGroupId);

    if (!group || (getInventoryFurniUnlockedCount(group) === 0)) return false;

    const item = peekInventoryFurni(group);

    if (!item) return false;

    if (item.isRented && (item.flatId > -1)) return false;

    if ((item.category === CATEGORY_WALLPAPER) || (item.category === CATEGORY_FLOOR) || (item.category === CATEGORY_LANDSCAPE)) {
        if (isDoubleClick) return false;

        send(new RequestRoomPropertySetComposer({ itemId: item.id }));

        return true;
    }

    return requestSelectedFurniToMover(item);
};
