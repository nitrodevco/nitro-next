import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CanCreateRoomEventMessageType = {
  canCreateEvent: boolean;
  errorCode: number;
};

export class CanCreateRoomEventMessage implements IIncomingPacket<CanCreateRoomEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CanCreateRoomEventMessageType
  {

    const packet: CanCreateRoomEventMessageType = {
      canCreateEvent: wrapper.readBoolean(),
      errorCode: wrapper.readInt(),
    };

    return packet;
  }
}
