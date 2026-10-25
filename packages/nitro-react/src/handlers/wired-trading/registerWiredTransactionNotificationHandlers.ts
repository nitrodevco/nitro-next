/**
 * The bubbles a wired transaction ends with, and the reward popups - the wired half of Flash
 * `notifications/IncomingMessages` (`onWiredTransactionSuccess`, `onWiredTransactionFail`,
 * `onWiredTradeTransactionNotification`) and `RewardNotificationController.onTransactionSuccess`.
 *
 * Both Flash listeners saw the same parsed packet, and so the same `internalId`: the bubble of a
 * transaction with a reward links to `wiredrewards/open/<internalId>`, and the reward is kept
 * under that id (and opened at once when the server says so).
 *
 * The reference server (turbo-cloud) sends none of the transaction packets; this follows Flash.
 */
import { WiredTradeTransactionNotificationMessage, WiredTransactionFailMessage, WiredTransactionSuccessMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { translate as t } from '#base/context/system';
import { nextRewardInternalId, wiredTradingStore } from '#base/context/wired-trading';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWiredTransactionNotificationHandlers = ({ subscribe }: WebSocketConnection) => {
    const { addNotification } = notificationStore.getState();
    const { addReward, openRewardView } = wiredTradingStore.getState();

    return subscribeAll(subscribe, [
        on(WiredTransactionSuccessMessage, (data) => {
            const { contents } = data;
            const internalId = nextRewardInternalId();
            const hasReward = (contents.rewardContents !== undefined);

            let key = `wired_transactions.notification.success.${contents.transactionSuccessTypeId}`;

            if (hasReward && !contents.openByDefault) key += '.click_to_popup';

            addNotification(t(key, t('wired_transactions.notification.success', 'wired_transactions.notification.success')), 'info', 'chests_icon_successful', hasReward ? `wiredrewards/open/${internalId}` : undefined);

            if (!hasReward) return;

            addReward({ ...contents, internalId });

            if (contents.openByDefault) openRewardView(internalId);
        }),

        on(WiredTransactionFailMessage, (data) => {
            const reasonKey = `wired_transactions.notification.fail.${data.transactionFailureTypeId}`;
            const reason = t(reasonKey, reasonKey);

            addNotification(t('wired_transactions.notification.fail', '', { reason }), 'info', 'chests_icon_rejected');
        }),

        on(WiredTradeTransactionNotificationMessage, (data) => {
            const errorKey = `wired_transactions.notification.trade_error.${data.tradeTransactionNotificationId}`;
            const error = t(errorKey, errorKey);

            addNotification(t('wired_transactions.notification.trade_error', '', { error }), 'info', 'chests_icon_trading_error');
        }),
    ]);
};
