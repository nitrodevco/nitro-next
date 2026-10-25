// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPrizeMessageSubProduct, PrizeMessageSubProductParser } from '../../../Data/PrizeMessageSubProductParser';
import { IPrizeMessageData } from './IPrizeMessageData';

/** Flash `PrizeMessageData`'s constructor: a single product's type and id, or a deal's sub products. */
export const PrizeMessageDataParser = (wrapper: IMessageDataWrapper): IPrizeMessageData => {
    const productCode = wrapper.readString();
    const productCount = wrapper.readInt();
    const isDeal = (productCount > 1);
    let productItemType = '';
    let productItemTypeId = 0;
    const subProducts: IPrizeMessageSubProduct[] = [];

    if (!isDeal) {
        productItemType = wrapper.readString();
        productItemTypeId = wrapper.readInt();
    } else {
        for (let i = 0; i < productCount; i++) subProducts.push(PrizeMessageSubProductParser(wrapper));
    }

    return { productCode, productCount, isDeal, productItemType, productItemTypeId, subProducts };
};
