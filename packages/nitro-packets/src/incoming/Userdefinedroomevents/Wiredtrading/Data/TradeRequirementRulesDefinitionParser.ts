// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ITradeRequirementRulesDefinition } from './ITradeRequirementRulesDefinition';
import { TradeRequirementRuleParser } from './TradeRequirementRuleParser';

/** Flash `TradeRequirementRulesDefinition.readFromMessage`: each half sits behind its own flag. */
export const TradeRequirementRulesDefinitionParser = (wrapper: IMessageDataWrapper): ITradeRequirementRulesDefinition => {
    const youGiveRule = wrapper.readBoolean() ? ParseArray(wrapper, TradeRequirementRuleParser) : undefined;
    const youGetRule = wrapper.readBoolean() ? TradeRequirementRuleParser(wrapper) : undefined;

    return { youGiveRule, youGetRule };
};
