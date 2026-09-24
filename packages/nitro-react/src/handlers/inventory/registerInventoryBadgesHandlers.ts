/**
 * The inventory's badge list - the badges half of Flash `inventory/IncomingMessages` (`onBadges`,
 * `onBadgeReceived`) and what `BadgesModel` does with each. The catalogue's
 * `UserBadgeSelectorCatalogWidget` listens to the same message only to re-read the model
 * (`onUserBadgesUpdated`), which the port's widget does by reading the store.
 *
 * - `Badges` comes in fragments, which are collected (`addMessageFragment`, the buffer sized by the
 *   first fragment's total) and handed to `initBadges` once all are in.
 * - `BadgeReceived` is `updateBadgeData`: one badge added or updated, and put straight on where the
 *   list still has room for it.
 *
 * Who asks for the list: `HabboInventory.getAllMyBadgeIds` the first time it finds the model empty,
 * and the badges tab when it opens (`commands/inventoryBadgeCommands`).
 */
import { BadgeReceivedEventMessage, BadgesEventMessage, IInventoryBadge } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerInventoryBadgesHandlers = ({ subscribe }: WebSocketConnection) => {
    const { initBadges, updateBadge } = inventoryStore.getState();
    // `IncomingMessages`' badge fragment buffer: the fragments of the list on its way in.
    let fragments: (IInventoryBadge[] | undefined)[] | undefined;

    /** `addMessageFragment`: the whole list once every fragment is in. */
    const addFragment = (fragment: IInventoryBadge[], totalFragments: number, fragmentNo: number): IInventoryBadge[] | undefined => {
        if (totalFragments === 1) return fragment;

        fragments ??= new Array<IInventoryBadge[] | undefined>(totalFragments).fill(undefined);
        fragments[fragmentNo] = fragment;

        if (fragments.some(received => !received)) return undefined;

        return fragments.flatMap(received => received ?? []);
    };

    return subscribeAll(subscribe, [
        on(BadgesEventMessage, (data) => {
            const badges = addFragment(data.badges, data.totalFragments, data.fragmentNo);

            if (!badges) return;

            fragments = undefined;
            initBadges(badges);
        }),

        // `updateBadgeData(data, true)`: a badge that arrives during the session is worn if it fits.
        on(BadgeReceivedEventMessage, data => updateBadge(data, true)),
    ]);
};
