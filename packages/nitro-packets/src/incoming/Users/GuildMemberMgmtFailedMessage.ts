import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMemberMgmtFailedMessageType = object;

export class GuildMemberMgmtFailedMessage implements IIncomingPacket<GuildMemberMgmtFailedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMemberMgmtFailedMessageType {
        const packet: GuildMemberMgmtFailedMessageType = {
        };

        return packet;
    }
}
