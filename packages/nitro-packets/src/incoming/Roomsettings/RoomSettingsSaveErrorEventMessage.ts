import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomSettingsSaveErrorEventMessageType = {
  // no fields

};

export class RoomSettingsSaveErrorEventMessage implements IIncomingPacket<RoomSettingsSaveErrorEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomSettingsSaveErrorEventMessageType
  {

    const packet: RoomSettingsSaveErrorEventMessageType = {
    };

    return packet;
  }
}
