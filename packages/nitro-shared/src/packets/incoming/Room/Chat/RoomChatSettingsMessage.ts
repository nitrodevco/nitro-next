import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomChatSettingsMessageType = {
  // no fields

};

export class RoomChatSettingsMessage implements IIncomingPacket<RoomChatSettingsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomChatSettingsMessageType
  {

    const packet: RoomChatSettingsMessageType = {
    };

    return packet;
  }
}
