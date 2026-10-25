import { ICatalogOffer, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { CatalogProductParser } from './CatalogProductParser';

export const CatalogOfferAsPurchasedParser = (wrapper: IMessageDataWrapper): ICatalogOffer => {
    return {
        id: wrapper.readInt(),
        localizationId: wrapper.readString(),
        rentable: wrapper.readBoolean(),
        costCredits: wrapper.readInt(),
        costCurrency: wrapper.readInt(),
        costCurrencyType: wrapper.readInt(),
        costSilver: 0,
        canGift: wrapper.readBoolean(),
        products: ParseArray(wrapper, CatalogProductParser),
        clubLevel: wrapper.readInt(),
        canBundle: wrapper.readBoolean(),
        unknown1: false,
        previewImage: '',
    };
};
