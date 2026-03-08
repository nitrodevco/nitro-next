import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CanCreateRoomMessageType = {
  resultCode: number;
  roomLimit: number;
};

export class CanCreateRoomMessage implements IIncomingPacket<CanCreateRoomMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CanCreateRoomMessageType
  {

    const packet: CanCreateRoomMessageType = {
      resultCode: wrapper.readInt(),
      roomLimit: wrapper.readInt(),
    };

    return packet;
  }
}
