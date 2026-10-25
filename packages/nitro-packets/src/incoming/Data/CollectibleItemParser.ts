// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

import { ICollectibleBaseItem } from './CollectibleBaseItemParser';

/**
 * Flash `parser/collectibles/CollectibleItem`: a `CollectibleBaseItem` whose
 * `readAdditionalParams` reads how many of it the wallet holds - after the score, before the pet
 * figure. Spelled out rather than calling `CollectibleBaseItemParser` with a hook, so the reads
 * stand in the order they happen on the wire.
 */
export interface ICollectibleItem extends ICollectibleBaseItem {
    amount: number;
}

export const CollectibleItemParser = (wrapper: IMessageDataWrapper): ICollectibleItem => {
    const productTypeId = wrapper.readShort();
    const itemTypeId = wrapper.readString();
    const score = wrapper.readInt();
    const amount = wrapper.readInt();
    const petFigureString = wrapper.readString();
    const figureSetIds = ParseInts(wrapper);
    const productCode = wrapper.readString();
    const rarity = wrapper.readString();

    return { productTypeId, itemTypeId, score, amount, petFigureString, figureSetIds, productCode, rarity };
};
