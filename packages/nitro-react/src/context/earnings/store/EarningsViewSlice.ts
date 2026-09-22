/**
 * The state of Flash's `catalog/earnings/EarningsView` window (`vault_view.xml`) - what it writes
 * into its own elements: each category's credit, ducket and product captions, which of the claim
 * buttons are disabled (`setElementEnabled`), and whether the wired chest row has been shown.
 *
 * Flash builds a new `EarningsView` every time the vault opens, from a layout whose captions read
 * `0`, whose buttons are enabled and whose `wiredchest_container` is hidden; `resetView` is that
 * fresh window, and `EarningsController.showEarnings` calls it when it builds one.
 *
 * The category of a reward is its index in `_rewardCategories`. Two of them (`tutorial`,
 * `roombundlesales`) have no row in the layout: their values are kept, as Flash's
 * `findChildByName` simply found nothing to write to, and they count towards nothing.
 */
import type { IIncomeRewardStatusData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `EarningsView._rewardCategories` - a reward's `rewardCategory` is its index here. */
export const EARNINGS_REWARD_CATEGORIES = [
    'tutorial', 'dailygift', 'achievements', 'marketplace', 'habboclub', 'levelprogression', 'roombundlesales', 'bonusbag', 'donation', 'surprise', 'snowstorm', 'games', 'wiredchest', 'agency',
] as const;

export type EarningsRewardCategoryName = typeof EARNINGS_REWARD_CATEGORIES[number];

/** `EarningsView.ALL_CATEGORIES`: `claim_all_btn`'s category, answered with the same value. */
export const EARNINGS_ALL_CATEGORIES = -1;

/** `IncomeReward.rewardType` values `onIncomeRewardDataReceived` sums. */
export const EARNINGS_REWARD_TYPE_DUCKETS = 0;
export const EARNINGS_REWARD_TYPE_CREDITS = 1;

/** `claim_all_btn` - the one element `setElementEnabled` names that is not a category's claim button. */
export const EARNINGS_CLAIM_ALL_BUTTON = 'claim_all_btn';

/** The categories `vault_view.xml` has a row for - the ones whose `<name>DucketValue` `findChildByName` finds. */
const LAYOUT_CATEGORIES: ReadonlySet<EarningsRewardCategoryName> = new Set([
    'dailygift', 'games', 'wiredchest', 'achievements', 'marketplace', 'habboclub', 'levelprogression', 'donation', 'bonusbag', 'surprise', 'snowstorm', 'agency',
]);

/** A category's claim button: `<name>_claim_button`. */
export const earningsClaimButtonName = (category: EarningsRewardCategoryName) => `${category}_claim_button`;

/** The captions of one category's `<name>CreditValue`, `<name>DucketValue` and `<name>ProductValue`. */
export interface EarningsCategoryValues {
    credits: number;
    duckets: number;
    products: number;
}

type State = {
    /** Keyed by the category's index; a category never written reads `0` everywhere, as the layout's captions do. */
    values: Record<number, EarningsCategoryValues>;
    /** The elements `setElementEnabled` has disabled, by name; everything else is enabled, as the layout builds it. */
    disabledElements: Record<string, boolean>;
    /** `wiredchest_container.visible`: hidden until the wired chests have something to claim. */
    wiredChestVisible: boolean;
};

type Actions = {
    /** A new `EarningsView`: every caption `0`, every button enabled, the wired chest row hidden. */
    resetView: () => void;
    /** `setElementEnabled`. */
    setElementEnabled: (name: string, enabled: boolean) => void;
    /** `onIncomeRewardDataReceived`. */
    applyIncomeRewardData: (data: IIncomeRewardStatusData[]) => void;
    /** `onIncomeRewardClaimResponse`. */
    applyIncomeRewardClaimResponse: (rewardCategory: number, result: boolean) => void;
};

export const EarningsViewSliceInitialState: State = {
    values: {},
    disabledElements: {},
    wiredChestVisible: false,
};

export type EarningsViewSlice = State & Actions;

const NO_VALUES: EarningsCategoryValues = { credits: 0, duckets: 0, products: 0 };

/** The values a category shows. */
export const earningsCategoryValues = (values: Record<number, EarningsCategoryValues>, category: number): EarningsCategoryValues => values[category] ?? NO_VALUES;

/**
 * `ducketValueForCategory`: the duckets a claim of this category would add - `int` of its
 * `DucketValue` caption, `0` for a category without a row, and for `ALL_CATEGORIES` the sum over
 * every category (`getTotalDucketsToClaim`).
 */
export const earningsDucketValueForCategory = (values: Record<number, EarningsCategoryValues>, category: number): number => {
    if (category === EARNINGS_ALL_CATEGORIES) {
        let total = 0;

        for (let index = 0; index < EARNINGS_REWARD_CATEGORIES.length; index++) total += earningsDucketValueForCategory(values, index);

        return total;
    }

    const name = EARNINGS_REWARD_CATEGORIES[category];

    if ((name === undefined) || !LAYOUT_CATEGORIES.has(name)) return 0;

    return earningsCategoryValues(values, category).duckets;
};

/**
 * `updateRewardsForCategory(category, credits, duckets, products = 0)`: the product caption is only
 * written when there are products, so a claim that zeroes the category leaves it as it was.
 */
const updateRewardsForCategory = (values: Record<number, EarningsCategoryValues>, category: number, credits: number, duckets: number, products = 0) => {
    const current = earningsCategoryValues(values, category);

    values[category] = { credits, duckets, products: (products > 0) ? products : current.products };
};

export const createEarningsViewSlice: StateCreator<EarningsViewSlice, [], [], EarningsViewSlice> = set => ({
    ...EarningsViewSliceInitialState,
    resetView: () => set(structuredClone(EarningsViewSliceInitialState)),
    setElementEnabled: (name, enabled) => set(x => ({ disabledElements: { ...x.disabledElements, [name]: !enabled } })),
    applyIncomeRewardData: data => set((x) => {
        const values = { ...x.values };
        const disabledElements = { ...x.disabledElements };
        let wiredChestVisible = x.wiredChestVisible;
        const withRewards = new Set<string>();

        // `getDistinctRewardCategories`, in the order they first appear.
        const categories = [ ...new Set(data.map(reward => reward.rewardCategory)) ];

        for (const category of categories) {
            let duckets = 0;
            let credits = 0;
            let products = 0;

            for (const reward of data) {
                if (reward.rewardCategory !== category) continue;

                if (reward.rewardType === EARNINGS_REWARD_TYPE_DUCKETS) duckets += reward.amount;
                if (reward.rewardType === EARNINGS_REWARD_TYPE_CREDITS) credits += reward.amount;
                if (reward.productCode) products++;
            }

            updateRewardsForCategory(values, category, credits, duckets, products);

            const name = EARNINGS_REWARD_CATEGORIES[category];

            if ((name !== undefined) && ((credits > 0) || (duckets > 0) || (products > 0))) withRewards.add(name);
        }

        let anyRewards = false;

        for (const name of EARNINGS_REWARD_CATEGORIES) {
            const hasRewards = withRewards.has(name);

            if (hasRewards) anyRewards = true;

            if (hasRewards && (name === 'wiredchest')) wiredChestVisible = true;

            disabledElements[earningsClaimButtonName(name)] = !hasRewards;
        }

        disabledElements[EARNINGS_CLAIM_ALL_BUTTON] = !anyRewards;

        return { values, disabledElements, wiredChestVisible };
    }),
    applyIncomeRewardClaimResponse: (rewardCategory, result) => set((x) => {
        if (result) {
            const values = { ...x.values };

            if (rewardCategory === EARNINGS_ALL_CATEGORIES) {
                const disabledElements = { ...x.disabledElements };

                EARNINGS_REWARD_CATEGORIES.forEach((name, index) => {
                    updateRewardsForCategory(values, index, 0, 0);

                    disabledElements[earningsClaimButtonName(name)] = true;
                });

                return { values, disabledElements };
            }

            updateRewardsForCategory(values, rewardCategory, 0, 0);

            return { values };
        }

        // A failed claim gives its button back.
        if (rewardCategory !== EARNINGS_ALL_CATEGORIES) {
            const name = EARNINGS_REWARD_CATEGORIES[rewardCategory];

            if (name === undefined) return x;

            return { disabledElements: { ...x.disabledElements, [earningsClaimButtonName(name)]: false } };
        }

        return { disabledElements: { ...x.disabledElements, [EARNINGS_CLAIM_ALL_BUTTON]: false } };
    }),
});
