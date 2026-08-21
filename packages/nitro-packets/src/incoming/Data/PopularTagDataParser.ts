import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IPopularTagData {
    tagName: string;
    userCount: number;
}

export const PopularTagDataParser = (wrapper: IMessageDataWrapper): IPopularTagData => {
    const data: IPopularTagData = {
        tagName: '',
        userCount: 0,
    };

    data.tagName = wrapper.readString();
    data.userCount = wrapper.readInt();

    return data;
}
