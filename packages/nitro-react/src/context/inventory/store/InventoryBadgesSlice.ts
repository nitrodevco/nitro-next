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
 *   A badge whose id the unseen item tracker names (category 4, `isUnseen(4, badgeId)`) is put at
 *   the front (`unshift`, so the new ones end up in reverse), every other one at the back.
 * - `updateBadge` is `BadgesModel.updateBadge`: a code already held is updated in place and put on
 *   or taken off to match `wear`; a new one goes to the front when it is unseen and to the back
 *   otherwise, and is put on when `wear` says so. `HabboUserBadges` for the user (`onUserBadges`)
 *   calls it with `wear` for each worn badge - the only thing that fills the worn list, which
 *   `initBadges` empties - and `BadgeReceived` / an achievement level-up with `wear` false.
 * - A badge's mark is `Badge.isUnseen`, fixed when the badge is made - from the tracker as it stands
 *   at that moment, the same ask that places it - and cleared only by `resetBadgesUnseen`
 *   (`BadgesModel.resetUnseenItems`). An update to a badge already held keeps its mark.
 * - `removeBadge` takes the badge off first (`stopWearingBadge`), so a badge that goes while it is
 *   worn does not leave a hole in the worn list.
 * - Wearing is `toggleBadgeWearing` -> `startWearingBadge` / `stopWearingBadge`: the worn list is
 *   its own order, capped at `INVENTORY_MAX_ACTIVE_BADGES`, and the server is told about it by
 *   `inventoryBadgeCommands.saveInventoryBadgeSelection` (`saveBadgeSelection`).
 *
 * - A thumb's look follows `Badge.isSelected`'s setter, which colours `BG_COLOR` (green while
 *   unseen) and shows `outline` only on the selected one - but only on a window that exists. The
 *   window is made the first time the badge goes into a grid (`Badge.window`), and nothing sets its
 *   look then, so a fresh thumb keeps the layout's: grey and outlined. The constructor's
 *   `isSelected = false` and the first `forceSelection` run before any window does, so every thumb
 *   opens outlined until the next `setBadgeSelected` (a click) reaches the windows made by then
 *   (`badgeThumbWindows` / `badgeThumbLooks`). An unseen mark that changes on a made window
 *   (`set isUnseen`) re-applies that thumb's look.
 *
 * `badgeCodes` stays the plain code list the catalogue's badge display page reads through
 * `HabboInventory.getAllMyBadgeIds`.
 */
import { isBadgeRarityStandaloneTier } from '@nitrodevco/nitro-api';
import { IInventoryBadge } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { InventoryUnseenSlice, isUnseenItem, UnseenItemCategory } from './InventoryUnseenSlice';

/** `BadgesModel.MAX_ACTIVE_BADGE_COUNT`. */
export const INVENTORY_MAX_ACTIVE_BADGES = 5;

/** `BadgesModel.BADGES_ALL` / `BADGES_INACTIVE` / `BADGES_ACTIVE` - what `getBadges` is filtered by. */
export const INVENTORY_BADGES_ALL = -1;
export const INVENTORY_BADGES_INACTIVE = 0;
export const INVENTORY_BADGES_ACTIVE = 1;

/** What `Badge.set isSelected` puts on its window: `BG_COLOR` by the mark, `outline` by the selection. */
export interface InventoryBadgeThumbLook {
    selected: boolean;
    unseen: boolean;
}

/** Flash `inventory/badges/Badge`, without the window it carries. */
export interface InventoryBadge {
    /** `Badge.badgeId` is the code; the numeric id is `badgeNumberId`. */
    code: string;
    badgeNumberId: number;
    ownerCount: number;
    rarityId: number;
    /** `Badge.isUnseen`: fixed when the badge is made, cleared by `resetUnseenItems`. */
    isUnseen: boolean;
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
    /** The badges whose thumb window has been made (`Badge.window`). */
    badgeThumbWindows: string[];
    /** The look `set isSelected` last put on a made thumb; none while it keeps the layout's. */
    badgeThumbLooks: Record<string, InventoryBadgeThumbLook>;
};

type Actions = {
    /** `BadgesModel.initBadges` with every fragment of a `BadgesMessage`, in order. */
    initBadges: (badges: IInventoryBadge[]) => void;
    /** `BadgesModel.updateBadge`: one badge added or updated, and worn or not as `wear` says. */
    updateBadge: (badge: IInventoryBadge, wear: boolean) => void;
    /** `BadgesModel.removeBadge`, taking it off first. */
    removeBadge: (code: string) => void;
    /** `BadgesModel.toggleBadgeWearing` - the caller sends the selection on afterwards. */
    toggleBadgeWearing: (code: string) => void;
    /** `BadgesModel.setBadgeSelected`; '' is `removeSelections`. */
    selectBadge: (code: string) => void;
    setBadgesRequested: () => void;
    /** `BadgesModel.resetUnseenItems`' own half: every badge's `isUnseen` goes false. */
    resetBadgesUnseen: () => void;
    /** `Badge.window`: the thumbs the grids have now made. */
    markBadgeThumbWindows: (codes: readonly string[]) => void;
};

