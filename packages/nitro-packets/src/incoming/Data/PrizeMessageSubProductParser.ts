import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IPrizeMessageSubProduct {
    productItemType: string;
    productItemTypeId: number;
}

export const PrizeMessageSubProductParser = (wrapper: IMessageDataWrapper): IPrizeMessageSubProduct => {
    const data: IPrizeMessageSubProduct = {
        productItemType: '',
        productItemTypeId: 0,
    };

    data.productItemType = wrapper.readString();
    data.productItemTypeId = wrapper.readInt();

    return data;
};
