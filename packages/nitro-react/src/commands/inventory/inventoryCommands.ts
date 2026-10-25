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
import { RoomEngineObjectPlacedEvent, RoomObjectCategoryEnum, RoomObjectPlacementSource, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { RequestFurniInventoryComposer, RequestFurniInventoryWhenNotInRoomComposer, RequestRoomPropertySetComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { findNextInventoryFurniToPlace, getInventoryFurniItemsForTrade, getInventoryFurniSelectedItem, getInventoryFurniTotalCount, getInventoryFurniUnlockedCount, getInventoryWallItemById, getSelectedFurniGroup, INVENTORY_FURNI_CATEGORY_POST_IT, INVENTORY_FURNI_CATEGORY_POSTER, INVENTORY_TRADE_MAX_ITEMS, InventoryFurniItem, inventoryStore, isRoomLayoutCategory } from '#base/context/inventory';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { wiredTradingStore } from '#base/context/wired-trading';
import { getFurnitureData } from '#base/utils';

import { cancelRoomObjectInsert, initializeRoomObjectInsert } from '../catalog/catalogPlacementCommands';
import { requestAddItemsToWiredTrade } from '../wired-trading/wiredTradingCommands';
import { offerSelectedFurniToUserTrade, showTooManyTradeItemsAlert } from './inventoryTradingCommands';

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
    const group = getSelectedFurniGroup(inventoryStore.getState());

    if (!group) return undefined;

    const items = getInventoryFurniItemsForTrade(group, count);

    if (!items.length) return undefined;

    // `activeTradingModel`: the user-to-user trade takes precedence, and has its own offer command.
    if (inventoryStore.getState().tradingActive) return offerSelectedFurniToUserTrade(send, count);

    if (!wiredTradingStore.getState().tradeRunning) return 1;

    const itemIds = items.map(item => item.id);

    if ((getOwnItemRefsInTrade().length + itemIds.length) > INVENTORY_TRADE_MAX_ITEMS) {
        showTooManyTradeItemsAlert();

        return 1;
    }

    requestAddItemsToWiredTrade(send, itemIds);

    return itemIds.length;
};

/** `FurniModel.isExternalImageItem`: the item's type, read as a wall item, is an external image. */
const isExternalImageItem = (item: InventoryFurniItem): boolean => !!getFurnitureData(systemStore.getState(), item.typeId, true)?.isExternalImage;

/**
 * `HabboInventory.requestSelectedFurniToMover`: the item becomes the room's placement ghost. A
 * poster carries its poster id as the instance data and no stuff data, as does an external image
 * its picture's data; anything else carries its `extra` and its stuff data.
 */
const requestSelectedFurniToMover = (item: InventoryFurniItem): boolean => {
    const category = item.isWallItem ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor;
    const started = ((item.category === INVENTORY_FURNI_CATEGORY_POSTER) || isExternalImageItem(item))
        ? initializeRoomObjectInsert(RoomObjectPlacementSource.INVENTORY, item.id, category, item.typeId, item.stuffData.getLegacyString())
        : initializeRoomObjectInsert(RoomObjectPlacementSource.INVENTORY, item.id, category, item.typeId, String(item.extra), item.stuffData);

    if (started) hideInventoryForPlacement(item.id);

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
export const hideInventoryForPlacement = (furniItemId: number = -1) => {
    inventoryStore.getState().setInventoryMoverItemId(furniItemId);
    inventoryStore.getState().setInventoryMoverRequested(true);
    systemStore.getState().hideWindow('inventory');
};

/**
 * `onObjectPlaced`: the item is in the room, so the window comes back and the flag is cleared. Does
 * nothing unless the inventory is the one that started the placement - the catalogue's own drags
 * end here too, and they restore their own window.
 */
export const returnInventoryAfterPlacement = () => {
    const { inventoryMoverRequested, setInventoryMoverRequested, setInventoryMoverItemId } = inventoryStore.getState();

    if (!inventoryMoverRequested) return;

    setInventoryMoverRequested(false);
    setInventoryMoverItemId(-1);
    systemStore.getState().showWindow('inventory');
};

/**
 * `FurniModel.onObjectPlaced` (`REOE_PLACED`): the furni page put a furni into the room, and what
 * happens next depends on what the drop did.
 *
 * - Not placed in the room (dropped somewhere it does not fit): the window comes back and the ghost
 *   is cancelled.
 * - Placed: `attemptPlaceNextFurni` - the next furni of the same stack goes into the mover at once,
 *   so a stack is placed one after the other, and the window only comes back when the stack is
 *   used up (or the next one cannot be placed).
 * - Something else was placed (not the item this page started with): nothing, as in Flash.
 *
 * A pet or a bot started by its own page (no furni id) just brings the window back, as their models do.
 */
export const onInventoryObjectPlaced = (event: RoomEngineObjectPlacedEvent) => {
    const { inventoryMoverRequested, inventoryMoverItemId, setInventoryMoverRequested, setInventoryMoverItemId } = inventoryStore.getState();

    if (!inventoryMoverRequested) return;

    if (inventoryMoverItemId < 0) {
        returnInventoryAfterPlacement();

        return;
    }

    setInventoryMoverRequested(false);
    setInventoryMoverItemId(-1);

    if (!event.placedInRoom) {
        systemStore.getState().showWindow('inventory');
        cancelRoomObjectInsert();

        return;
    }

    if (!(event.placedOnFloor || event.placedOnWall) || (Math.abs(event.objectId) !== inventoryMoverItemId)) return;

    attemptPlaceNextFurni(inventoryMoverItemId);
};

/**
 * `FurniModel.attemptPlaceNextFurni`: the stack the selected group holds is placed from its last
 * item down; the next one is started as soon as the last one is dropped. A post-it group places its
 * first sheet while more than one is left. When there is no next item, or it cannot be placed
 * (`requestSelectedFurniPlacement` refuses a rented item already standing in a room), the window
 * comes back and the mover is cleared.
 */
const attemptPlaceNextFurni = (placedItemId: number) => {
    const group = getSelectedFurniGroup(inventoryStore.getState());

    if (!group) return;

    const next = (group.category === INVENTORY_FURNI_CATEGORY_POST_IT)
        ? ((getInventoryFurniTotalCount(group) > 1) ? group.items[0] : undefined)
        : findNextInventoryFurniToPlace(group, placedItemId);

    const started = !!next && !(next.isRented && (next.flatId > -1)) && requestSelectedFurniToMover(next);

    if (started) return;

    cancelRoomObjectInsert();
    systemStore.getState().showWindow('inventory');
};

/**
 * `FurniModel.requestSelectedFurniPlacement`: puts the selected group's item into the room - the
 * three room papers by asking the server to apply them (`RequestRoomPropertySet`), everything else
 * by starting a placement the user drops on a tile.
 *
 * `isDoubleClick` is Flash's first argument: a double click never applies a paper, it only places
 * furni. Nothing happens for an empty selection, a group whose every item is locked in a trade, or
 * a rented item that is already standing in a room. The item is the one `nextItemButton` paged to,
 * else the last (`selectedItemIndex` set to the count less one, which reads the same).
 */
export const requestSelectedFurniPlacement = (send: Send, isDoubleClick: boolean = false): boolean => {
    const { furniSelectedItemIndex } = inventoryStore.getState();
    const group = getSelectedFurniGroup(inventoryStore.getState());

    if (!group || (getInventoryFurniUnlockedCount(group) === 0)) return false;

    const item = getInventoryFurniSelectedItem(group, furniSelectedItemIndex);

    if (!item) return false;

    if (item.isRented && (item.flatId > -1)) return false;

    if (isRoomLayoutCategory(item.category)) {
        if (isDoubleClick) return false;

        send(new RequestRoomPropertySetComposer({ itemId: item.id }));

        return true;
    }

    return requestSelectedFurniToMover(item);
};

/** What `ROSM_USE_PRODUCT_FROM_INVENTORY` hands the pet product menu (`RoomEngineUseProductEvent`). */
export interface InventoryPetProductRequest {
    /** `inventoryStripId`: the item's `ref`, which `useProductForPet` sends as the product. */
    inventoryStripId: number;
    furnitureTypeId: number;
}

/** What it hands the external image view: the strip id of the wall item to show (`showWithFurniID`). */
export interface InventoryExternalImageRequest {
    inventoryItemId: number;
}

/**
 * `RoomEngine.showUseProductSelection`'s `ROSM_USE_PRODUCT_FROM_INVENTORY`, which two room widget
 * handlers take while a room is open, each going on only when it finds what it needs:
 *
 * - `AvatarInfoWidgetHandler.handleUseProductMenuRequestInventoryItem`: the type's floor furniture
 *   data - the pet product menu over the user's pets it suits (`FurniturePetProductWidget`).
 * - `ExternalImageWidgetHandler`: `showWithFurniID(itemId)` - the picture of the wall item the
 *   inventory holds under that strip id; `use_btn` passes none (-1).
 */
export const showInventoryUseProductSelection = (ref: number, typeId: number, itemId: number = -1) => {
    if (!getRoom()) return;

    const { openRoomWidget, updateRoomWidgetData } = roomStore.getState();

    if (getFurnitureData(systemStore.getState(), typeId, false)) {
        const request: InventoryPetProductRequest = { inventoryStripId: ref, furnitureTypeId: typeId };

        openRoomWidget({ type: RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU, objectId: -1, category: RoomObjectCategoryEnum.Floor, objectType: '' });
        updateRoomWidgetData(RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU, request);
    }

    if (getInventoryWallItemById(inventoryStore.getState().furniGroups, itemId)) {
        const request: InventoryExternalImageRequest = { inventoryItemId: itemId };

        openRoomWidget({ type: RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE, objectId: -1, category: RoomObjectCategoryEnum.Wall, objectType: '' });
        updateRoomWidgetData(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE, request);
    }
};
