import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildCreatedMessageType = object;

export class GuildCreatedMessage implements IIncomingPacket<GuildCreatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildCreatedMessageType {
        const packet: GuildCreatedMessageType = {
        };

        return packet;
    }
}
