import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildEditInfoMessageType = {
  // no fields

};

export class GuildEditInfoMessage implements IIncomingPacket<GuildEditInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildEditInfoMessageType
  {

    const packet: GuildEditInfoMessageType = {
    };

    return packet;
  }
}
