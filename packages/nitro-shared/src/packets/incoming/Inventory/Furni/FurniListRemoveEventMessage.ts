import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ItemId: RoomObjectId): Unknown type 'RoomObjectId'. Add override mapping.

export type FurniListRemoveEventMessageType = {
  itemId: any;
};

export class FurniListRemoveEventMessage implements IIncomingPacket<FurniListRemoveEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FurniListRemoveEventMessageType
  {

    const packet: FurniListRemoveEventMessageType = {
      itemId: undefined as any, // Unknown type 'RoomObjectId'. Add override mapping.
    };

    return packet;
  }
}
