// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ITradeNftAsset, TradeNftAssetParser } from './Data/TradeNftAssetParser';

export type TradeNftAssetInventoryMessageType = {
    /** Every NFT of the wallet that may go into a trade - the collectibles page's grid. */
    items: ITradeNftAsset[];
};

/** The answer to `GetNftTradeInventoryComposer`, which the collectibles page asks for when it opens. */
export class TradeNftAssetInventoryMessage implements IIncomingPacket<TradeNftAssetInventoryMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradeNftAssetInventoryMessageType {
        return { items: ParseArray(wrapper, TradeNftAssetParser) };
    }
}
