import { ActivityPointsMessage, CreditBalanceEventMessage, EmeraldBalanceMessage, HabboActivityPointNotificationMessage, SilverBalanceMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The purse - credits, emeralds, silver and the activity point currencies (duckets, diamonds and
 * the rest). Read by the toolbar and by anything that prices a purchase.
 */
export const registerWalletHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setCredits, setEmeralds, setSilver, setActivityPoints, setManyActivityPoints } = userStore.getState();

    return subscribeAll(subscribe, [
        on(CreditBalanceEventMessage, (data) => {
            setCredits(data.balance);
        }),

        on(EmeraldBalanceMessage, (data) => {
            setEmeralds(data.emeraldBalance);
        }),

        on(SilverBalanceMessage, (data) => {
            setSilver(data.silverBalance);
        }),

        on(HabboActivityPointNotificationMessage, (data) => {
            setActivityPoints(data.type, data.amount);
        }),

        on(ActivityPointsMessage, (data) => {
            setManyActivityPoints(data.pointsByCategoryId);
        }),
    ]);
};
