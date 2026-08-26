import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IMemberData {
    // SWF getters: owner == 0, admin == 1, member != 3, blocked == 4
    role: number;
    userId: number;
    userName: string;
    figure: string;
    memberSince: string;
}

export const MemberDataParser = (wrapper: IMessageDataWrapper): IMemberData => {
    const data: IMemberData = {
        role: 0,
        userId: 0,
        userName: '',
        figure: '',
        memberSince: '',
    };

    data.role = wrapper.readInt();
    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();
    data.figure = wrapper.readString();
    data.memberSince = wrapper.readString();

    return data;
}
