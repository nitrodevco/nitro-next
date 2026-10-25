// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ITradeRequirementRule } from './ITradeRequirementRule';

/**
 * Flash `TradeRequirementRulesDefinition`: the alternatives the user may give, and what comes back.
 * Either half is absent when its flag on the wire is false - Flash keeps `null` there, and
 * `TradeRequirement.isPaymentOnly` tells a payment from a trade by `youGetRule` being absent or empty.
 */
export interface ITradeRequirementRulesDefinition {
    youGiveRule?: ITradeRequirementRule[];
    youGetRule?: ITradeRequirementRule;
}
