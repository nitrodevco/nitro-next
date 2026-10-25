// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/**
 * Flash `wiredtrading.trade.requirements.rules._-GD`, named by how `WiredTradeRequirementsView`
 * reads it (the packet tool calls this `WiredTradeInitiateEnum`).
 */
export enum TradeRequirementRulesType {
    /** `_-h1F`: the rule is met once. */
    Single = 0,
    /** `_-hx`: the rule has to be met `multiplier` times. */
    Multiplier = 1,
    /** `_-Jq`: the rule is applied as often as the offer covers it, up to `autoMultiplierMax` times. */
    AutoMultiplier = 2,
}
