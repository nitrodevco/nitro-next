import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IPromoArticleData {
    id: number;
    title: string;
    bodyText: string;
    buttonText: string;
    linkType: number;
    linkContent: string;
    imageUrl: string;
}

export const PromoArticleDataParser = (wrapper: IMessageDataWrapper): IPromoArticleData => {
    const data: IPromoArticleData = {
        id: 0,
        title: '',
        bodyText: '',
        buttonText: '',
        linkType: 0,
        linkContent: '',
        imageUrl: '',
    };

    data.id = wrapper.readInt();
    data.title = wrapper.readString();
    data.bodyText = wrapper.readString();
    data.buttonText = wrapper.readString();
    data.linkType = wrapper.readInt();
    data.linkContent = wrapper.readString();
    data.imageUrl = wrapper.readString();

    return data;
};
