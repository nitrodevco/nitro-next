// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ChestItemTypeParser } from '../Chests/Data/ChestItemTypeParser';
import { ITradeRequirementNode } from './ITradeRequirementNode';
import { TradeRequirementNodeType } from './TradeRequirementNodeType';

/** Flash `TradeRequirementNode.readFromMessage`: the type is a byte, and the item type only follows a furni node. */
export const TradeRequirementNodeParser = (wrapper: IMessageDataWrapper): ITradeRequirementNode => {
    const type: TradeRequirementNodeType = wrapper.readByte();
    const amount = wrapper.readInt();
    const itemType = (type === TradeRequirementNodeType.Furni) ? ChestItemTypeParser(wrapper) : undefined;

    return { type, amount, itemType };
};
