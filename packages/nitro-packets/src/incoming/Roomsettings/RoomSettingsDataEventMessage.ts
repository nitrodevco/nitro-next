import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomSettingsDataEventMessageType = {
  // no fields

};

export class RoomSettingsDataEventMessage implements IIncomingPacket<RoomSettingsDataEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomSettingsDataEventMessageType
  {

    const packet: RoomSettingsDataEventMessageType = {
    };

    return packet;
  }
}
