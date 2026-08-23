import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildCreationInfoMessageType = object;

export class GuildCreationInfoMessage implements IIncomingPacket<GuildCreationInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildCreationInfoMessageType {
        const packet: GuildCreationInfoMessageType = {
        };

        return packet;
    }
}
