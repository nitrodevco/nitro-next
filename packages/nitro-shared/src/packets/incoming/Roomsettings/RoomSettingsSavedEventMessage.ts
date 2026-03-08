import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomSettingsSavedEventMessageType = {
  // no fields

};

export class RoomSettingsSavedEventMessage implements IIncomingPacket<RoomSettingsSavedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomSettingsSavedEventMessageType
  {

    const packet: RoomSettingsSavedEventMessageType = {
    };

    return packet;
  }
}
