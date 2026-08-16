import { IBundleDiscountRuleset, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BundleDiscountRulesetParser } from './Data/BundleDiscountRulesetParser';

export type BundleDiscountRulesetMessageType = {
    bundleDiscountRuleset: IBundleDiscountRuleset;
};

export class BundleDiscountRulesetMessage implements IIncomingPacket<BundleDiscountRulesetMessageType> {
    public parse(wrapper: IMessageDataWrapper): BundleDiscountRulesetMessageType {
        return {
            bundleDiscountRuleset: BundleDiscountRulesetParser(wrapper)
        }
    }
}
