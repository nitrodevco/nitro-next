// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMemberMgmtFailedMessageType = {
    guildId: number;
    /** `group.membermgmt.fail.<reason>`. */
    reason: number;
};

/** `GuildMembersWindowCtrl.onGuildMemberMgmtFailed`: alerts, then reloads the open page. */
export class GuildMemberMgmtFailedMessage implements IIncomingPacket<GuildMemberMgmtFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMemberMgmtFailedMessageType {
        return {
            guildId: wrapper.readInt(),
            reason: wrapper.readInt(),
        };
    }
}
