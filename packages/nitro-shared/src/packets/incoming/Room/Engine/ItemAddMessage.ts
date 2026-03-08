import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WallItem: RoomWallItemSnapshot): Unknown type 'RoomWallItemSnapshot'. Add override mapping.

export type ItemAddMessageType = {
  wallItem: any;
};

export class ItemAddMessage implements IIncomingPacket<ItemAddMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ItemAddMessageType
  {

    const packet: ItemAddMessageType = {
      wallItem: undefined as any, // Unknown type 'RoomWallItemSnapshot'. Add override mapping.
    };

    return packet;
  }
}
