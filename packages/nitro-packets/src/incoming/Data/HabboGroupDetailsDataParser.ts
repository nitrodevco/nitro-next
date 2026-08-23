import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IHabboGroupDetailsData {
    groupId: number;
    isGuild: boolean;
    type: number;
    groupName: string;
    description: string;
    badgeCode: string;
    roomId: number;
    roomName: string;
    status: number;
    totalMembers: number;
    favourite: boolean;
    creationDate: string;
    isOwner: boolean;
    isAdmin: boolean;
    ownerName: string;
    openDetails: boolean;
    membersCanDecorate: boolean;
    pendingMemberCount: number;
    hasBoard: boolean;
}

export const HabboGroupDetailsDataParser = (wrapper: IMessageDataWrapper): IHabboGroupDetailsData => {
    const data: IHabboGroupDetailsData = {
        groupId: 0,
        isGuild: false,
        type: 0,
        groupName: '',
        description: '',
        badgeCode: '',
        roomId: 0,
        roomName: '',
        status: 0,
        totalMembers: 0,
        favourite: false,
        creationDate: '',
        isOwner: false,
        isAdmin: false,
        ownerName: '',
        openDetails: false,
        membersCanDecorate: false,
        pendingMemberCount: 0,
        hasBoard: false,
    };

    data.groupId = wrapper.readInt();
    data.isGuild = wrapper.readBoolean();
    data.type = wrapper.readInt();
    data.groupName = wrapper.readString();
    data.description = wrapper.readString();
    data.badgeCode = wrapper.readString();
    data.roomId = wrapper.readInt();
    data.roomName = wrapper.readString();
    data.status = wrapper.readInt();
    data.totalMembers = wrapper.readInt();
    data.favourite = wrapper.readBoolean();
    data.creationDate = wrapper.readString();
    data.isOwner = wrapper.readBoolean();
    data.isAdmin = wrapper.readBoolean();
    data.ownerName = wrapper.readString();
    data.openDetails = wrapper.readBoolean();
    data.membersCanDecorate = wrapper.readBoolean();
    data.pendingMemberCount = wrapper.readInt();
    data.hasBoard = wrapper.readBoolean();

    return data;
};
