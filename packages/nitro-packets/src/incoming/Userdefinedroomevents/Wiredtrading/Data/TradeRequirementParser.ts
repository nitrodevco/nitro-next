// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITradeRequirement } from './ITradeRequirement';
import { TradeRequirementRulesParser } from './TradeRequirementRulesParser';
import { TradeRequirementType } from './TradeRequirementType';

/** Flash `TradeRequirement`. */
export const TradeRequirementParser = (wrapper: IMessageDataWrapper): ITradeRequirement => {
    const type: TradeRequirementType = wrapper.readInt();
    const youGetText = wrapper.readString();
    const layoutType = wrapper.readString();
    const rules = (type === TradeRequirementType.Rules) ? TradeRequirementRulesParser(wrapper) : undefined;

    return { type, youGetText, layoutType, rules };
};
