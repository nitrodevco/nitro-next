// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IMemberData, MemberDataParser } from '../Data/MemberDataParser';

/** Flash `GuildMemberData` - one page of a group's member list. */
export interface IGuildMemberData {
    groupId: number;
    groupName: string;
    baseRoomId: number;
    badgeCode: string;
    /** How many rows the whole search has, which is what the page count is worked out from. */
    totalEntries: number;
    entries: IMemberData[];
    /** Whether the viewer may kick, block and change rights - `GuildMembersWindowCtrl` gates every action on it. */
    allowedToManage: boolean;
    pageSize: number;
    pageIndex: number;
    /** The `GUILD_MEMBER_SEARCH_*` the page was fetched with. */
    searchType: number;
    userNameFilter: string;
}

export type GuildMembersMessageType = {
    data: IGuildMemberData;
};

/** The answer to `GetGuildMembersComposer` - `GuildMembersWindowCtrl.onGuildMembers`. */
export class GuildMembersMessage implements IIncomingPacket<GuildMembersMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembersMessageType {
        return {
            data: {
                groupId: wrapper.readInt(),
                groupName: wrapper.readString(),
                baseRoomId: wrapper.readInt(),
                badgeCode: wrapper.readString(),
                totalEntries: wrapper.readInt(),
                entries: ParseArray(wrapper, MemberDataParser),
                allowedToManage: wrapper.readBoolean(),
                pageSize: wrapper.readInt(),
                pageIndex: wrapper.readInt(),
                searchType: wrapper.readInt(),
                userNameFilter: wrapper.readString(),
            },
        };
    }
}
