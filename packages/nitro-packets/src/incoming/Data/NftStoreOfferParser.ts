// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CollectibleBaseItemParser, ICollectibleBaseItem } from './CollectibleBaseItemParser';

/**
 * Flash `parser/collectibles/NftStoreOffer`: an offer of the collectibles shop - its product code,
 * its price in emeralds, whether it is featured or limited, how many may be minted (-1 for no
 * limit) and have been, and the collectible it sells.
 */
export interface INftStoreOffer {
    productCode: string;
    emeraldPrice: number;
    isFeatured: boolean;
    isLimited: boolean;
    mintLimit: number;
    mintedCount: number;
    productInfo: ICollectibleBaseItem;
}

export const NftStoreOfferParser = (wrapper: IMessageDataWrapper): INftStoreOffer => ({
    productCode: wrapper.readString(),
    emeraldPrice: wrapper.readInt(),
    isFeatured: wrapper.readBoolean(),
    isLimited: wrapper.readBoolean(),
    mintLimit: wrapper.readInt(),
    mintedCount: wrapper.readInt(),
    productInfo: CollectibleBaseItemParser(wrapper),
});
