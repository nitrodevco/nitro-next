import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMembershipsMessageType = object;

export class GuildMembershipsMessage implements IIncomingPacket<GuildMembershipsMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembershipsMessageType {
        const packet: GuildMembershipsMessageType = {
        };

        return packet;
    }
}
