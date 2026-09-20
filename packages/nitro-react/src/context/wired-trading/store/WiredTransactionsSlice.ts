/**
 * The transaction log windows - Flash `wired_trading/transactions/overview/WiredTransactionLogsController`
 * (a page of a chest's or the room's log) and `transactions/details/WiredTransactionDetailsController`
 * (one transaction). Each keeps the last packet it accepted and whether its window is up; a new
 * packet shows the window again.
 *
 * The reference server (turbo-cloud) implements none of the transaction packets; Flash's
 * behaviour is the specification.
 */
import type { IWiredTransactionDetails, IWiredTransactionLogList } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `TransactionConfig.PAGE_SIZE`: the page size of the log window, and how it knows a page is its own. */
export const WIRED_TRANSACTION_PAGE_SIZE = 25;
/** `WiredMenuChestsTab.TRANSACTIONS_PREVIEW_AMOUNT`: the wired menu's preview of the room log, which the log window leaves alone. */
export const WIRED_TRANSACTIONS_PREVIEW_AMOUNT = 10;

type State = {
    transactionLogs: IWiredTransactionLogList | undefined;
    transactionLogsVisible: boolean;
    transactionDetails: IWiredTransactionDetails | undefined;
    transactionDetailsVisible: boolean;
};

type Actions = {
    /** `onLogList` + `displayNewPage` + `show`. */
    showTransactionLogs: (logs: IWiredTransactionLogList) => void;
    hideTransactionLogs: () => void;
    /** `onTransactionDetails` + `updateUI` + `show`. */
    showTransactionDetails: (details: IWiredTransactionDetails) => void;
    hideTransactionDetails: () => void;
};

export const WiredTransactionsSliceInitialState: State = {
    transactionLogs: undefined,
    transactionLogsVisible: false,
    transactionDetails: undefined,
    transactionDetailsVisible: false,
};

export type WiredTransactionsSlice = State & Actions;

export const createWiredTransactionsSlice: StateCreator<WiredTransactionsSlice, [], [], WiredTransactionsSlice> = set => ({
    ...WiredTransactionsSliceInitialState,
    showTransactionLogs: transactionLogs => set({ transactionLogs, transactionLogsVisible: true }),
    hideTransactionLogs: () => set({ transactionLogsVisible: false }),
    showTransactionDetails: transactionDetails => set({ transactionDetails, transactionDetailsVisible: true }),
    hideTransactionDetails: () => set({ transactionDetailsVisible: false }),
});
