import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildCreatedMessageType = {
  // no fields

};

export class GuildCreatedMessage implements IIncomingPacket<GuildCreatedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildCreatedMessageType
  {

    const packet: GuildCreatedMessageType = {
    };

    return packet;
  }
}
