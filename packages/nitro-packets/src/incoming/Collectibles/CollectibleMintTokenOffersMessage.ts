// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IMintTokenOffer, MintTokenOfferParser } from '../Data/MintTokenOfferParser';

/**
 * Flash `CollectibleMintTokenOffersMessageEvent`: the mint token packs the user may buy with silver
 * (`MintInventoryListTab.onMintTokenOffersMessage`).
 */
export type CollectibleMintTokenOffersMessageType = {
    tokenOffers: IMintTokenOffer[];
};

export class CollectibleMintTokenOffersMessage implements IIncomingPacket<CollectibleMintTokenOffersMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectibleMintTokenOffersMessageType {
        return { tokenOffers: ParseArray(wrapper, MintTokenOfferParser) };
    }
}
