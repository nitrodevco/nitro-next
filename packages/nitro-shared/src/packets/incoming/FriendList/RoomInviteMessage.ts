import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomInviteMessageType = {
  senderId: number;
  message: string;
};

export class RoomInviteMessage implements IIncomingPacket<RoomInviteMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomInviteMessageType
  {

    const packet: RoomInviteMessageType = {
      senderId: wrapper.readInt(),
      message: wrapper.readString(),
    };

    return packet;
  }
}
