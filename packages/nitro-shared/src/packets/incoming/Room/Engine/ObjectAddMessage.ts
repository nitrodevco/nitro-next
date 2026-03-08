import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(FloorItem: RoomFloorItemSnapshot): Unknown type 'RoomFloorItemSnapshot'. Add override mapping.

export type ObjectAddMessageType = {
  floorItem: any;
};

export class ObjectAddMessage implements IIncomingPacket<ObjectAddMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectAddMessageType
  {

    const packet: ObjectAddMessageType = {
      floorItem: undefined as any, // Unknown type 'RoomFloorItemSnapshot'. Add override mapping.
    };

    return packet;
  }
}
