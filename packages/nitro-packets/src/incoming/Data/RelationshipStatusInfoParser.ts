import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IRelationshipStatusInfo {
    relationshipStatusType: number;
    friendCount: number;
    randomFriendId: number;
    randomFriendName: string;
    randomFriendFigure: string;
}

export const RelationshipStatusInfoParser = (wrapper: IMessageDataWrapper): IRelationshipStatusInfo => {
    const data: IRelationshipStatusInfo = {
        relationshipStatusType: 0,
        friendCount: 0,
        randomFriendId: 0,
        randomFriendName: '',
        randomFriendFigure: '',
    };

    data.relationshipStatusType = wrapper.readInt();
    data.friendCount = wrapper.readInt();
    data.randomFriendId = wrapper.readInt();
    data.randomFriendName = wrapper.readString();
    data.randomFriendFigure = wrapper.readString();

    return data;
}
