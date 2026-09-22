/**
 * The recycler - the methods of Flash's `catalog/recycler/RecyclerLogic` over `recyclerStore`,
 * the `HabboCatalog` senders it calls (`getRecyclerStatus`, `getRecyclerPrizes`,
 * `sendRecycleItems`) and the inventory's half it drives (`HabboInventory.setupRecycler`,
 * `requestSelectedFurniToRecycler`, `returnInventoryFurniFromRecycler`, `recycleSelectedFurni`,
 * i.e. `inventory/recycler/RecyclerModel` over the inventory store).
 *
 * What Flash's visualization calls do (`updateUI`, `updateSlots`, `updateRecycleButton`) is the
 * recycler widget re-rendering from the store; the calls survive only as the guards Flash puts
 * around them (`recyclerVisualization` for "a widget is registered and not disposed").
 *
 * `HabboCatalog.privateRoomSessionActive` is being in a room: every room session is a private
 * room (`RoomSession.isPrivateRoom` answers true). `tradingActive` is the inventory's running
 * trade, which in this client is only the wired trade.
 */
import { GetRecyclerPrizesComposer, GetRecyclerStatusComposer, IPrizeLevelMessageData, RecycleItemsComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { INVENTORY_RECYCLER_STATE_ACTIVE, INVENTORY_RECYCLER_STATE_READY, inventoryStore, isInventoryFurniGroupWallItem, peekInventoryFurni } from '#base/context/inventory';
import {
    RECYCLER_STATUS_OFF, RECYCLER_STATUS_READY, RECYCLER_STATUS_WAITING_FOR_SERVER, RECYCLER_SYSTEM_STATUS_CLOSED, RECYCLER_SYSTEM_STATUS_TIMEOUT, RecyclerPrizeLevel, RecyclerSlotItem, recyclerStore,
} from '#base/context/recycler';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { wiredTradingStore } from '#base/context/wired-trading';

type Send = WebSocketConnection['send'];

/** `FurniSlotItem`'s categories: a floor item and a wall item (`HabboInventory.recycleSelectedFurni`). */
export const RECYCLER_SLOT_CATEGORY_FLOOR = 10;
export const RECYCLER_SLOT_CATEGORY_WALL = 20;

/** `RecyclerFinishedMessage`'s failure status, the one `setFinished` alerts on (1 is success). */
const FINISHED_STATUS_FAILURE = 2;

const config = <T>(key: string, fallback: T): T => (systemStore.getState().config[key] as T | undefined) ?? fallback;

/** `numberOfSlots`: `getInteger("recycler.number_of_slots", 5)`. */
export const getRecyclerNumberOfSlots = () => config<number>('recycler.number_of_slots', 5);

/** `ducketCost`: `getInteger("recycler.ducket_cost", 0)`. */
export const getRecyclerDucketCost = () => config<number>('recycler.ducket_cost', 0);

/** `timeout`: `getInteger("recycler.timeout_seconds", 10)`. */
export const getRecyclerTimeout = () => config<number>('recycler.timeout_seconds', 10);

const alert = (message: string) => {
    const { getLocalizationValue, showAlert } = systemStore.getState();

    showAlert(getLocalizationValue('generic.alert.title'), getLocalizationValue(message));
};

const statusActive = () => (recyclerStore.getState().recyclerLocalStatus !== RECYCLER_STATUS_OFF);

const systemActive = () => (recyclerStore.getState().recyclerSystemStatus !== RECYCLER_SYSTEM_STATUS_CLOSED);

/** `ready`. */
const isReady = () => (statusActive() && systemActive() && (recyclerStore.getState().recyclerLocalStatus === RECYCLER_STATUS_READY));

/** `HabboCatalog.privateRoomSessionActive`. */
export const isRecyclerRoomSessionActive = () => !!getRoom();

/** `HabboCatalog.tradingActive`: `HabboInventory.activeTradingModel` - the running wired trade. */
const isTradingActive = () => wiredTradingStore.getState().tradeRunning;

// ---------------------------------------------------------------------------------------------
// The inventory's `RecyclerModel`
// ---------------------------------------------------------------------------------------------

/** `RecyclerModel.startRecycler`: the thumbs show the recycle mark, and the item list starts empty. */
const startInventoryRecycler = () => {
    const { setRecyclerState, setRecyclerItemIds } = inventoryStore.getState();

    setRecyclerState(INVENTORY_RECYCLER_STATE_ACTIVE);
    setRecyclerItemIds([]);
};

/** `RecyclerModel.stopRecycler`: every item it locked is unlocked. Nothing happens while it holds no list. */
const stopInventoryRecycler = () => {
    const { recyclerItemIds, setRecyclerState, setRecyclerItemIds, setFurniItemLocks } = inventoryStore.getState();

    if (!recyclerItemIds) return;

    setRecyclerState(INVENTORY_RECYCLER_STATE_READY);
    setFurniItemLocks(recyclerItemIds, false);
    setRecyclerItemIds(undefined);
};

/** `HabboInventory.setupRecycler` (`HabboCatalog.setupInventoryForRecycler`). */
export const setupInventoryForRecycler = (active: boolean) => {
    if (active) startInventoryRecycler();
    else stopInventoryRecycler();
};

/**
 * `RecyclerModel.lockSelectedFurni` via `FurniModel.requestSelectedFurniToRecycler`: the first
 * unlocked recyclable item of the selected group is locked and kept. 0 when there is none.
 */
const lockSelectedFurniToRecycler = (): number => {
    const { recyclerItemIds, furniGroups, furniSelectedGroupId, setRecyclerItemIds, setFurniItemLocks } = inventoryStore.getState();

    if (!recyclerItemIds) return 0;

    const group = furniGroups.find(furniGroup => furniGroup.id === furniSelectedGroupId);
    const item = group?.items.find(groupItem => !groupItem.locked && groupItem.recyclable);

    if (!item) return 0;

    setFurniItemLocks([ item.id ], true);

    if (!recyclerItemIds.includes(item.id)) setRecyclerItemIds([ ...recyclerItemIds, item.id ]);

    return item.id;
};

/** `RecyclerModel.releaseFurni` (`HabboCatalog.returnInventoryFurniFromRecycler`): true when the item may leave its slot. */
const returnInventoryFurniFromRecycler = (itemId: number): boolean => {
    const { recyclerItemIds, setRecyclerItemIds, setFurniItemLocks } = inventoryStore.getState();

    if (!recyclerItemIds) return true;

    if (!recyclerItemIds.includes(itemId)) return false;

    setFurniItemLocks([ itemId ], false);
    setRecyclerItemIds(recyclerItemIds.filter(id => id !== itemId));

    return true;
};

/** `RecyclerModel.getOwnItemsInRecycler`: what `FurniModel.updateItemLocks` counts as locked by the recycler. */
export const getInventoryItemsInRecycler = (): readonly number[] => inventoryStore.getState().recyclerItemIds ?? [];

// ---------------------------------------------------------------------------------------------
// `RecyclerLogic`
// ---------------------------------------------------------------------------------------------

/** `setNextRecycleAllowedTimestamp`: a time still ahead puts the recycler into its cool down. */
export const setRecyclerNextAllowedTimestamp = (timestamp: number) => {
    const { setRecyclerNextAllowedAt, setRecyclerSystemStatus } = recyclerStore.getState();

    setRecyclerNextAllowedAt(timestamp);

    if (timestamp > performance.now()) setRecyclerSystemStatus(RECYCLER_SYSTEM_STATUS_TIMEOUT);
};

/** `verifyRoomSessionStatus`: a ready recycler outside a room says it needs one. */
const verifyRoomSessionStatus = () => {
    if (!isRecyclerRoomSessionActive() && isReady()) alert('recycler.alert.privateroom');
};

/** `init(visualization)`: waiting for the server, empty slots, and the status asked for. */
export const initRecycler = (send: Send) => {
    const { setRecyclerLocalStatus, setRecyclerSlots, setRecyclerVisualization } = recyclerStore.getState();

    setRecyclerLocalStatus(RECYCLER_STATUS_WAITING_FOR_SERVER);
    setRecyclerSlots(new Array<RecyclerSlotItem | null>(getRecyclerNumberOfSlots()).fill(null));
    setRecyclerVisualization(true);

    send(new GetRecyclerStatusComposer({}));
};

/** `activate`: ready again unless the server has closed it. */
export const activateRecycler = () => {
    if (systemActive()) recyclerStore.getState().setRecyclerLocalStatus(RECYCLER_STATUS_READY);
};

/** `releaseAllSlots`: every slotted item goes back to the inventory. */
const releaseAllRecyclerSlots = () => {
    if (!isReady()) return;

    for (const slot of recyclerStore.getState().recyclerSlots) {
        if (slot) returnInventoryFurniFromRecycler(slot.id);
    }

    recyclerStore.getState().setRecyclerSlots(recyclerStore.getState().recyclerSlots.map(() => null));
};

/**
 * `cancel`: the inventory stops recycling, the slots empty and the recycler is off - what the
 * widget's `dispose` and closing the catalogue on the recycler page do. The widget going also
 * ends its registration as the visualization (`§_-y1§.disposed`).
 */
export const cancelRecycler = () => {
    setupInventoryForRecycler(false);
    releaseAllRecyclerSlots();

    const { setRecyclerLocalStatus, setRecyclerVisualization } = recyclerStore.getState();

    setRecyclerLocalStatus(RECYCLER_STATUS_OFF);
    setRecyclerVisualization(false);
};

/** `releaseSlot`: the slot's item goes back to the inventory, if the inventory lets it. */
export const releaseRecyclerSlot = (slotId: number) => {
    if (!isReady()) return;

    const slots = recyclerStore.getState().recyclerSlots;
    const slot = slots[slotId];

    if (!slot) return;

    if (!returnInventoryFurniFromRecycler(slot.id)) return;

    recyclerStore.getState().setRecyclerSlots(slots.map((held, index) => ((index === slotId) ? null : held)));
};

/** `empty`: every slot released. */
const emptyRecycler = () => {
    for (let slotId = 0; slotId < getRecyclerNumberOfSlots(); slotId++) releaseRecyclerSlot(slotId);
};

/**
 * `setSystemStatus`: the server's status and cool down. A closed recycler only redraws (its
 * `disabled_border`); otherwise it is ready, and with a widget up the inventory starts
 * recycling and a recycler outside a room says so.
 */
export const setRecyclerSystemStatus = (status: number, timeoutSeconds: number) => {
    const { setRecyclerSystemStatus: setSystemStatus, setRecyclerLocalStatus } = recyclerStore.getState();

    setSystemStatus(status);
    setRecyclerNextAllowedTimestamp(performance.now() + (timeoutSeconds * 1000));

    if (!systemActive()) return;

    setRecyclerLocalStatus(RECYCLER_STATUS_READY);

    if (!recyclerStore.getState().recyclerVisualization) return;

    setupInventoryForRecycler(recyclerStore.getState().recyclerSystemStatus !== RECYCLER_SYSTEM_STATUS_CLOSED);
    verifyRoomSessionStatus();
};

/** `setFinished`: ready again; a failure says the recycler is closed. The slots are released either way. */
export const setRecyclerFinished = (status: number) => {
    if (!statusActive()) return;

    recyclerStore.getState().setRecyclerLocalStatus(RECYCLER_STATUS_READY);

    if (!systemActive()) return;

    // Success only redraws; a failure also says the recycler is closed.
    if (status === FINISHED_STATUS_FAILURE) alert('recycler.info.closed');

    releaseAllRecyclerSlots();
};

/**
 * `placeObjectAtSlot`: the selected inventory item goes into a slot - the one named (whose item
 * goes back first), or with `findNewSlotId` the first free one (none free: nothing). An item the
 * inventory will not give (none recyclable left in the selection) is the "not recyclable" alert.
 * As in Flash, what goes in is whatever `requestInventoryFurniToRecycler` locks from the
 * selection; `category`, `typeId` and `xxxExtra` describe it.
 */
export const placeObjectAtRecyclerSlot = (slotId: number, category: number, typeId: number, xxxExtra: string, findNewSlotId: boolean = false) => {
    if (!isReady()) return;

    let targetSlot = slotId;
    const slots = recyclerStore.getState().recyclerSlots;

    if (!findNewSlotId) {
        if (slots[targetSlot]) releaseRecyclerSlot(targetSlot);
    } else if (slots.length > 0) {
        const free = slots.findIndex(slot => !slot);

        if (free === -1) return;

        targetSlot = free;
    }

    const itemId = lockSelectedFurniToRecycler();

    if (itemId === 0) {
        alert('recycler.alert.non.recyclable');

        return;
    }

    const next = recyclerStore.getState().recyclerSlots.slice();

    next[targetSlot] = { id: itemId, category, typeId, xxxExtra };

    recyclerStore.getState().setRecyclerSlots(next);
};

/** `isPoolFull`: every slot holds an item. */
const isRecyclerPoolFull = () => {
    const slots = recyclerStore.getState().recyclerSlots;

    return (slots.length >= getRecyclerNumberOfSlots()) && slots.every(slot => !!slot);
};

/**
 * `isReadyToRecycle` is the one place that alerts about a running trade. Flash's button update
 * asks it too, and so alerts on every redraw during a trade; the widget reads
 * `isRecyclerReadyToRecycle` (`context/recycler`), which does not alert, and only
 * `executeRecycler` asks this.
 */
const isReadyToRecycle = () => {
    if (!isReady() || !isRecyclerRoomSessionActive()) return false;

    if (isTradingActive()) {
        alert('recycler.alert.trading');

        return false;
    }

    return isRecyclerPoolFull();
};

/** `executeRecycler`: the slotted items are sent to be recycled, and the recycler waits for the answer. */
export const executeRecycler = (send: Send) => {
    if (!isReadyToRecycle()) return;

    recyclerStore.getState().setRecyclerLocalStatus(RECYCLER_STATUS_WAITING_FOR_SERVER);

    const itemIds: number[] = [];

    for (const slot of recyclerStore.getState().recyclerSlots) {
        if (!slot) return;

        itemIds.push(slot.id);
    }

    send(new RecycleItemsComposer({ itemIds }));
};

/** `hasEnoughDuckets`: the purse's duckets (activity point type 0) cover the cost. */
export const hasEnoughDucketsForRecycler = () => ((userStore.getState().activityPoints[0] ?? 0) >= getRecyclerDucketCost());

/** `setRoomSessionActive(false)`: leaving the room empties the slots and says a room is needed. */
export const setRecyclerRoomSessionEnded = () => {
    emptyRecycler();
    verifyRoomSessionStatus();
};

/** `storePrizeTable`: the prize table, each prize with its furni data (`PrizeLevelContainer`). */
export const storeRecyclerPrizeTable = (levels: readonly IPrizeLevelMessageData[]) => {
    const { floorItems, wallItems } = systemStore.getState();
    const furniData = (type: string, id: number) => ((type === 's') ? floorItems[id] : ((type === 'i') ? wallItems[id] : undefined));

    const prizes: RecyclerPrizeLevel[] = levels.map(level => ({
        prizeLevelId: level.prizeLevelId,
        probabilityDenominator: level.probabilityDenominator,
        prizes: level.prizes.map(prize => (prize.isDeal
            ? {
                    productItemType: 'deal', productItemTypeId: -1, furnitureData: undefined, oddsLevelId: level.prizeLevelId, isDeal: true,
                    subProducts: prize.subProducts, furnitureDatas: prize.subProducts.map(product => furniData(product.productItemType, product.productItemTypeId)),
                }
            : {
                    productItemType: prize.productItemType, productItemTypeId: prize.productItemTypeId, furnitureData: furniData(prize.productItemType, prize.productItemTypeId),
                    oddsLevelId: level.prizeLevelId, isDeal: false, subProducts: [], furnitureDatas: [],
                })),
    }));

    recyclerStore.getState().setRecyclerPrizes(prizes);
};

/** `getPrizeTable`: the table, or - with none yet - a request for it, whose answer the prizes widget waits for. */
export const requestRecyclerPrizeTable = (send: Send) => {
    if (recyclerStore.getState().recyclerPrizes) return;

    recyclerStore.getState().setRecyclerPrizesPending(true);

    send(new GetRecyclerPrizesComposer({}));
};

/**
 * `HabboInventory.recycleSelectedFurni` - the inventory's action on a double clicked item while
 * the recycler runs: the selected group's last item goes into the first free slot.
 */
export const recycleSelectedInventoryFurni = () => {
    const { furniGroups, furniSelectedGroupId } = inventoryStore.getState();
    const group = furniGroups.find(furniGroup => furniGroup.id === furniSelectedGroupId);

    if (!group) return;

    const item = peekInventoryFurni(group);

    if (!item) return;

    placeObjectAtRecyclerSlot(-1, isInventoryFurniGroupWallItem(group) ? RECYCLER_SLOT_CATEGORY_WALL : RECYCLER_SLOT_CATEGORY_FLOOR, item.typeId, String(item.extra), true);
};

/** `RecyclerLogic.recyclerDisabled`. */
export const isRecyclerDisabled = () => !systemActive();
