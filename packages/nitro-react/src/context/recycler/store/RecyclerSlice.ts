/**
 * The recycler - what Flash's `catalog/recycler/RecyclerLogic` keeps: the local status
 * (`_localStatus`: 0 off, 1 ready, 2 waiting for the server), the server's status
 * (`_systemStatus`: 2 is closed, 3 is cooling down until `§_-uC§`), the slots (`§_-e1C§`, a
 * `FurniSlotItem` or nothing each), the prize table (`_prizes`, built by `storePrizeTable`) and
 * whether a request for it is pending (`§_-7e§`, the callback `getPrizeTable` leaves), and
 * whether a recycler widget is registered as its visualization (`§_-y1§`, and whether that one
 * has been disposed since).
 *
 * `recyclerMachineShake` / `recyclerArrowRotation` are `RecyclerEngineAnimator`'s writes to the
 * page's `recycle_machine` and the widget's `pointer_arrow` - the animator moves windows of two
 * different views, so what it sets is kept here where both can read it.
 *
 * The logic is `HabboCatalog`'s and lives for the session, but the inventory reaches it too
 * (`HabboInventory.recycleSelectedFurni` -> `catalog.getRecycler()`), so the store is an app-wide
 * singleton rather than part of the window-scoped catalogue store. The methods themselves are in
 * `commands/catalogRecyclerCommands.ts`.
 */
import { IFurnitureData } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

/** `RecyclerLogic`'s `STATUS_OFF` / `STATUS_READY` / `STATUS_WAITING_FOR_SERVER`. */
export const RECYCLER_STATUS_OFF = 0;
export const RECYCLER_STATUS_READY = 1;
export const RECYCLER_STATUS_WAITING_FOR_SERVER = 2;

/** The server's statuses `RecyclerLogic` tells apart: closed, and cooling down. */
export const RECYCLER_SYSTEM_STATUS_CLOSED = 2;
export const RECYCLER_SYSTEM_STATUS_TIMEOUT = 3;

/** `FurniSlotItem`: what sits in a slot - the inventory item, its category (10 floor, 20 wall), type and extra. */
export interface RecyclerSlotItem {
    id: number;
    category: number;
    typeId: number;
    xxxExtra: string;
}

/** `PrizeContainer` (and `DealPrizeContainer` for a deal). */
export interface RecyclerPrize {
    productItemType: string;
    productItemTypeId: number;
    /** `§_-C7§`: the furni data, for an `s` / `i` prize whose type the furni data has. */
    furnitureData: IFurnitureData | undefined;
    oddsLevelId: number;
    isDeal: boolean;
    /** A deal's products and their furni data (`subProducts` / `furnitureDatas`). */
    subProducts: readonly { productItemType: string; productItemTypeId: number }[];
    furnitureDatas: readonly (IFurnitureData | undefined)[];
}

/** `PrizeLevelContainer`. */
export interface RecyclerPrizeLevel {
    prizeLevelId: number;
    probabilityDenominator: number;
    prizes: readonly RecyclerPrize[];
}

/** `secondsToWait`: while cooling down, the whole seconds left at `now` (`getTimer()`). */
export const getRecyclerSecondsToWait = (systemStatus: number, nextAllowedAt: number, now: number) => ((systemStatus === RECYCLER_SYSTEM_STATUS_TIMEOUT) ? Math.max(0, Math.ceil((nextAllowedAt - now) / 1000)) : 0);

/**
 * `isReadyToRecycle` without its alert: ready (`statusActive && systemActive` and status 1), in a
 * room (`privateRoomSessionActive`), no trade running, and every one of the slots full
 * (`isPoolFull`).
 */
export const isRecyclerReadyToRecycle = (localStatus: number, systemStatus: number, slots: readonly (RecyclerSlotItem | null)[], numberOfSlots: number, inRoom: boolean, tradingActive: boolean) => {
    const ready = (localStatus === RECYCLER_STATUS_READY) && (systemStatus !== RECYCLER_SYSTEM_STATUS_CLOSED);

    return ready && inRoom && !tradingActive && (slots.length >= numberOfSlots) && slots.every(slot => !!slot);
};

type State = {
    recyclerLocalStatus: number;
    recyclerSystemStatus: number;
    recyclerNextAllowedAt: number;
    recyclerSlots: readonly (RecyclerSlotItem | null)[];
    recyclerPrizes: readonly RecyclerPrizeLevel[] | undefined;
    recyclerPrizesPending: boolean;
    recyclerVisualization: boolean;
    recyclerMachineShake: { x: number; y: number };
    recyclerArrowRotation: number;
};

type Actions = {
    setRecyclerLocalStatus: (status: number) => void;
    setRecyclerSystemStatus: (status: number) => void;
    setRecyclerNextAllowedAt: (timestamp: number) => void;
    setRecyclerSlots: (slots: readonly (RecyclerSlotItem | null)[]) => void;
    setRecyclerPrizes: (prizes: readonly RecyclerPrizeLevel[]) => void;
    setRecyclerPrizesPending: (pending: boolean) => void;
    setRecyclerVisualization: (visualization: boolean) => void;
    setRecyclerMachineShake: (x: number, y: number) => void;
    setRecyclerArrowRotation: (rotation: number) => void;
};

export const RecyclerSliceInitialState: State = {
    recyclerLocalStatus: RECYCLER_STATUS_OFF,
    recyclerSystemStatus: 0,
    recyclerNextAllowedAt: 0,
    recyclerSlots: [],
    recyclerPrizes: undefined,
    recyclerPrizesPending: false,
    recyclerVisualization: false,
    recyclerMachineShake: { x: 0, y: 0 },
    recyclerArrowRotation: 0,
};

export type RecyclerSlice = State & Actions;

export const createRecyclerSlice: StateCreator<RecyclerSlice, [], [], RecyclerSlice> = set => ({
    ...RecyclerSliceInitialState,
    setRecyclerLocalStatus: recyclerLocalStatus => set({ recyclerLocalStatus }),
    setRecyclerSystemStatus: recyclerSystemStatus => set({ recyclerSystemStatus }),
    setRecyclerNextAllowedAt: recyclerNextAllowedAt => set({ recyclerNextAllowedAt }),
    setRecyclerSlots: recyclerSlots => set({ recyclerSlots }),
    setRecyclerPrizes: recyclerPrizes => set({ recyclerPrizes, recyclerPrizesPending: false }),
    setRecyclerPrizesPending: recyclerPrizesPending => set({ recyclerPrizesPending }),
    setRecyclerVisualization: recyclerVisualization => set({ recyclerVisualization }),
    setRecyclerMachineShake: (x, y) => set(state => (((state.recyclerMachineShake.x === x) && (state.recyclerMachineShake.y === y)) ? state : { recyclerMachineShake: { x, y } })),
    setRecyclerArrowRotation: recyclerArrowRotation => set({ recyclerArrowRotation }),
});
