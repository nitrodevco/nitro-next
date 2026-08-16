import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomReadyMessageType = {
  worldType: string;
  roomId: number;
};

export class RoomReadyMessage implements IIncomingPacket<RoomReadyMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomReadyMessageType
  {

    const packet: RoomReadyMessageType = {
      worldType: wrapper.readString(),
      roomId: wrapper.readInt(),
    };

    return packet;
  }
}
