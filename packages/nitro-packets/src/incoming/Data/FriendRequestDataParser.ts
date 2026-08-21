import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IFriendRequestData {
    requestId: number;
    requesterName: string;
    figureString: string;
    // not read from the wire — the SWF assigns it from requestId after parsing
    requesterUserId: number;
}

export const FriendRequestDataParser = (wrapper: IMessageDataWrapper): IFriendRequestData => {
    const data: IFriendRequestData = {
        requestId: 0,
        requesterName: '',
        figureString: '',
        requesterUserId: 0,
    };

    data.requestId = wrapper.readInt();
    data.requesterName = wrapper.readString();
    data.figureString = wrapper.readString();
    data.requesterUserId = data.requestId;

    return data;
}
