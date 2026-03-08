import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(LiftedRooms: List<NavigatorLiftedRoomSnapshot>): List<T> requires custom read loop (length + items).

export type NavigatorLiftedRoomsMessageType = {
  liftedRooms: any[];
};

export class NavigatorLiftedRoomsMessage implements IIncomingPacket<NavigatorLiftedRoomsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NavigatorLiftedRoomsMessageType
  {

    const packet: NavigatorLiftedRoomsMessageType = {
      liftedRooms: undefined as any, // List<T> requires custom read loop (length + items).
    };

    return packet;
  }
}
