/**
 * The habbicon hub's constant classes - Flash `catalog/habbicons/HabbiconState`,
 * `HabbiconTabMode` and `HabbiconPopupMode` (with its `resolve`).
 *
 * `HabbiconState` is the state the server gives a habbicon (`§_-lg§.state`, `§_-tK§.habbiconState`,
 * a set's `§_-P1X§` reward state). Two of its members are obfuscated in the client:
 * `§_-I4§` (0) is a habbicon the user does not have - the only state a price makes buyable - and
 * `§_-01t§` (3) a favourite, which counts as owned. `§_-N1p§` (4) and `REWARD` (5) are read by no
 * client class.
 */
export const HabbiconState = {
    /** `§_-I4§`. */
    NOT_OWNED: 0,
    CLAIMABLE: 1,
    OWNED: 2,
    /** `§_-01t§`. */
    FAVORITE: 3,
    /** `§_-N1p§`. */
    STATE_4: 4,
    REWARD: 5,
} as const;

/** `HabbiconTabMode`: the hub's three tabs. */
export const HabbiconTabMode = {
    ALL_SETS: 'all_sets',
    OWNED: 'owned',
    FAVOURITED: 'favourited',
} as const;

export type HabbiconTabModeName = typeof HabbiconTabMode[keyof typeof HabbiconTabMode];

/** `HabbiconPopupMode`: what the item popup offers for the habbicon it is open on. */
export const HabbiconPopupMode = {
    CLAIM: 'claim',
    PURCHASE: 'purchase',
    ADD_FAVORITE: 'add_favorite',
    REMOVE_FAVORITE: 'remove_favorite',
    INFO: 'info',
} as const;

export type HabbiconPopupModeName = typeof HabbiconPopupMode[keyof typeof HabbiconPopupMode];

/** The flags `HabbiconPopupMode.resolve` reads off a `HabbiconEntryModel`. */
export interface HabbiconPopupModeSource {
    favorite: boolean;
    owned: boolean;
    claimable: boolean;
    isReward: boolean;
    purchasable: boolean;
}

/** `HabbiconPopupMode.resolve`: a favourite can be unfavourited, an owned one favourited, a claimable one claimed; a reward or an unpriced habbicon only shows its state. */
export const resolveHabbiconPopupMode = (entry: HabbiconPopupModeSource | undefined): HabbiconPopupModeName => {
    if (!entry) return HabbiconPopupMode.PURCHASE;
    if (entry.favorite) return HabbiconPopupMode.REMOVE_FAVORITE;
    if (entry.owned) return HabbiconPopupMode.ADD_FAVORITE;
    if (entry.claimable) return HabbiconPopupMode.CLAIM;
    if (entry.isReward || !entry.purchasable) return HabbiconPopupMode.INFO;

    return HabbiconPopupMode.PURCHASE;
};
