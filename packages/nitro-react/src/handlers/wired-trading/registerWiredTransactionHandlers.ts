/**
 * The transaction log windows - Flash `WiredTransactionLogsController.onLogList` and
 * `WiredTransactionDetailsController.onTransactionDetails`.
 *
 * The log window only takes pages of its own size: the wired menu's chests tab asks for a short
 * preview of the room's log (`WIRED_TRANSACTIONS_PREVIEW_AMOUNT`), and that answer is the tab's.
 *
 * The reference server (turbo-cloud) sends none of the transaction packets; this follows Flash.
 */
import { WiredTransactionLogDetailsMessage, WiredTransactionLogListMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { WIRED_TRANSACTION_PAGE_SIZE, WIRED_TRANSACTIONS_PREVIEW_AMOUNT, wiredTradingStore } from '#base/context/wired-trading';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredTransactionHandlers = ({ subscribe }: WebSocketConnection) => {
    const { showTransactionLogs, showTransactionDetails } = wiredTradingStore.getState();

    return subscribeAll(subscribe, [
        on(WiredTransactionLogListMessage, (data) => {
            if (data.logs.amount === WIRED_TRANSACTIONS_PREVIEW_AMOUNT) return;
            if (data.logs.amount !== WIRED_TRANSACTION_PAGE_SIZE) return;

            showTransactionLogs(data.logs);
        }),

        on(WiredTransactionLogDetailsMessage, data => showTransactionDetails(data.details)),
    ]);
};
