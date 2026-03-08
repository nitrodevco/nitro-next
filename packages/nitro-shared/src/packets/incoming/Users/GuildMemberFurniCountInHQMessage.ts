import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMemberFurniCountInHQMessageType = {
  // no fields

};

export class GuildMemberFurniCountInHQMessage implements IIncomingPacket<GuildMemberFurniCountInHQMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildMemberFurniCountInHQMessageType
  {

    const packet: GuildMemberFurniCountInHQMessageType = {
    };

    return packet;
  }
}
