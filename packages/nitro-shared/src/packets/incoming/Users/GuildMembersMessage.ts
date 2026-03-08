import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMembersMessageType = {
  // no fields

};

export class GuildMembersMessage implements IIncomingPacket<GuildMembersMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildMembersMessageType
  {

    const packet: GuildMembersMessageType = {
    };

    return packet;
  }
}
