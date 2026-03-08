import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredRoomSettingsEventMessageType = {
  // no fields

};

export class WiredRoomSettingsEventMessage implements IIncomingPacket<WiredRoomSettingsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): WiredRoomSettingsEventMessageType
  {

    const packet: WiredRoomSettingsEventMessageType = {
    };

    return packet;
  }
}
