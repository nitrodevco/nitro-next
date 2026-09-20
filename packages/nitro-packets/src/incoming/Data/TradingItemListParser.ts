// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ITradingItemList } from './ITradingItemList';
import { TradingItemListDataParser } from './TradingItemListDataParser';

/**
 * Flash `TradingItemListParser.parse`, shared by `TradingItemListEventMessage` and
 * `WiredTradeItemsUpdateMessage` (the packet tool repeats the body in both, the second time as
 * `WiredTradeItemsUpdateTradingItemParser`).
 */
export const TradingItemListParser = (wrapper: IMessageDataWrapper): ITradingItemList => {
    const firstUserID = wrapper.readInt();
    const firstUserItemArray = ParseArray(wrapper, TradingItemListDataParser);
    const firstUserNumItems = wrapper.readInt();
    const firstUserNumCredits = wrapper.readInt();
    const secondUserID = wrapper.readInt();
    const secondUserItemArray = ParseArray(wrapper, TradingItemListDataParser);
    const secondUserNumItems = wrapper.readInt();
    const secondUserNumCredits = wrapper.readInt();

    return { firstUserID, firstUserItemArray, firstUserNumItems, firstUserNumCredits, secondUserID, secondUserItemArray, secondUserNumItems, secondUserNumCredits };
};
