import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMembershipRejectedMessageType = object;

export class GuildMembershipRejectedMessage implements IIncomingPacket<GuildMembershipRejectedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembershipRejectedMessageType {
        const packet: GuildMembershipRejectedMessageType = {
        };

        return packet;
    }
}
