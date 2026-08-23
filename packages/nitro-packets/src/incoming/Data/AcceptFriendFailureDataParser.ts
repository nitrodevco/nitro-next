import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IAcceptFriendFailureData {
    senderId: number;
    errorCode: number;
}

export const AcceptFriendFailureDataParser = (wrapper: IMessageDataWrapper): IAcceptFriendFailureData => {
    const data: IAcceptFriendFailureData = {
        senderId: 0,
        errorCode: 0,
    };

    data.senderId = wrapper.readInt();
    data.errorCode = wrapper.readInt();

    return data;
};
