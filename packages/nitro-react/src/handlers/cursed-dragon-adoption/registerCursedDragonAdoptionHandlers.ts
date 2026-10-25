/**
 * The cursed dragon adoption's listeners - `CursedDragonAdoptionController.initComponent`'s
 * `HasClaimedProductResponseMessageEvent` and `ClaimProductResultMessageEvent`. The store drops an
 * answer for another claim, or one that comes when nothing is being fetched or claimed.
 */
import { ClaimProductResultMessage, HasClaimedProductResponseMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { cursedDragonAdoptionStore } from '#base/context/cursed-dragon-adoption';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCursedDragonAdoptionHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setClaimResponse, setClaimResult } = cursedDragonAdoptionStore.getState();

    return subscribeAll(subscribe, [
        on(HasClaimedProductResponseMessage, data => setClaimResponse(data.claimId, data.hasClaimed)),
        on(ClaimProductResultMessage, data => setClaimResult(data.claimId, data.result)),
    ]);
};
