import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IFriendCategoryData {
    id: number;
    name: string;
}

export const FriendCategoryDataParser = (wrapper: IMessageDataWrapper): IFriendCategoryData => {
    const data: IFriendCategoryData = {
        id: 0,
        name: '',
    };

    data.id = wrapper.readInt();
    data.name = wrapper.readString();

    return data;
};
