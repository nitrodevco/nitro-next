// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IChestItemType } from '@nitrodevco/nitro-api';

import { TradeRequirementNodeType } from './TradeRequirementNodeType';

/** Flash `TradeRequirementNode`: an amount of coins, or an amount of one furni type. */
export interface ITradeRequirementNode {
    type: TradeRequirementNodeType;
    amount: number;
    /** Only on a `TradeRequirementNodeType.Furni` node. */
    itemType?: IChestItemType;
}