export const InventoryBadgesSliceInitialState: State = {
    badges: [],
    badgeCodes: [],
    wornBadgeCodes: [],
    selectedBadgeCode: '',
    badgesRequested: false,
    badgeThumbWindows: [],
    badgeThumbLooks: {},
};

export type InventoryBadgesSlice = State & Actions;

const toBadge = (badge: IInventoryBadge, isUnseen: boolean): InventoryBadge => ({ code: badge.badgeCode, badgeNumberId: badge.badgeId, ownerCount: badge.ownerCount, rarityId: badge.badgeRarityId, isUnseen });

export const createInventoryBadgesSlice: StateCreator<InventoryBadgesSlice & InventoryUnseenSlice, [], [], InventoryBadgesSlice> = (set, get) => ({
    ...InventoryBadgesSliceInitialState,
    initBadges: (incoming) => {
        const { unseenItems } = get();
        const badges: InventoryBadge[] = [];
        const seen = new Set<string>();

        for (const badge of incoming) {
            if (seen.has(badge.badgeCode)) continue;

            seen.add(badge.badgeCode);

            const isUnseen = isUnseenItem(unseenItems, UnseenItemCategory.BADGE, badge.badgeId);

            if (isUnseen) badges.unshift(toBadge(badge, true));
            else badges.push(toBadge(badge, false));
        }

        // `resetBadges` clears the worn list and the selection with the badges themselves - and their windows.
        set({ badges, badgeCodes: badges.map(badge => badge.code), wornBadgeCodes: [], selectedBadgeCode: '', badgeThumbWindows: [], badgeThumbLooks: {} });
    },
    updateBadge: (incoming, wear) => set((x) => {
        const index = x.badges.findIndex(held => held.code === incoming.badgeCode);

        if (index !== -1) {
            const held = x.badges[index];
            // `Badge.updateMetadata`: the owner count and rarity. The numeric id is kept once known -
            // `HabboUserBadges` sends none - and the mark stays as it was.
            const badge: InventoryBadge = { ...held, ownerCount: incoming.ownerCount, rarityId: incoming.badgeRarityId, badgeNumberId: (held.badgeNumberId > 0) ? held.badgeNumberId : incoming.badgeId };
            const worn = x.wornBadgeCodes.includes(badge.code);
            // `isInUse != wear`: put on, or taken off, to match.
            const wornBadgeCodes = (worn === wear) ? x.wornBadgeCodes : (wear ? [ ...x.wornBadgeCodes, badge.code ] : x.wornBadgeCodes.filter(code => code !== badge.code));

            return { badges: x.badges.map((other, at) => ((at === index) ? badge : other)), wornBadgeCodes };
        }

        // A new badge asks the tracker, once, and goes on if the message says it is worn.
        const unseen = isUnseenItem(x.unseenItems, UnseenItemCategory.BADGE, incoming.badgeId);
        const badge = toBadge(incoming, unseen);
        const badges = unseen ? [ badge, ...x.badges ] : [ ...x.badges, badge ];

        return { badges, badgeCodes: badges.map(held => held.code), wornBadgeCodes: wear ? [ ...x.wornBadgeCodes, badge.code ] : x.wornBadgeCodes };
    }),
    removeBadge: code => set((x) => {
        if (!x.badges.some(badge => badge.code === code)) return x;

        const badges = x.badges.filter(badge => badge.code !== code);

        return {
            badges,
            badgeCodes: badges.map(badge => badge.code),
            wornBadgeCodes: x.wornBadgeCodes.filter(worn => worn !== code),
            selectedBadgeCode: (x.selectedBadgeCode === code) ? '' : x.selectedBadgeCode,
            badgeThumbWindows: x.badgeThumbWindows.filter(made => made !== code),
        };
    }),
    toggleBadgeWearing: code => set((x) => {
        if (!x.badges.some(badge => badge.code === code)) return x;

        if (x.wornBadgeCodes.includes(code)) return { wornBadgeCodes: x.wornBadgeCodes.filter(worn => worn !== code) };

        // `startWearingBadge` does nothing once five are on.
        if (x.wornBadgeCodes.length >= INVENTORY_MAX_ACTIVE_BADGES) return x;

        return { wornBadgeCodes: [ ...x.wornBadgeCodes, code ] };
    }),
    // `setBadgeSelected`: every badge's `isSelected`, which reaches only the thumbs already made.
    selectBadge: selectedBadgeCode => set(x => ({
        selectedBadgeCode,
        badgeThumbLooks: Object.fromEntries(x.badgeThumbWindows.map(code => [ code, { selected: code === selectedBadgeCode, unseen: !!x.badges.find(badge => badge.code === code)?.isUnseen } ])),
    })),
    setBadgesRequested: () => set({ badgesRequested: true }),
    resetBadgesUnseen: () => set((x) => {
        if (!x.badges.some(badge => badge.isUnseen)) return x;

        // `set isUnseen` on a changed mark re-applies that thumb's look, if it has been made.
        const badgeThumbLooks = { ...x.badgeThumbLooks };

        for (const badge of x.badges) {
            if (badge.isUnseen && x.badgeThumbWindows.includes(badge.code)) badgeThumbLooks[badge.code] = { selected: badge.code === x.selectedBadgeCode, unseen: false };
        }

        return { badges: x.badges.map(badge => (badge.isUnseen ? { ...badge, isUnseen: false } : badge)), badgeThumbLooks };
    }),
    markBadgeThumbWindows: codes => set((x) => {
        const made = codes.filter(code => !x.badgeThumbWindows.includes(code));

        return made.length ? { badgeThumbWindows: [ ...x.badgeThumbWindows, ...made ] } : x;
    }),
});

