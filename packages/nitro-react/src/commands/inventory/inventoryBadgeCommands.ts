/**
 * What the inventory's badges page does - the parts of Flash `inventory/badges/BadgesModel` that
 * talk to the server: `requestInitialization` (through `HabboInventory.getAllMyBadgeIds`, which
 * asks once while the model is empty, and `checkCategoryInitilization('badges')`, which asks while
 * no list has arrived) and `saveBadgeSelection`, which follows every change to the worn badges.
 *
 * The answer half - the owned codes minus the ones asked to leave out - is a read of
 * `inventoryStore`'s `badgeCodes`, which the caller takes with a selector.
 */
import { GetBadgesComposer, SetActivatedBadgesComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';

/** `getAllMyBadgeIds`' request: `BadgesModel.requestInitialization` once, while the model is empty. */
export const requestInventoryBadgesIfEmpty = (send: Send) => {
    const { badgeCodes, badgesRequested, setBadgesRequested } = inventoryStore.getState();

    if (badgeCodes.length || badgesRequested) return;

    setBadgesRequested();
    send(new GetBadgesComposer({}));
};

/**
 * `HabboInventory.checkCategoryInitilization('badges')`, as the badges page asks on being shown
 * (`InventoryMainView.setSubViewToCategory`): the list unless a whole one has arrived. A badge
 * received or levelled up before then is in the model but is not the list, so it does not stop
 * the ask - `initBadges` replaces the model with the full list and keeps it.
 */
export const checkInventoryBadgesInitialization = (send: Send) => {
    if (inventoryStore.getState().badgesInitialized) return;

    send(new GetBadgesComposer({}));
};

/** `BadgesModel.saveBadgeSelection`: the worn badges, in the order they are worn. */
export const saveInventoryBadgeSelection = (send: Send) => send(new SetActivatedBadgesComposer({ badgeCodes: inventoryStore.getState().wornBadgeCodes }));

/** `BadgesModel.toggleBadgeWearing`: put one on or take it off, then tell the server. */
export const toggleInventoryBadgeWearing = (send: Send, code: string) => {
    const { toggleBadgeWearing } = inventoryStore.getState();

    toggleBadgeWearing(code);
    saveInventoryBadgeSelection(send);
};
