import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface ICatalogLocalizationData {
    images: string[];
    texts: string[];
}

export const CatalogLocalizationDataParser = (wrapper: IMessageDataWrapper): ICatalogLocalizationData => {
    const data: ICatalogLocalizationData = {
        images: [],
        texts: [],
    };

    let v1 = wrapper.readInt();
    while (v1 > 0) {
        data.images.push(wrapper.readString());
        v1--;
    }
    let v2 = wrapper.readInt();
    while (v2 > 0) {
        data.texts.push(wrapper.readString());
        v2--;
    }

    return data;
};
