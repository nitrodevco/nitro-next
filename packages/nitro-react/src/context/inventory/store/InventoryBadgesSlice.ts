/**
 * The inventory's badges - Flash `inventory/badges/BadgesModel` and the `Badge` items its
 * `BadgesView` draws: every badge the user owns with the id, owner count and rarity the server
 * sends, which of them are worn (`BADGES_ACTIVE`, at most five), which one is selected, and
 * whether the list has been asked for (set by `getAllMyBadgeIds` the first time it finds the model
 * empty).
 *
 * - `initBadges` is `BadgesModel.initBadges` with a complete `BadgesMessage` (the fragments joined
 *   by `registerInventoryBadgesHandlers`): the list is replaced, one entry per code - the parser
 *   keys the fragment by code, so a code the server repeats is kept once, where it first appeared.
 *   Flash puts the badges its unseen item tracker names at the front; that tracker is not ported,
 *   so every badge keeps the server's order, as Flash does for a badge the tracker does not name.
 * - `updateBadge` is `BadgesModel.updateBadge` (`BadgeReceivedMessage`): a code already held is
 *   updated in place, a new one is appended and, where the packet says so, put straight on.
 * - `removeBadge` takes the badge off first (`stopWearingBadge`), so a badge that goes while it is
 *   worn does not leave a hole in the worn list.
 * - Wearing is `toggleBadgeWearing` -> `startWearingBadge` / `stopWearingBadge`: the worn list is
 *   its own order, capped at `INVENTORY_MAX_ACTIVE_BADGES`, and the server is told about it by
 *   `inventoryBadgeCommands.saveInventoryBadgeSelection` (`saveBadgeSelection`).
 *
 * `badgeCodes` stays the plain code list the catalogue's badge display page reads through
 * `HabboInventory.getAllMyBadgeIds`.
 */
import { IInventoryBadge } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `BadgesModel.MAX_ACTIVE_BADGE_COUNT`. */
export const INVENTORY_MAX_ACTIVE_BADGES = 5;

/** `BadgesModel.BADGES_ALL` / `BADGES_INACTIVE` / `BADGES_ACTIVE` - what `getBadges` is filtered by. */
export const INVENTORY_BADGES_ALL = -1;
export const INVENTORY_BADGES_INACTIVE = 0;
export const INVENTORY_BADGES_ACTIVE = 1;

/** Flash `inventory/badges/Badge`, without the window it carries. */
export interface InventoryBadge {
    /** `Badge.badgeId` is the code; the numeric id is `badgeNumberId`. */
    code: string;
    badgeNumberId: number;
    ownerCount: number;
    rarityId: number;
}

type State = {
    /** Every owned badge in `getBadges(BADGES_ALL)` order. */
    badges: InventoryBadge[];
    /** `BadgesModel.badgeCodes`: the codes alone, what the catalogue's badge page reads. */
    badgeCodes: string[];
    /** The worn badges' codes, in the order they are worn (`getBadges(BADGES_ACTIVE)`). */
    wornBadgeCodes: string[];
    /** The selected badge's code, '' for none (`getSelectedBadge`). */
    selectedBadgeCode: string;
    /** `GetBadges` has been sent by `getAllMyBadgeIds`. */
    badgesRequested: boolean;
};

type Actions = {
    /** `BadgesModel.initBadges` with every fragment of a `BadgesMessage`, in order. */
    initBadges: (badges: IInventoryBadge[]) => void;
    /** `BadgesModel.updateBadge`: one badge added or updated, optionally put straight on. */
    updateBadge: (badge: IInventoryBadge, wear: boolean) => void;
    /** `BadgesModel.removeBadge`, taking it off first. */
    removeBadge: (code: string) => void;
    /** `BadgesModel.toggleBadgeWearing` - the caller sends the selection on afterwards. */
    toggleBadgeWearing: (code: string) => void;
    /** `BadgesModel.setBadgeSelected`; '' is `removeSelections`. */
    selectBadge: (code: string) => void;
    setBadgesRequested: () => void;
};

