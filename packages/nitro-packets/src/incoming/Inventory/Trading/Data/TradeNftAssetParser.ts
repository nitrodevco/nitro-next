// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ReadLong } from '@nitrodevco/nitro-api';

import { CollectibleBaseItemParser, ICollectibleBaseItem } from '../../../Data/CollectibleBaseItemParser';

/**
 * Flash `TradeNftItem`: a `CollectibleBaseItem` with the wallet asset id in front of it - one NFT
 * as a trade names it, in the inventory the trade offers from and in either side's offer.
 *
 * The id is a long, so it is read through `ReadLong` rather than as an int.
 */
export interface ITradeNftAsset extends ICollectibleBaseItem {
    assetId: number;
}

export const TradeNftAssetParser = (wrapper: IMessageDataWrapper): ITradeNftAsset => {
    const assetId = ReadLong(wrapper);

    return { assetId, ...CollectibleBaseItemParser(wrapper) };
};
