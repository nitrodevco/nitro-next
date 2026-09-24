import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `MemberData._type`: what the user is to the group. `member` is every type but a pending
 * request, so a blocked user still counts as one.
 */
export const GUILD_MEMBER_TYPE_OWNER = 0;
export const GUILD_MEMBER_TYPE_ADMIN = 1;
export const GUILD_MEMBER_TYPE_MEMBER = 2;
export const GUILD_MEMBER_TYPE_REQUESTED = 3;
export const GUILD_MEMBER_TYPE_BLOCKED = 4;

/** Flash `MemberData`. */
export interface IMemberData {
    /** One of the `GUILD_MEMBER_TYPE_*` values. */
    type: number;
    userId: number;
    userName: string;
    figure: string;
    memberSince: string;
}

export const MemberDataParser = (wrapper: IMessageDataWrapper): IMemberData => {
    const data: IMemberData = {
        type: GUILD_MEMBER_TYPE_MEMBER,
        userId: 0,
        userName: '',
        figure: '',
        memberSince: '',
    };

    data.type = wrapper.readInt();
    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();
    data.figure = wrapper.readString();
    data.memberSince = wrapper.readString();

    return data;
};

/** `MemberData.owner`. */
export const isGuildMemberOwner = (member: IMemberData): boolean => Number(member.type) === GUILD_MEMBER_TYPE_OWNER;

/** `MemberData.admin`. */
export const isGuildMemberAdmin = (member: IMemberData): boolean => Number(member.type) === GUILD_MEMBER_TYPE_ADMIN;

/** `MemberData.member` - everything that is not a pending request. */
export const isGuildMemberMember = (member: IMemberData): boolean => Number(member.type) !== GUILD_MEMBER_TYPE_REQUESTED;

/** `MemberData.blocked`. */
export const isGuildMemberBlocked = (member: IMemberData): boolean => Number(member.type) === GUILD_MEMBER_TYPE_BLOCKED;
