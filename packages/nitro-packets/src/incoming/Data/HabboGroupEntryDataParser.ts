import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IHabboGroupEntryData {
    groupId: number;
    groupName: string;
    badgeCode: string;
    primaryColor: string;
    secondaryColor: string;
    favourite: boolean;
    ownerId: number;
    hasForum: boolean;
}

export const HabboGroupEntryDataParser = (wrapper: IMessageDataWrapper): IHabboGroupEntryData => {
    const data: IHabboGroupEntryData = {
        groupId: 0,
        groupName: '',
        badgeCode: '',
        primaryColor: '',
        secondaryColor: '',
        favourite: false,
        ownerId: 0,
        hasForum: false,
    };

    data.groupId = wrapper.readInt();
    data.groupName = wrapper.readString();
    data.badgeCode = wrapper.readString();
    data.primaryColor = wrapper.readString();
    data.secondaryColor = wrapper.readString();
    data.favourite = wrapper.readBoolean();
    data.ownerId = wrapper.readInt();
    data.hasForum = wrapper.readBoolean();

    return data;
};
