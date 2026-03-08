import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(OwnerNames: ImmutableDictionary<PlayerId, string>): Unknown type 'ImmutableDictionary<PlayerId, string>'. Add override mapping.
// TODO(FloorItems: ImmutableArray<RoomFloorItemSnapshot>): Unknown type 'ImmutableArray<RoomFloorItemSnapshot>'. Add override mapping.

export type ObjectsMessageType = {
  ownerNames: any;
  floorItems: any;
};

export class ObjectsMessage implements IIncomingPacket<ObjectsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ObjectsMessageType
  {

    const packet: ObjectsMessageType = {
      ownerNames: undefined as any, // Unknown type 'ImmutableDictionary<PlayerId, string>'. Add override mapping.
      floorItems: undefined as any, // Unknown type 'ImmutableArray<RoomFloorItemSnapshot>'. Add override mapping.
    };

    return packet;
  }
}
