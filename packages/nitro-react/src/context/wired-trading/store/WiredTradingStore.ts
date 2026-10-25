/**
 * The wired trading store - what the Flash components of `roomevents/wired_trading` keep between
 * packets (`WiredChestController`, `WiredContractController`, `WiredTransactionLogsController`,
 * `WiredTransactionDetailsController`, `RewardNotificationController`) plus the inventory's
 * `WiredTradingModel`, one slice each. An app-wide singleton: the windows are opened by packets,
 * not by the user, so the handlers need somewhere to write whether a window is up or not.
 *
 * `resetRoom` is Flash's `REE_DISPOSED`: the chest window, the log windows, the contract windows
 * and the reward popups go. The rewards themselves stay openable from their bubbles, and the
 * wired trade - an inventory thing in Flash - is not tied to the room.
 */
import { createStore } from 'zustand';

import { createWiredChestSlice, WiredChestSlice, WiredChestSliceInitialState } from './WiredChestSlice';
import { createWiredContractSlice, WiredContractSlice, WiredContractSliceInitialState } from './WiredContractSlice';
import { createWiredRewardSlice, WiredRewardSlice } from './WiredRewardSlice';
import { createWiredTradeSlice, WiredTradeSlice } from './WiredTradeSlice';
import { createWiredTransactionsSlice, WiredTransactionsSlice } from './WiredTransactionsSlice';

type Actions = {
    resetRoom: () => void;
};

export type WiredTradingStore = Actions & WiredChestSlice & WiredContractSlice & WiredTransactionsSlice & WiredRewardSlice & WiredTradeSlice;

export const createWiredTradingStore = () => createStore<WiredTradingStore>()((set, get, store) => ({
    resetRoom: () => set({
        ...structuredClone(WiredChestSliceInitialState),
        ...structuredClone(WiredContractSliceInitialState),
        transactionLogsVisible: false,
        transactionDetailsVisible: false,
        rewardViews: [],
    }),
    ...createWiredChestSlice(set, get, store),
    ...createWiredContractSlice(set, get, store),
    ...createWiredTransactionsSlice(set, get, store),
    ...createWiredRewardSlice(set, get, store),
    ...createWiredTradeSlice(set, get, store),
}));

export const wiredTradingStore = createWiredTradingStore();
