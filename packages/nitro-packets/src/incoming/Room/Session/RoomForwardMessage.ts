import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomForwardMessageType = {
  roomId: number;
};

export class RoomForwardMessage implements IIncomingPacket<RoomForwardMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomForwardMessageType
  {

    const packet: RoomForwardMessageType = {
      roomId: wrapper.readInt(),
    };

    return packet;
  }
}
