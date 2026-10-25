import { IBundleDiscountRuleset, IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

export const BundleDiscountRulesetParser = (wrapper: IMessageDataWrapper): IBundleDiscountRuleset => {
    return {
        maxPurchaseSize: wrapper.readInt(),
        bundleSize: wrapper.readInt(),
        bundleDiscountSize: wrapper.readInt(),
        bonusThreshold: wrapper.readInt(),
        additionalBonusDiscountThresholdQuantities: ParseInts(wrapper),
    };
};
