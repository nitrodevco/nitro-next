// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { INftStoreOffer, NftStoreOfferParser } from '../Data/NftStoreOfferParser';

/**
 * Flash `NftStoreOffersMessageEvent`: the collectibles shop's offers (`ShopTab.onNftStoreOffers`).
 */
export type NftStoreOffersMessageType = {
    nftStoreOffers: INftStoreOffer[];
};

export class NftStoreOffersMessage implements IIncomingPacket<NftStoreOffersMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftStoreOffersMessageType {
        return { nftStoreOffers: ParseArray(wrapper, NftStoreOfferParser) };
    }
}
