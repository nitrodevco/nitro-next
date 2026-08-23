import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IMintTokenOffer {
    offerId: number;
    productCode: string;
    silverPrice: number;
    amountTokens: number;
}

export const MintTokenOfferParser = (wrapper: IMessageDataWrapper): IMintTokenOffer => {
    const data: IMintTokenOffer = {
        offerId: 0,
        productCode: '',
        silverPrice: 0,
        amountTokens: 0,
    };

    data.offerId = wrapper.readInt();
    data.productCode = wrapper.readString();
    data.silverPrice = wrapper.readInt();
    data.amountTokens = wrapper.readInt();

    return data;
};
