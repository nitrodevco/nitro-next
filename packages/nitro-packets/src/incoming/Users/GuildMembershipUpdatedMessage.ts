// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IMemberData, MemberDataParser } from '../Data/MemberDataParser';

export type GuildMembershipUpdatedMessageType = {
    guildId: number;
    /** The member's new row - `GuildMemberData.update` replaces it in the page being shown. */
    member: IMemberData;
};

/** `GuildMembersWindowCtrl.onGuildMembershipUpdated`. */
export class GuildMembershipUpdatedMessage implements IIncomingPacket<GuildMembershipUpdatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembershipUpdatedMessageType {
        return {
            guildId: wrapper.readInt(),
            member: MemberDataParser(wrapper),
        };
    }
}
