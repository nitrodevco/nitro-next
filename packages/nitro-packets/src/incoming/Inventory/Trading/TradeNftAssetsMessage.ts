// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ITradeNftAsset, TradeNftAssetParser } from './Data/TradeNftAssetParser';

export type TradeNftAssetsMessageType = {
    /** The NFTs the session's own user has put in - Flash names the sides "my" and "their", not by id. */
    myItems: ITradeNftAsset[];
    theirItems: ITradeNftAsset[];
};

/** Flash `TradeNftAssetsMessageParser`: the NFT half of a trade's offers, sent whenever either side changes it. */
export class TradeNftAssetsMessage implements IIncomingPacket<TradeNftAssetsMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradeNftAssetsMessageType {
        const myItems = ParseArray(wrapper, TradeNftAssetParser);
        const theirItems = ParseArray(wrapper, TradeNftAssetParser);

        return { myItems, theirItems };
    }
}
