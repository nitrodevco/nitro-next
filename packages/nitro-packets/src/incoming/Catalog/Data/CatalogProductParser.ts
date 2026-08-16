import { FurnitureTypeEnum, ICatalogProduct, IMessageDataWrapper } from "@nitrodevco/nitro-api";

export const CatalogProductParser = (wrapper: IMessageDataWrapper): ICatalogProduct => {
    const result = {
        productType: wrapper.readString(),
        spriteId: -1,
        extraParam: '',
        quantity: 1,
        isUnique: false,
        uniqueSize: 0,
        uniqueRemaining: 0
    } as ICatalogProduct;

    if (result.productType !== FurnitureTypeEnum.Badge) {
        result.spriteId = wrapper.readInt();
        result.extraParam = wrapper.readString();
        result.quantity = wrapper.readInt();
        result.isUnique = wrapper.readBoolean();

        if (result.isUnique) {
            result.uniqueSize = wrapper.readInt();
            result.uniqueRemaining = wrapper.readInt();
        }
    } else {
        result.extraParam = wrapper.readString();
    }

    return result;
}