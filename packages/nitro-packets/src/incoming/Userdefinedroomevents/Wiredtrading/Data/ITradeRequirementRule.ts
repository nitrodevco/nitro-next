// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ITradeRequirementNode } from './ITradeRequirementNode';

/** Flash `TradeRequirementRule`: everything one side of a rule is made of. */
export interface ITradeRequirementRule {
    nodes: ITradeRequirementNode[];
}
