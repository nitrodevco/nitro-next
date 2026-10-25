import { ActivityPointsMessage, CreditBalanceEventMessage, EmeraldBalanceMessage, HabboActivityPointNotificationMessage, SilverBalanceMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';
import { GetSoundManager, HabboSoundTypesEnum } from '#base/sound';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The purse - credits, emeralds, silver and the activity point currencies (duckets, diamonds and
 * the rest). Read by the toolbar and by anything that prices a purchase.
 *
 * `HabboCatalog.onCreditBalance` and `onActivityPointNotification` also ring the purse: the cash
 * register for every credit balance but the session's first, and the ducket sound for a change of
 * duckets (type 0).
 */
export const registerWalletHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setCredits, setEmeralds, setSilver, setActivityPoints, setManyActivityPoints } = userStore.getState();
    // `HabboCatalog`'s first-balance flag: the balance the login brings is not a purchase.
    let firstCreditBalance = true;

    return subscribeAll(subscribe, [
        on(CreditBalanceEventMessage, (data) => {
            setCredits(data.balance);

            if (!firstCreditBalance) GetSoundManager().playSound(HabboSoundTypesEnum.SOUND_CREDIT_BALANCE);

            firstCreditBalance = false;
        }),

        on(EmeraldBalanceMessage, (data) => {
            setEmeralds(data.emeraldBalance);
        }),

        on(SilverBalanceMessage, (data) => {
            setSilver(data.silverBalance);
        }),

        on(HabboActivityPointNotificationMessage, (data) => {
            setActivityPoints(data.type, data.amount);

            if (data.type === 0) GetSoundManager().playSound(HabboSoundTypesEnum.SOUND_DUCKET_BALANCE);
        }),

        on(ActivityPointsMessage, (data) => {
            setManyActivityPoints(data.pointsByCategoryId);
        }),
    ]);
};
