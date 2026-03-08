import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ObjectId: RoomObjectId): Unknown type 'RoomObjectId'. Add override mapping.

export type ItemRemoveMessageType = {
  objectId: any;
  pickerId: number;
};

export class ItemRemoveMessage implements IIncomingPacket<ItemRemoveMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ItemRemoveMessageType
  {

    const packet: ItemRemoveMessageType = {
      objectId: undefined as any, // Unknown type 'RoomObjectId'. Add override mapping.
      pickerId: wrapper.readInt(),
    };

    return packet;
  }
}
