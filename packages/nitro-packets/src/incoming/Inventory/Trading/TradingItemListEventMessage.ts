// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITradingItemList } from '../../Data/ITradingItemList';
import { TradingItemListParser } from '../../Data/TradingItemListParser';

export type TradingItemListEventMessageType = ITradingItemList;

/** Flash `TradingItemListParser`. Filled in because `WiredTradeItemsUpdateMessage` starts with the same block. */
export class TradingItemListEventMessage implements IIncomingPacket<TradingItemListEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingItemListEventMessageType {
        return TradingItemListParser(wrapper);
    }
}
