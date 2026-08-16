import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RoomEntryInfoMessageType = {
  roomId: number;
  isOwner: boolean;
};

export class RoomEntryInfoMessage implements IIncomingPacket<RoomEntryInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RoomEntryInfoMessageType
  {

    const packet: RoomEntryInfoMessageType = {
      roomId: wrapper.readInt(),
      isOwner: wrapper.readBoolean(),
    };

    return packet;
  }
}