export const InventoryBadgesSliceInitialState: State = {
    badges: [],
    badgeCodes: [],
    wornBadgeCodes: [],
    selectedBadgeCode: '',
    badgesRequested: false,
};

export type InventoryBadgesSlice = State & Actions;

const toBadge = (badge: IInventoryBadge): InventoryBadge => ({ code: badge.badgeCode, badgeNumberId: badge.badgeId, ownerCount: badge.ownerCount, rarityId: badge.badgeRarityId });

export const createInventoryBadgesSlice: StateCreator<InventoryBadgesSlice, [], [], InventoryBadgesSlice> = set => ({
    ...InventoryBadgesSliceInitialState,
    initBadges: (incoming) => {
        const badges: InventoryBadge[] = [];
        const seen = new Set<string>();

        for (const badge of incoming) {
            if (seen.has(badge.badgeCode)) continue;

            seen.add(badge.badgeCode);
            badges.push(toBadge(badge));
        }

        // `resetBadges` clears the worn list and the selection with the badges themselves.
        set({ badges, badgeCodes: badges.map(badge => badge.code), wornBadgeCodes: [], selectedBadgeCode: '' });
    },
    updateBadge: (incoming, wear) => set((x) => {
        const badge = toBadge(incoming);
        const index = x.badges.findIndex(held => held.code === badge.code);
        const badges = (index === -1) ? [ ...x.badges, badge ] : x.badges.map((held, at) => ((at === index) ? badge : held));
        const wornBadgeCodes = (wear && !x.wornBadgeCodes.includes(badge.code) && (x.wornBadgeCodes.length < INVENTORY_MAX_ACTIVE_BADGES))
            ? [ ...x.wornBadgeCodes, badge.code ]
            : x.wornBadgeCodes;

        return { badges, badgeCodes: badges.map(held => held.code), wornBadgeCodes };
    }),
    removeBadge: code => set((x) => {
        if (!x.badges.some(badge => badge.code === code)) return x;

        const badges = x.badges.filter(badge => badge.code !== code);

        return {
            badges,
            badgeCodes: badges.map(badge => badge.code),
            wornBadgeCodes: x.wornBadgeCodes.filter(worn => worn !== code),
            selectedBadgeCode: (x.selectedBadgeCode === code) ? '' : x.selectedBadgeCode,
        };
    }),
    toggleBadgeWearing: code => set((x) => {
        if (!x.badges.some(badge => badge.code === code)) return x;

        if (x.wornBadgeCodes.includes(code)) return { wornBadgeCodes: x.wornBadgeCodes.filter(worn => worn !== code) };

        // `startWearingBadge` does nothing once five are on.
        if (x.wornBadgeCodes.length >= INVENTORY_MAX_ACTIVE_BADGES) return x;

        return { wornBadgeCodes: [ ...x.wornBadgeCodes, code ] };
    }),
    selectBadge: selectedBadgeCode => set({ selectedBadgeCode }),
    setBadgesRequested: () => set({ badgesRequested: true }),
});

/** `BadgesModel.getBadges(filter)`. */
export const getInventoryBadges = (badges: readonly InventoryBadge[], wornBadgeCodes: readonly string[], filter: number): InventoryBadge[] => {
    if (filter === INVENTORY_BADGES_ALL) return [ ...badges ];

    if (filter === INVENTORY_BADGES_ACTIVE) return wornBadgeCodes.flatMap(code => badges.filter(badge => badge.code === code));

    return badges.filter(badge => !wornBadgeCodes.includes(badge.code));
};

/** `BadgesModel.getAvailableRareBadgeRarityIds`: the rarity ids the owned badges actually use, ascending. */
export const getInventoryBadgeRarityIds = (badges: readonly InventoryBadge[]): number[] => [ ...new Set(badges.map(badge => badge.rarityId)) ].sort((a, b) => a - b);
