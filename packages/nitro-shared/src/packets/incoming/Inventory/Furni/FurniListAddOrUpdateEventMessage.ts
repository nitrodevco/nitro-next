import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Item: FurnitureItemSnapshot): Unknown type 'FurnitureItemSnapshot'. Add override mapping.

export type FurniListAddOrUpdateEventMessageType = {
  item: any;
};

export class FurniListAddOrUpdateEventMessage implements IIncomingPacket<FurniListAddOrUpdateEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FurniListAddOrUpdateEventMessageType
  {

    const packet: FurniListAddOrUpdateEventMessageType = {
      item: undefined as any, // Unknown type 'FurnitureItemSnapshot'. Add override mapping.
    };

    return packet;
  }
}
