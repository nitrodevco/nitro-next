/**
 * The purse's start-up requests - the ones `HabboInventory.initComponent` sends: the credits, the
 * NFT credits (emeralds), the silver and the club subscription
 * (`ScrGetUserInfoMessageComposer("habbo_club")`, answered with `ScrSendUserInfo`; Turbo sends the
 * account's preferences with it).
 *
 * While the subscription has minutes left it is asked for again every minute, so the purse counts
 * down and notices the end - `HabboInventory.setClubStatus` starting `onPurseTimer`.
 *
 * The same start-up asks for the badge point limits last (`GetBadgePointLimitsComposer`).
 */
import { GetBadgePointLimitsComposer, GetCreditsInfoComposer, GetNftCreditsComposer, GetSilverComposer, ScrGetUserInfoComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useUserStore } from '#base/context/user';

export const WalletComponent = () => {
    const { send } = useWebSocketContext();
    const minutesUntilExpiration = useUserStore(x => x.clubSubscription.minutesUntilExpiration);
    const isCountingDown = (minutesUntilExpiration > 0) && (minutesUntilExpiration < 86400000);

    useEffect(() => {
        send(new GetCreditsInfoComposer({}));
        send(new GetNftCreditsComposer({}));
        send(new GetSilverComposer({}));
        send(new ScrGetUserInfoComposer({ productName: 'habbo_club' }));
        send(new GetBadgePointLimitsComposer({}));
    }, []);

    useEffect(() => {
        if (!isCountingDown) return;

        const timer = setInterval(() => send(new ScrGetUserInfoComposer({ productName: 'habbo_club' })), 60000);

        return () => clearInterval(timer);
    }, [ isCountingDown ]);

    return null;
};
