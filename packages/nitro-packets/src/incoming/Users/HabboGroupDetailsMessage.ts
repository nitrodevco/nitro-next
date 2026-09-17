// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

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
