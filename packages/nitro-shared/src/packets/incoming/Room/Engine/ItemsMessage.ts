import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(OwnerNames: ImmutableDictionary<PlayerId, string>): Unknown type 'ImmutableDictionary<PlayerId, string>'. Add override mapping.
// TODO(WallItems: ImmutableArray<RoomWallItemSnapshot>): Unknown type 'ImmutableArray<RoomWallItemSnapshot>'. Add override mapping.

export type ItemsMessageType = {
  ownerNames: any;
  wallItems: any;
};

export class ItemsMessage implements IIncomingPacket<ItemsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ItemsMessageType
  {

    const packet: ItemsMessageType = {
      ownerNames: undefined as any, // Unknown type 'ImmutableDictionary<PlayerId, string>'. Add override mapping.
      wallItems: undefined as any, // Unknown type 'ImmutableArray<RoomWallItemSnapshot>'. Add override mapping.
    };

    return packet;
  }
}
