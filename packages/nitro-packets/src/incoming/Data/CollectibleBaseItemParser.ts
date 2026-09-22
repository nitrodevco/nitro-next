// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

/**
 * Flash `parser/collectibles/CollectibleBaseItem`: what a collectible is - its product type
 * (`IProductDisplayInfo.productTypeId`: -1 unknown, 0 wall, 1 floor, 2 effect, 4 badge, 9 chat
 * style, 10 pet, 11 clothing), the furni / effect / badge / style it names, its XP score, a pet's
 * figure, a clothing item's figure set ids, its product code and its rarity. The tool calls it
 * `RedeemNftLootBoxStateReward`, after the first packet it read it in.
 *
 * `CollectibleItem` (`CollectibleItemParser`) reads one more int, `amount`, between the score and
 * the pet figure (`readAdditionalParams`); `ClaimItem` (`ClaimItemParser`) two strings after it.
 */
export interface ICollectibleBaseItem {
    productTypeId: number;
    itemTypeId: string;
    score: number;
    petFigureString: string;
    figureSetIds: number[];
    productCode: string;
    rarity: string;
}

export const CollectibleBaseItemParser = (wrapper: IMessageDataWrapper): ICollectibleBaseItem => {
    const productTypeId = wrapper.readShort();
    const itemTypeId = wrapper.readString();
    const score = wrapper.readInt();
    const petFigureString = wrapper.readString();
    const figureSetIds = ParseInts(wrapper);
    const productCode = wrapper.readString();
    const rarity = wrapper.readString();

    return { productTypeId, itemTypeId, score, petFigureString, figureSetIds, productCode, rarity };
};
