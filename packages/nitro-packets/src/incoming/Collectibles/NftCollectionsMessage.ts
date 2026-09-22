// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { INftCollection, NftCollectionParser } from '../Data/NftCollectionParser';

/**
 * Flash `NftCollectionsMessageEvent` (parser `§_-Vw§`): the collection sets of the wallet asked for
 * (`CollectionsTab.onNftCollectionsMessage`).
 */
export type NftCollectionsMessageType = {
    nftCollections: INftCollection[];
};

export class NftCollectionsMessage implements IIncomingPacket<NftCollectionsMessageType> {
    public parse(wrapper: IMessageDataWrapper): NftCollectionsMessageType {
        return { nftCollections: ParseArray(wrapper, NftCollectionParser) };
    }
}
