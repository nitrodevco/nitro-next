/**
 * A wired box trading with the user - the wired half of Flash `inventory/IncomingMessages`
 * (`onWiredTradeInitiate`, `onWiredTradeItemsUpdate`, `onWiredTradeCancelled`,
 * `onWiredTradeCompleted`) and what `WiredTradingModel` does with each.
 *
 * `onWiredTradeItemsUpdate` built the inventory's group items from both sides of the offer;
 * the list is kept as the server sent it and grouped where it is shown.
 *
 * The reference server (turbo-cloud) sends none of the wired trade packets; this follows Flash.
 */
import { NitroLogger } from '@nitrodevco/nitro-api';
import { WiredTradeCancelledMessage, WiredTradeCompletedMessage, WiredTradeInitiateMessage, WiredTradeItemsUpdateMessage } from '@nitrodevco/nitro-packets';

import { closeWiredTrade } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { WIRED_TRADE_CANCEL_SILENT, wiredTradingStore } from '#base/context/wired-trading';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredTradeHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { initiateTrade, setTradeItems } = wiredTradingStore.getState();

    return subscribeAll(subscribe, [
        on(WiredTradeInitiateMessage, (data) => {
            const { requirement } = data;

            if (requirement.rules && !requirement.rules.definition.youGiveRule) {
                NitroLogger.log('Initiated a trade where the user gives nothing - not possible');

                return;
            }

            // `close(false, false, false)`: an overridden trade goes without a cancel.
            if (data.overridePreviousTrade) closeWiredTrade(send, false);

            initiateTrade(requirement, data.showRequirementsImmediate, data.overridePreviousTrade, data.timeoutSeconds, performance.now());
        }),

        on(WiredTradeItemsUpdateMessage, data => setTradeItems(data.tradingItems, data.canAccept, data.extra)),

        on(WiredTradeCancelledMessage, (data) => {
            closeWiredTrade(send, false);

            // `WiredTradingView.alertTradeCancelled`.
            if (data.transactionFailureTypeId === WIRED_TRADE_CANCEL_SILENT) return;

            const { getLocalizationValue, showAlert } = systemStore.getState();
            const reasonKey = `wired_transactions.notification.fail.${data.transactionFailureTypeId}`;

            showAlert(
                getLocalizationValue('wired_transactions.notification.fail.popup.title', 'wired_transactions.notification.fail.popup.title'),
                getLocalizationValue('wired_transactions.notification.fail', '', { reason: getLocalizationValue(reasonKey, reasonKey) }),
            );
        }),

        on(WiredTradeCompletedMessage, () => closeWiredTrade(send, false)),
    ]);
};
