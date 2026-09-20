// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITradingItemList } from '../../../Data/ITradingItemList';
import { TradingItemListParser } from '../../../Data/TradingItemListParser';

export type WiredTradeItemsUpdateMessageType = {
    /** The same block a user-to-user trade sends; the second user is the wired box and its side stays empty. */
    tradingItems: ITradingItemList;
    /** Whether what has been offered meets the requirement. */
    canAccept: boolean;
    /** How many times the offer covers the rule, for the two multiplying `TradeRequirementRulesType`s. */
    extra: number;
};

/** Flash `WiredTradeItemsUpdateMessageParser`: a `TradingItemListParser`, then the two wired fields. */
export class WiredTradeItemsUpdateMessage implements IIncomingPacket<WiredTradeItemsUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTradeItemsUpdateMessageType {
        const tradingItems = TradingItemListParser(wrapper);
        const canAccept = wrapper.readBoolean();
        const extra = wrapper.readInt();

        return { tradingItems, canAccept, extra };
    }
}
