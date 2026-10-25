/**
 * The bundle discount arithmetic of `HabboCatalogUtils` - `calculateBundlePrice`,
 * `getDiscountItemsCount` (with its three parts) and `resolveBundleDiscountFlatPriceSteps` - as
 * pure functions of the ruleset `BundleDiscountRulesetMessage` brought
 * (`CatalogBundleDiscountSlice`).
 *
 * In this client revision `calculateBundlePrice` is the price times the quantity whatever the
 * ruleset says, so a flat price step never occurs (`resolveBundleDiscountFlatPriceSteps` finds
 * none) and what the ruleset changes on screen is the spinner's bonus items line
 * (`getDiscountItemsCount`) and the spinner's maximum (`maxPurchaseSize`).
 */
import { IBundleDiscountRuleset } from '@nitrodevco/nitro-api';

/** `HabboCatalogUtils.calculateBundlePrice(bundlePurchaseAllowed, price, quantity)`: `price * quantity`, the flag unread. */
export const calculateBundlePrice = (_bundlePurchaseAllowed: boolean, price: number, quantity: number): number => (price * quantity);

/** `getBasicBundleDiscountSize`: one `bundleDiscountSize` per whole bundle bought. */
const getBasicBundleDiscountSize = (ruleset: IBundleDiscountRuleset | undefined, quantity: number): number => {
    if (!ruleset || (ruleset.bundleSize <= 0)) return 0;

    return Math.trunc(quantity / ruleset.bundleSize) * ruleset.bundleDiscountSize;
};

/** `getBonusBundleDiscountSize`: from `bonusThreshold` bundles up, one more per bundle, and one for a bundle a single item short. */
const getBonusBundleDiscountSize = (ruleset: IBundleDiscountRuleset | undefined, quantity: number): number => {
    if (!ruleset || (ruleset.bundleSize <= 0)) return 0;

    const bundles = Math.trunc(quantity / ruleset.bundleSize);

    let bonus = 0;

    if (bundles >= ruleset.bonusThreshold) {
        if ((quantity % ruleset.bundleSize) === (ruleset.bundleSize - 1)) bonus++;

        bonus += (bundles - ruleset.bonusThreshold);
    }

    return bonus;
};

/** `getThresholdBundleDiscountSize`: one for every additional threshold the quantity reaches. */
const getThresholdBundleDiscountSize = (ruleset: IBundleDiscountRuleset | undefined, quantity: number): number => {
    if (!ruleset) return 0;

    let count = 0;

    for (const threshold of ruleset.additionalBonusDiscountThresholdQuantities) {
        if (quantity >= threshold) count++;
    }

    return count;
};

/** `HabboCatalogUtils.getDiscountItemsCount`: the free items `quantity` earns under the ruleset. */
export const getDiscountItemsCount = (ruleset: IBundleDiscountRuleset | undefined, quantity: number): number => (getBasicBundleDiscountSize(ruleset, quantity) + getBonusBundleDiscountSize(ruleset, quantity) + getThresholdBundleDiscountSize(ruleset, quantity));

/** What `resolveBundleDiscountFlatPriceSteps` computes. */
export interface BundleDiscountFlatPriceSteps {
    /** `bundleDiscountFlatPriceSteps`: the quantities whose next item costs nothing more - the spinner skips them. */
    readonly steps: number[];
    /** `bundleDiscountHighestFlatPriceStep`. */
    readonly highest: number;
}

/** `HabboCatalogUtils.resolveBundleDiscountFlatPriceSteps`: every quantity below 99 whose next one costs the same. */
export const resolveBundleDiscountFlatPriceSteps = (): BundleDiscountFlatPriceSteps => {
    const steps: number[] = [];

    let highest = 0;

    for (let quantity = 0; quantity < 99; quantity++) {
        if (calculateBundlePrice(true, 1, quantity) === calculateBundlePrice(true, 1, quantity + 1)) {
            steps.push(quantity);
            highest = quantity;
        }
    }

    return { steps, highest };
};
