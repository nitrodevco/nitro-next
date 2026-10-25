/**
 * The income reward packets - Flash's `catalog/earnings/EarningsController.initComponent`
 * listeners, plus the first status request `SessionDataManager.initSessionData` sends once the
 * session is up (read here when the user is known, beside the ignore and block lists it sends
 * with). The purse's earnings dot and the vault window both read what these write.
 *
 * The reference server (turbo-cloud) answers none of the requests, so nothing arrives there yet.
 */
import { IncomeRewardClaimResponseMessage, IncomeRewardNotificationMessage, IncomeRewardStatusMessage, UserObjectMessage } from '@nitrodevco/nitro-packets';

import { requestIncomeRewardStatus } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { EARNINGS_REWARD_TYPE_DUCKETS, earningsStore } from '#base/context/earnings';
import { notificationStore } from '#base/context/notifications';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** Whether the vault window is up: `§_-y1§ && !§_-y1§.disposed`. */
const isVaultOpen = () => !!systemStore.getState().visibleWindows.earnings;

export const registerEarningsHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setShowingIndicator, setAwaitingFirstStatus, applyIncomeRewardData, applyIncomeRewardClaimResponse } = earningsStore.getState();
    const { addNotification } = notificationStore.getState();

    return subscribeAll(subscribe, [
        on(UserObjectMessage, () => requestIncomeRewardStatus(send)),

        // `onIncomeRewardStatusMessageEvent`: the first status of the session lights the purse's dot
        // when anything but duckets waits to be claimed.
        on(IncomeRewardStatusMessage, (data) => {
            if (isVaultOpen()) applyIncomeRewardData(data.data);

            if (!earningsStore.getState().awaitingFirstStatus) return;

            setAwaitingFirstStatus(false);

            if (data.data.some(reward => (reward.rewardType !== EARNINGS_REWARD_TYPE_DUCKETS) && (reward.amount > 0))) setShowingIndicator(true);
        }),

        // `onIncomeRewardClaimResponseMessageEvent`: only an open vault hears the answer.
        on(IncomeRewardClaimResponseMessage, (data) => {
            if (isVaultOpen()) applyIncomeRewardClaimResponse(data.rewardCategory, data.result);
        }),

        // `onIncomeRewardNotificationMessageEvent`: a bubble that opens the vault; a vault that was
        // ever built asks for the status again, and a vault that is not up lights the dot.
        on(IncomeRewardNotificationMessage, () => {
            addNotification(systemStore.getState().interpolate('${notification.earning.new}'), 'earning', undefined, 'habboUI/open/vault');

            if (earningsStore.getState().viewCreated) requestIncomeRewardStatus(send);

            if (!isVaultOpen()) setShowingIndicator(true);
        }),
    ]);
};
