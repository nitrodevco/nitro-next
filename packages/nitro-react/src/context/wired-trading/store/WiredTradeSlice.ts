/**
 * A wired box trading with the user - Flash `inventory/wired_trading/WiredTradingModel` and the
 * requirement it holds (`WiredTradeRequirementsModel` / `TradeRequirementWrapper`).
 *
 * Flash showed the trade as a sub page of the inventory, under the furni grid, and the user
 * offered items from that grid. Here the trade has its own window; the inventory's furni page
 * offers its selection while the trade runs (`inventoryCommands.offerSelectedFurniToTrade` ->
 * `requestAddItemsToWiredTrade`), and the offer changes when the server answers with
 * `WiredTradeItemsUpdate`.
 *
 * The reference server (turbo-cloud) implements none of the wired trade packets; Flash's
 * behaviour is the specification.
 */
import type { ITradeRequirement, ITradingItemList } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `WiredTradingModel.STATE_*`. */
export const WIRED_TRADE_STATE_READY = 0;
export const WIRED_TRADE_STATE_ADDING_ITEMS = 1;
export const WIRED_TRADE_STATE_COUNTDOWN = 2;
export const WIRED_TRADE_STATE_CONFIRMING = 3;
export const WIRED_TRADE_STATE_CONFIRMED = 4;

/** `WiredTradingModel.§_-C29§`: the cancel reason that needs no alert. */
export const WIRED_TRADE_CANCEL_SILENT = 0;

type State = {
    /** `§_-Z2B§`: the trade window is up and the trade is live. */
    tradeRunning: boolean;
    tradeState: number;
    tradeRequirement: ITradeRequirement | undefined;
    /** The requirements bubble (`trade_requirements_bubble`) is showing. */
    tradeRequirementsVisible: boolean;
    /** Counts `highlightRefresh` calls: the bubble flashes whenever it changes. */
    tradeHighlightCount: number;
    /** `§_-W2L§`. */
    tradeTimeoutSeconds: number;
    /** `_tradeStartTime`, as `performance.now()` - the clock `useSecondsClock` reads. */
    tradeStartTime: number;
    /** The last `WiredTradeItemsUpdate`; the first user is us, the second the wired box. */
    tradeItems: ITradingItemList | undefined;
    tradeCanAccept: boolean;
    tradeExtra: number;
};

type Actions = {
    /** `onWiredTradeInitiate` followed by `initializeNewTrade`, which the inventory sub page switch runs in Flash. */
    initiateTrade: (requirement: ITradeRequirement, showRequirements: boolean, overridePrevious: boolean, timeoutSeconds: number, now: number) => void;
    setTradeState: (state: number) => void;
    /** `updateItemGroupMaps`: ignored unless a trade is running. */
    setTradeItems: (items: ITradingItemList, canAccept: boolean, extra: number) => void;
    setTradeRequirementsVisible: (visible: boolean) => void;
    /** `close` minus the cancel packet, which the command sends. */
    closeTrade: () => void;
};

/** `WiredTradingModel.clear`. */
const clearedOffer: Pick<State, 'tradeItems' | 'tradeCanAccept' | 'tradeExtra'> = {
    tradeItems: undefined,
    tradeCanAccept: false,
    tradeExtra: 0,
};

export const WiredTradeSliceInitialState: State = {
    tradeRunning: false,
    tradeState: WIRED_TRADE_STATE_READY,
    tradeRequirement: undefined,
    tradeRequirementsVisible: false,
    tradeHighlightCount: 0,
    tradeTimeoutSeconds: 0,
    tradeStartTime: 0,
    ...clearedOffer,
};

export type WiredTradeSlice = State & Actions;

export const createWiredTradeSlice: StateCreator<WiredTradeSlice, [], [], WiredTradeSlice> = set => ({
    ...WiredTradeSliceInitialState,
    initiateTrade: (requirement, showRequirements, overridePrevious, timeoutSeconds, now) => set(x => ({
        tradeRunning: true,
        tradeState: WIRED_TRADE_STATE_ADDING_ITEMS,
        tradeRequirement: requirement,
        tradeRequirementsVisible: showRequirements,
        tradeHighlightCount: overridePrevious ? (x.tradeHighlightCount + 1) : x.tradeHighlightCount,
        tradeTimeoutSeconds: timeoutSeconds,
        tradeStartTime: now,
        ...clearedOffer,
    })),
    setTradeState: tradeState => set({ tradeState }),
    setTradeItems: (tradeItems, tradeCanAccept, tradeExtra) => set(x => (x.tradeRunning ? { tradeItems, tradeCanAccept, tradeExtra } : x)),
    setTradeRequirementsVisible: tradeRequirementsVisible => set({ tradeRequirementsVisible }),
    closeTrade: () => set({ tradeRunning: false, tradeState: WIRED_TRADE_STATE_READY, tradeRequirementsVisible: false, ...clearedOffer }),
});
