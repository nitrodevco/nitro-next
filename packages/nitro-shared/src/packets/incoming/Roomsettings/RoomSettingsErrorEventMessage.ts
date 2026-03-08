import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomSettingsErrorEventMessageType = {
  // no fields

};

export class RoomSettingsErrorEventMessage implements IIncomingPacket<RoomSettingsErrorEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomSettingsErrorEventMessageType
  {

    const packet: RoomSettingsErrorEventMessageType = {
    };

    return packet;
  }
}
