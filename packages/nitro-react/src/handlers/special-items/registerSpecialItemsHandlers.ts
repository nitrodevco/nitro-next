/**
 * The special items display's one listener - `SpecialItemsController.initComponent`'s
 * `HasClaimedProductResponseMessageEvent`: the server's answer to whether the set's free claim was
 * already taken, which moves the claim from fetching to browsing (or claimed). An answer for
 * another claim, or one that arrives when nothing is being fetched, is ignored by the store as
 * Flash ignores it.
 */
import { HasClaimedProductResponseMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { specialItemsStore } from '#base/context/special-items';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerSpecialItemsHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setClaimResponse } = specialItemsStore.getState();

    return subscribeAll(subscribe, [
        on(HasClaimedProductResponseMessage, data => setClaimResponse(data.claimId, data.hasClaimed)),
    ]);
};