/** `BadgesModel.getBadges(filter)`. */
export const getInventoryBadges = (badges: readonly InventoryBadge[], wornBadgeCodes: readonly string[], filter: number): InventoryBadge[] => {
    if (filter === INVENTORY_BADGES_ALL) return [ ...badges ];

    if (filter === INVENTORY_BADGES_ACTIVE) return wornBadgeCodes.flatMap(code => badges.filter(badge => badge.code === code));

    return badges.filter(badge => !wornBadgeCodes.includes(badge.code));
};

/** `BadgeGridView.passFilter`'s badge kinds, as `filter.options` lists them. */
export const INVENTORY_BADGE_FILTER_ALL = 0;
export const INVENTORY_BADGE_FILTER_NORMAL = 1;
export const INVENTORY_BADGE_FILTER_ACHIEVEMENTS = 2;

/** `passFilter`: an achievement badge is one whose code carries this prefix. */
const ACHIEVEMENT_BADGE_PREFIX = 'ACH_';

/** `filter.rarity`'s two entries that are not a tier: everything, and the tiers folded into "common". */
export const INVENTORY_BADGE_RARITY_ALL = -1;
export const INVENTORY_BADGE_RARITY_COMMON = -2;

/** `BadgesModel.isStandaloneBadgeRarity`: a tier with a tag of its own rather than one shown as common. */
export const isInventoryBadgeRarityStandalone = (rarityId: number, uncommonEnabled: boolean): boolean => isBadgeRarityStandaloneTier(rarityId, uncommonEnabled);

/**
 * `BadgesModel.refreshAvailableRareBadgeRarityIds`: only the *standalone* tiers the owned badges
 * use get an entry of their own, ascending; every badge below that bar is counted into the one
 * "common" group instead, which is what `hasCommonGroup` reports.
 */
export const getInventoryBadgeRarityIds = (badges: readonly InventoryBadge[], uncommonEnabled: boolean): { rarityIds: number[]; hasCommonGroup: boolean } => {
    const rarityIds = new Set<number>();
    let hasCommonGroup = false;

    for (const badge of badges) {
        if (!isInventoryBadgeRarityStandalone(badge.rarityId, uncommonEnabled)) hasCommonGroup = true;
        else rarityIds.add(badge.rarityId);
    }

    return { rarityIds: [ ...rarityIds ].sort((a, b) => a - b), hasCommonGroup };
};

/**
 * `BadgeGridView.passFilter`: the kind menu, the rarity menu and the search box, all three of which
 * a badge has to pass. The rarity's "common" entry keeps exactly the badges no standalone tier
 * claims.
 */
export const passInventoryBadgeFilter = (badge: InventoryBadge, kind: number, rarityId: number, uncommonEnabled: boolean, text: string, name: string, description: string): boolean => {
    const isAchievement = badge.code.startsWith(ACHIEVEMENT_BADGE_PREFIX);

    if ((kind === INVENTORY_BADGE_FILTER_NORMAL) && isAchievement) return false;

    if ((kind === INVENTORY_BADGE_FILTER_ACHIEVEMENTS) && !isAchievement) return false;

    if (rarityId === INVENTORY_BADGE_RARITY_COMMON) {
        if (isInventoryBadgeRarityStandalone(badge.rarityId, uncommonEnabled)) return false;
    } else if ((rarityId !== INVENTORY_BADGE_RARITY_ALL) && (badge.rarityId !== rarityId)) {
        return false;
    }

    if (!text) return true;

    const needle = text.toLowerCase();

    return name.toLowerCase().includes(needle) || description.toLowerCase().includes(needle);
};

/** `BadgesView.isBadgeRarityFilterEnabled`: the rarity menu only does anything past two entries. */
export const isInventoryBadgeRarityFilterEnabled = (rarityIds: readonly number[]): boolean => rarityIds.length > 2;
