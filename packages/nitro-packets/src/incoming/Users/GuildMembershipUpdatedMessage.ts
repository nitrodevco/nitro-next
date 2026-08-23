import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMembershipUpdatedMessageType = object;

export class GuildMembershipUpdatedMessage implements IIncomingPacket<GuildMembershipUpdatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembershipUpdatedMessageType {
        const packet: GuildMembershipUpdatedMessageType = {
        };

        return packet;
    }
}
