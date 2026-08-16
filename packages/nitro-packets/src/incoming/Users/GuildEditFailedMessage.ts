import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildEditFailedMessageType = {
  // no fields

};

export class GuildEditFailedMessage implements IIncomingPacket<GuildEditFailedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildEditFailedMessageType
  {

    const packet: GuildEditFailedMessageType = {
    };

    return packet;
  }
}
