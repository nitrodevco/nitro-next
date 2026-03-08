import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomFilterSettingsMessageType = {
  // no fields

};

export class RoomFilterSettingsMessage implements IIncomingPacket<RoomFilterSettingsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomFilterSettingsMessageType
  {

    const packet: RoomFilterSettingsMessageType = {
    };

    return packet;
  }
}
