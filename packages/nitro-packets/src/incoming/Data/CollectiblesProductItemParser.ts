// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `parser/collectibles/CollectiblesProductItem`: a furni type the user may mint - its furni
 * type id, the minting period (`startTime` / `endTime`, seconds), whether a minted item is locked
 * to this hotel, the price in mint tokens, whether it is a limited edition, and whether it is a
 * floor (`s`), wall (`i`) or clothing (`cl`) item: a short on the wire, an unknown one read as `s`.
 */
export interface ICollectiblesProductItem {
    itemTypeId: number;
    startTime: number;
    endTime: number;
    regionLocked: boolean;
    price: number;
    limitedEdition: boolean;
    itemType: string;
}

export const CollectiblesProductItemParser = (wrapper: IMessageDataWrapper): ICollectiblesProductItem => {
    const itemTypeId = wrapper.readInt();
    const startTime = wrapper.readInt();
    const endTime = wrapper.readInt();
    const regionLocked = wrapper.readBoolean();
    const price = wrapper.readInt();
    const limitedEdition = wrapper.readBoolean();

    let itemType = 's';

    switch (wrapper.readShort()) {
        case 1:
            itemType = 'i';
            break;
        case 2:
            itemType = 'cl';
            break;
    }

    return { itemTypeId, startTime, endTime, regionLocked, price, limitedEdition, itemType };
};
