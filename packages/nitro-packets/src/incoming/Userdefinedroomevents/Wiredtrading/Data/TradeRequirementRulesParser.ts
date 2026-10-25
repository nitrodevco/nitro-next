// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITradeRequirementRules } from './ITradeRequirementRules';
import { TradeRequirementRulesDefinitionParser } from './TradeRequirementRulesDefinitionParser';
import { TradeRequirementRulesType } from './TradeRequirementRulesType';

/** Flash `TradeRequirementRules`: one more int follows for the two multiplying types, and it means something else in each. */
export const TradeRequirementRulesParser = (wrapper: IMessageDataWrapper): ITradeRequirementRules => {
    const definition = TradeRequirementRulesDefinitionParser(wrapper);
    const type: TradeRequirementRulesType = wrapper.readInt();
    let multiplier = 1;
    let autoMultiplierMax = 1;

    if (type === TradeRequirementRulesType.Multiplier) multiplier = wrapper.readInt();
    else if (type === TradeRequirementRulesType.AutoMultiplier) autoMultiplierMax = wrapper.readInt();

    return { definition, type, multiplier, autoMultiplierMax };
};
