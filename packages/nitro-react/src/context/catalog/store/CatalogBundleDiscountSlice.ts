/**
 * The bundle discount ruleset - `HabboCatalog._bundleDiscountRuleset`, which `init()` asks for with
 * `GetBundleDiscountRulesetComposer` (`initBundleDiscounts`) and `onBundleDiscountRulesetMessageEvent`
 * stores before `HabboCatalogUtils.resolveBundleDiscountFlatPriceSteps` runs.
 *
 * The product view reads it to reset the spinner (the flat price steps it skips, and its maximum -
 * `setSpinnerToBundleRuleset`), and the spinner to count the bonus items (`getDiscountItemsCount`).
 * `HabboCatalog.reset` leaves the ruleset alone and asks again on the next `init()`, so it is not
 * part of `resetCatalog`.
 */
import { IBundleDiscountRuleset } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

import { resolveBundleDiscountFlatPriceSteps } from '#base/utils';

type State = {
    /** `bundleDiscountRuleset`: `undefined` until the server answers. */
    bundleDiscountRuleset: IBundleDiscountRuleset | undefined;
    /** `HabboCatalogUtils.bundleDiscountFlatPriceSteps`. */
    bundleDiscountFlatPriceSteps: readonly number[];
    /** `HabboCatalogUtils.bundleDiscountHighestFlatPriceStep`. */
    bundleDiscountHighestFlatPriceStep: number;
};

type Actions = {
    /** `onBundleDiscountRulesetMessageEvent`. */
    setBundleDiscountRuleset: (ruleset: IBundleDiscountRuleset) => void;
};

export const CatalogBundleDiscountSliceInitialState: State = {
    bundleDiscountRuleset: undefined,
    bundleDiscountFlatPriceSteps: [],
    bundleDiscountHighestFlatPriceStep: 0,
};

export type CatalogBundleDiscountSlice = State & Actions;

export const createCatalogBundleDiscountSlice: StateCreator<CatalogBundleDiscountSlice, [], [], CatalogBundleDiscountSlice> = set => ({
    ...CatalogBundleDiscountSliceInitialState,
    setBundleDiscountRuleset: (ruleset) => {
        const { steps, highest } = resolveBundleDiscountFlatPriceSteps();

        set({ bundleDiscountRuleset: ruleset, bundleDiscountFlatPriceSteps: steps, bundleDiscountHighestFlatPriceStep: highest });
    },
});
