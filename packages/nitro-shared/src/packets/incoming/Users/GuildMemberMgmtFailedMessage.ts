import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMemberMgmtFailedMessageType = {
  // no fields

};

export class GuildMemberMgmtFailedMessage implements IIncomingPacket<GuildMemberMgmtFailedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildMemberMgmtFailedMessageType
  {

    const packet: GuildMemberMgmtFailedMessageType = {
    };

    return packet;
  }
}
