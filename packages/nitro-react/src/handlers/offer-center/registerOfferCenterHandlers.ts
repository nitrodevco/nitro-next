/**
 * The offer centre's one listener - `OfferCenter`'s `OfferRewardDeliveredMessageEvent`: a reward
 * a completed video offer earned goes to the front of the list (`addReward`). Flash only listens
 * while the offer centre exists, which is when `HabboClubCenter` built it (`offers.enabled` and
 * `offers.habboclub.enabled`). The list's window stamps a row with the time it is built, so a
 * reward that lands while the window is up is stamped now; otherwise Flash tells the offer
 * extension (`indicateRewards`), which for `HabboClubCenter` does nothing.
 */
import { OfferRewardDeliveredMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { offerCenterStore } from '#base/context/offer-center';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';
import { isOfferCenterEnabled } from './bridgeOfferCenter';

export const registerOfferCenterHandlers = ({ subscribe }: WebSocketConnection) => {
    if (!isOfferCenterEnabled()) return () => {};

    const { addOfferReward } = offerCenterStore.getState();

    return subscribeAll(subscribe, [
        on(OfferRewardDeliveredMessage, (data) => {
            const visible = !!systemStore.getState().visibleWindows.offer_center;

            addOfferReward(data.name, data.contentType, data.classId, visible ? new Date().toLocaleString() : '');
        }),
    ]);
};
