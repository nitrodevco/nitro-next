import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Items: ImmutableArray<FurnitureItemSnapshot>): Unknown type 'ImmutableArray<FurnitureItemSnapshot>'. Add override mapping.

export type FurniListEventMessageType = {
  totalFragments: number;
  currentFragment: number;
  items: any;
};

export class FurniListEventMessage implements IIncomingPacket<FurniListEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FurniListEventMessageType
  {

    const packet: FurniListEventMessageType = {
      totalFragments: wrapper.readInt(),
      currentFragment: wrapper.readInt(),
      items: undefined as any, // Unknown type 'ImmutableArray<FurnitureItemSnapshot>'. Add override mapping.
    };

    return packet;
  }
}
