import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(ProductCode: ProductType): Unknown type 'ProductType'. Add override mapping.
// TODO(PlacedItemType: ProductType): Unknown type 'ProductType'. Add override mapping.

export type PresentOpenedMessageType = {
  itemType: string;
  classId: number;
  productCode: any;
  placedItemId: number;
  placedItemType: any;
  placedInRoom: boolean;
  petFigureString: string;
};

export class PresentOpenedMessage implements IIncomingPacket<PresentOpenedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PresentOpenedMessageType
  {

    const packet: PresentOpenedMessageType = {
      itemType: wrapper.readString(),
      classId: wrapper.readInt(),
      productCode: undefined as any, // Unknown type 'ProductType'. Add override mapping.
      placedItemId: wrapper.readInt(),
      placedItemType: undefined as any, // Unknown type 'ProductType'. Add override mapping.
      placedInRoom: wrapper.readBoolean(),
      petFigureString: wrapper.readString(),
    };

    return packet;
  }
}
