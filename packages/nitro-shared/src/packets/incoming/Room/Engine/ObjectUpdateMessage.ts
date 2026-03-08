import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(FloorItem: RoomFloorItemSnapshot): Unknown type 'RoomFloorItemSnapshot'. Add override mapping.

export type ObjectUpdateMessageType = {
  floorItem: any;
};

export class ObjectUpdateMessage implements IIncomingPacket<ObjectUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectUpdateMessageType
  {

    const packet: ObjectUpdateMessageType = {
      floorItem: undefined as any, // Unknown type 'RoomFloorItemSnapshot'. Add override mapping.
    };

    return packet;
  }
}
