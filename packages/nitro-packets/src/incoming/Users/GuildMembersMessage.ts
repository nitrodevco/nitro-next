import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMembersMessageType = object;

export class GuildMembersMessage implements IIncomingPacket<GuildMembersMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMembersMessageType {
        const packet: GuildMembersMessageType = {
        };

        return packet;
    }
}
