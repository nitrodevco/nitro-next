// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMembershipRejectedMessageType = {
    guildId: number;
    userId: number;
};

/** `GuildMembersWindowCtrl.onGuildMembershipRejected`: reloads the open page. */
export class GuildMembershipRejectedMessage implements IIncomingPacket<GuildMembershipRejectedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembershipRejectedMessageType {
        return {
            guildId: wrapper.readInt(),
            userId: wrapper.readInt(),
        };
    }
}
