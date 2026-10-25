// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { CollectiblesProductItemParser, ICollectiblesProductItem } from '../Data/CollectiblesProductItemParser';

/**
 * Flash `CollectableMintableItemTypesMessageEvent` (parser `§_-b1Z§`): the furni types the user may
 * mint (`MintInventoryListTab.onCollectableMintableItemTypesMessage`).
 */
export type CollectableMintableItemTypesMessageType = {
    collectibleProductItems: ICollectiblesProductItem[];
};

export class CollectableMintableItemTypesMessage implements IIncomingPacket<CollectableMintableItemTypesMessageType> {
    public parse(wrapper: IMessageDataWrapper): CollectableMintableItemTypesMessageType {
        return { collectibleProductItems: ParseArray(wrapper, CollectiblesProductItemParser) };
    }
}
