/**
 * The inventory's badges - the part of Flash `inventory/badges/BadgesModel` the rest of the client
 * reads: the codes of the badges the user owns, in `getBadges()` order, and whether the list has
 * been asked for (`HabboInventory.§_-iL§`, set by `getAllMyBadgeIds` the first time it finds the
 * model empty).
 *
 * `initBadges` is `BadgesModel.initBadges` with a complete `BadgesMessage` (the fragments joined by
 * `registerInventoryBadgesHandlers`): the list is replaced, one entry per code - the parser keys the
 * fragment by code, so a code the server repeats is kept once, where it first appeared. Flash puts
 * the badges its unseen item tracker names at the front; that tracker is not ported, so every badge
 * keeps the server's order, as Flash does for a badge the tracker does not name.
 *
 * The badges tab itself (wearing, rarity groups, the selection) is not ported: this slice holds
 * what `UserBadgeSelectorCatalogWidget` reads through `HabboInventory.getAllMyBadgeIds`.
 */
import { IInventoryBadge } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

type State = {
    /** `BadgesModel.getBadges()`'s badge ids (Flash's badge "id" is the code). */
    badgeCodes: string[];
    /** `HabboInventory.§_-iL§`: `GetBadges` has been sent by `getAllMyBadgeIds`. */
    badgesRequested: boolean;
};

type Actions = {
    /** `BadgesModel.initBadges` with every fragment of a `BadgesMessage`, in order. */
    initBadges: (badges: IInventoryBadge[]) => void;
    setBadgesRequested: () => void;
};

export const InventoryBadgesSliceInitialState: State = {
    badgeCodes: [],
    badgesRequested: false,
};

export type InventoryBadgesSlice = State & Actions;

export const createInventoryBadgesSlice: StateCreator<InventoryBadgesSlice, [], [], InventoryBadgesSlice> = set => ({
    ...InventoryBadgesSliceInitialState,
    initBadges: badges => set({ badgeCodes: [ ...new Set(badges.map(badge => badge.badgeCode)) ] }),
    setBadgesRequested: () => set({ badgesRequested: true }),
});
