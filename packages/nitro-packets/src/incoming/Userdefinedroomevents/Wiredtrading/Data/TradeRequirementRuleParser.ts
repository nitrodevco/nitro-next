// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ITradeRequirementRule } from './ITradeRequirementRule';
import { TradeRequirementNodeParser } from './TradeRequirementNodeParser';

/** Flash `TradeRequirementRule.readFromMessage`. */
export const TradeRequirementRuleParser = (wrapper: IMessageDataWrapper): ITradeRequirementRule => {
    return {
        nodes: ParseArray(wrapper, TradeRequirementNodeParser),
    };
};
