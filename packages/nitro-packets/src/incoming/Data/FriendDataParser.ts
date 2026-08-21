import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IFriendData {
    id: number;
    name: string;
    gender: number;
    online: boolean;
    followingAllowed: boolean;
    figure: string;
    categoryId: number;
    motto: string;
    realName: string;
    facebookId: string;
    persistedMessageUser: boolean;
    vipMember: boolean;
    pocketHabboUser: boolean;
    relationshipStatus: number;
}

export const FriendDataParser = (wrapper: IMessageDataWrapper): IFriendData => {
    const data: IFriendData = {
        id: 0,
        name: '',
        gender: 0,
        online: false,
        followingAllowed: false,
        figure: '',
        categoryId: 0,
        motto: '',
        realName: '',
        facebookId: '',
        persistedMessageUser: false,
        vipMember: false,
        pocketHabboUser: false,
        relationshipStatus: 0,
    };

    data.id = wrapper.readInt();
    data.name = wrapper.readString();
    data.gender = wrapper.readInt();
    data.online = wrapper.readBoolean();
    data.followingAllowed = wrapper.readBoolean();
    data.figure = wrapper.readString();
    data.categoryId = wrapper.readInt();
    data.motto = wrapper.readString();
    data.realName = wrapper.readString();
    data.facebookId = wrapper.readString();
    data.persistedMessageUser = wrapper.readBoolean();
    data.vipMember = wrapper.readBoolean();
    data.pocketHabboUser = wrapper.readBoolean();
    data.relationshipStatus = wrapper.readShort();

    return data;
}
