// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** `HabboGroupDetailsData.TYPE_*` - who may join, and which `grouptype_icon_<n>` the details window shows. */
export const GUILD_TYPE_REGULAR = 0;
export const GUILD_TYPE_EXCLUSIVE = 1;
export const GUILD_TYPE_PRIVATE = 2;
export const GUILD_TYPE_LARGE = 3;
export const GUILD_TYPE_OPEN_LARGE = 4;

/** `HabboGroupDetailsData` membership status. */
export const GUILD_MEMBERSHIP_NONE = 0;
export const GUILD_MEMBERSHIP_MEMBER = 1;
export const GUILD_MEMBERSHIP_REQUESTED = 2;

/** A group as `HabboGroupDetailsMessage` describes it. */
export interface IHabboGroupDetails {
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
    /** Asked for with the details window to open, rather than just to name the group. */
    openDetails: boolean;
    membersCanDecorate: boolean;
    pendingMemberCount: number;
    hasBoard: boolean;
}

export type HabboGroupDetailsMessageType = {
    data: IHabboGroupDetails;
};

export class HabboGroupDetailsMessage implements IIncomingPacket<HabboGroupDetailsMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboGroupDetailsMessageType {
        return {
            data: {
                groupId: wrapper.readInt(),
                isGuild: wrapper.readBoolean(),
                type: wrapper.readInt(),
                groupName: wrapper.readString(),
                description: wrapper.readString(),
                badgeCode: wrapper.readString(),
                roomId: wrapper.readInt(),
                roomName: wrapper.readString(),
                status: wrapper.readInt(),
                totalMembers: wrapper.readInt(),
                favourite: wrapper.readBoolean(),
                creationDate: wrapper.readString(),
                isOwner: wrapper.readBoolean(),
                isAdmin: wrapper.readBoolean(),
                ownerName: wrapper.readString(),
                openDetails: wrapper.readBoolean(),
                membersCanDecorate: wrapper.readBoolean(),
                pendingMemberCount: wrapper.readInt(),
                hasBoard: wrapper.readBoolean(),
            },
        };
    }
}

/** `HabboGroupDetailsData.joiningAllowed`. */
export const isGuildJoiningAllowed = (details: IHabboGroupDetails): boolean =>
    (Number(details.status) === GUILD_MEMBERSHIP_NONE) && ((Number(details.type) === GUILD_TYPE_REGULAR) || (Number(details.type) === GUILD_TYPE_OPEN_LARGE));

/** `HabboGroupDetailsData.requestMembershipAllowed`. */
export const isGuildMembershipRequestAllowed = (details: IHabboGroupDetails): boolean =>
    (Number(details.status) === GUILD_MEMBERSHIP_NONE) && (Number(details.type) === GUILD_TYPE_EXCLUSIVE);

/** `HabboGroupDetailsData.leaveAllowed`. */
export const isGuildLeaveAllowed = (details: IHabboGroupDetails): boolean =>
    details.isGuild && !details.isOwner && (Number(details.status) === GUILD_MEMBERSHIP_MEMBER);
