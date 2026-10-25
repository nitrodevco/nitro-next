import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IBannedUserData {
    userId: number;
    userName: string;
}

export const BannedUserDataParser = (wrapper: IMessageDataWrapper): IBannedUserData => {
    const data: IBannedUserData = {
        userId: 0,
        userName: '',
    };

    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();

    return data;
};
