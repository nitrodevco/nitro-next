import { CatalogFrontPageItemType, ICatalogFrontPageItem, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export const CatalogFrontPageItemParser = (wrapper: IMessageDataWrapper) => {
    const result = {
        position: wrapper.readInt(),
        itemName: wrapper.readString(),
        itemPromoImage: wrapper.readString(),
        type: wrapper.readInt(),
        expiresInSeconds: -1,
    } as ICatalogFrontPageItem;

    switch (result.type) {
        case CatalogFrontPageItemType.Default:
            result.value = wrapper.readString();
            break;
        case CatalogFrontPageItemType.One:
            result.value = wrapper.readInt();
            break;
        case CatalogFrontPageItemType.Two:
            result.value = wrapper.readString();
            break;
    }

    result.expiresInSeconds = wrapper.readInt();

    return result;
};
