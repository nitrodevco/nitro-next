import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomQueueStatusMessageType = {
  // no fields

};

export class RoomQueueStatusMessage implements IIncomingPacket<RoomQueueStatusMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomQueueStatusMessageType
  {

    const packet: RoomQueueStatusMessageType = {
    };

    return packet;
  }
}
