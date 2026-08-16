import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildFurniContextMenuInfoMessageType = {
  objectId: number;
  guildId: number;
  guildName: string;
  guildHomeRoomId: number;
  userIsMember: boolean;
  guildHasReadableForum: boolean;
};

export class GuildFurniContextMenuInfoMessage implements IIncomingPacket<GuildFurniContextMenuInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GuildFurniContextMenuInfoMessageType
  {

    const packet: GuildFurniContextMenuInfoMessageType = {
      objectId: wrapper.readInt(),
      guildId: wrapper.readInt(),
      guildName: wrapper.readString(),
      guildHomeRoomId: wrapper.readInt(),
      userIsMember: wrapper.readBoolean(),
      guildHasReadableForum: wrapper.readBoolean(),
    };

    return packet;
  }
}
