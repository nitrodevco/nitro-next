import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IMemberData {
    userId: number;
    userName: string;
    figure: string;
    memberSince: string;
}

export const MemberDataParser = (wrapper: IMessageDataWrapper): IMemberData => {
    const data: IMemberData = {
        userId: 0,
        userName: '',
        figure: '',
        memberSince: '',
    };

    wrapper.readInt(); // unnamed in SWF
    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();
    data.figure = wrapper.readString();
    data.memberSince = wrapper.readString();

    return data;
};
