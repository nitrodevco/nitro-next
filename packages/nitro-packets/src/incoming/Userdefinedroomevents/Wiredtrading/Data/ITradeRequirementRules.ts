// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ITradeRequirementRulesDefinition } from './ITradeRequirementRulesDefinition';
import { TradeRequirementRulesType } from './TradeRequirementRulesType';

/** Flash `TradeRequirementRules`. Flash exposes the two halves of the definition directly; they are under `definition` here. */
export interface ITradeRequirementRules {
    definition: ITradeRequirementRulesDefinition;
    type: TradeRequirementRulesType;
    /** Sent with `TradeRequirementRulesType.Multiplier`; 1 otherwise. */
    multiplier: number;
    /** Sent with `TradeRequirementRulesType.AutoMultiplier`; 1 otherwise. */
    autoMultiplierMax: number;
}
