import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IClubGiftSelectedData } from './IClubGiftSelectedData';

export const ClubGiftSelectedDataParser = (wrapper: IMessageDataWrapper): IClubGiftSelectedData => {
    let furniClassId: number | undefined;
    let extraParam: string | undefined;
    let productCount: number | undefined;
    let uniqueLimitedItem: boolean | undefined;
    let uniqueLimitedItemSeriesSize: number | undefined;
    let uniqueLimitedItemsLeft: number | undefined;
    const productType = wrapper.readString();
    const loc2 = productType;
    if ('b' !== loc2) {
        furniClassId = wrapper.readInt();
        extraParam = wrapper.readString();
        productCount = wrapper.readInt();
        uniqueLimitedItem = wrapper.readBoolean();
        if (uniqueLimitedItem) {
            uniqueLimitedItemSeriesSize = wrapper.readInt();
            uniqueLimitedItemsLeft = wrapper.readInt();
        }
    } else {
        extraParam = wrapper.readString();
        productCount = 1;
    }
    return { productType, furniClassId, extraParam, productCount, uniqueLimitedItem, uniqueLimitedItemSeriesSize, uniqueLimitedItemsLeft };
};
