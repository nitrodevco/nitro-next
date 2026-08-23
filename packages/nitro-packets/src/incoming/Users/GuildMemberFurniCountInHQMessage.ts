import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMemberFurniCountInHQMessageType = object;

export class GuildMemberFurniCountInHQMessage implements IIncomingPacket<GuildMemberFurniCountInHQMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMemberFurniCountInHQMessageType {
        const packet: GuildMemberFurniCountInHQMessageType = {
        };

        return packet;
    }
}
