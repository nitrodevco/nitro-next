import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomPropertyMessageType = {
  // no fields

};

export class RoomPropertyMessage implements IIncomingPacket<RoomPropertyMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomPropertyMessageType
  {

    const packet: RoomPropertyMessageType = {
    };

    return packet;
  }
}
