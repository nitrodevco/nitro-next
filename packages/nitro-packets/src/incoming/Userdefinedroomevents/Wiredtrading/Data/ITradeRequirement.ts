// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ITradeRequirementRules } from './ITradeRequirementRules';
import { TradeRequirementType } from './TradeRequirementType';

/** Flash `TradeRequirement`: what a wired trade asks of the user. */
export interface ITradeRequirement {
    type: TradeRequirementType;
    youGetText: string;
    /** The skin of the trade window: `generic` or `games` (`PaymentContract.LAYOUT_TYPES`). */
    layoutType: string;
    /** Only with `TradeRequirementType.Rules`. */
    rules?: ITradeRequirementRules;
}
