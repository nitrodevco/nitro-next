import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IFriendRequestData {
    requestId: number;
    requesterName: string;
    figureString: string;
}

export const FriendRequestDataParser = (wrapper: IMessageDataWrapper): IFriendRequestData => {
    const data: IFriendRequestData = {
        requestId: 0,
        requesterName: '',
        figureString: '',
    };

    data.requestId = wrapper.readInt();
    data.requesterName = wrapper.readString();
    data.figureString = wrapper.readString();

    return data;
}
