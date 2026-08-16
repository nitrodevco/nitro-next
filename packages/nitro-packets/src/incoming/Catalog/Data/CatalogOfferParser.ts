import { ICatalogOffer, IMessageDataWrapper, ParseArray } from "@nitrodevco/nitro-api";

import { CatalogProductParser } from "./CatalogProductParser";

export const CatalogOfferParser = (wrapper: IMessageDataWrapper): ICatalogOffer => {
    return {
        id: wrapper.readInt(),
        localizationId: wrapper.readString(),
        rentable: wrapper.readBoolean(),
        costCredits: wrapper.readInt(),
        costCurrency: wrapper.readInt(),
        costCurrencyType: wrapper.readInt(),
        costSilver: wrapper.readInt(),
        canGift: wrapper.readBoolean(),
        products: ParseArray(wrapper, CatalogProductParser),
        clubLevel: wrapper.readInt(),
        canBundle: wrapper.readBoolean(),
        unknown1: wrapper.bytesAvailable ? wrapper.readBoolean() : false,
        previewImage: wrapper.bytesAvailable ? wrapper.readString() : ''
    }
}