import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(WallItem: RoomWallItemSnapshot): Unknown type 'RoomWallItemSnapshot'. Add override mapping.

export type ItemUpdateMessageType = {
  wallItem: any;
};

export class ItemUpdateMessage implements IIncomingPacket<ItemUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ItemUpdateMessageType
  {

    const packet: ItemUpdateMessageType = {
      wallItem: undefined as any, // Unknown type 'RoomWallItemSnapshot'. Add override mapping.
    };

    return packet;
  }
}
