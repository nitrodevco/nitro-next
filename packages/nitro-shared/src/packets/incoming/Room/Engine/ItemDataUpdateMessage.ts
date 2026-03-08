import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ObjectId: RoomObjectId): Unknown type 'RoomObjectId'. Add override mapping.

export type ItemDataUpdateMessageType = {
  objectId: any;
  state: string;
};

export class ItemDataUpdateMessage implements IIncomingPacket<ItemDataUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ItemDataUpdateMessageType
  {

    const packet: ItemDataUpdateMessageType = {
      objectId: undefined as any, // Unknown type 'RoomObjectId'. Add override mapping.
      state: wrapper.readString(),
    };

    return packet;
  }
}
