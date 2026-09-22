/**
 * The request half of Flash `HabboInventory.getAllMyBadgeIds`: the first time it finds the badge
 * model empty, it asks the server for the list once (`§_-iL§`, then
 * `BadgesModel.requestInitialization`). The answer half - the owned codes minus the ones asked to
 * leave out - is a read of `inventoryStore`'s `badgeCodes`, which the caller takes with a selector.
 */
import { GetBadgesComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';

type Send = WebSocketConnection['send'];

/** `getAllMyBadgeIds`' request: `BadgesModel.requestInitialization` once, while the model is empty. */
export const requestInventoryBadgesIfEmpty = (send: Send) => {
    const { badgeCodes, badgesRequested, setBadgesRequested } = inventoryStore.getState();

    if (badgeCodes.length || badgesRequested) return;

    setBadgesRequested();
    send(new GetBadgesComposer({}));
};
