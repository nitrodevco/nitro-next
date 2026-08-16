import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Categories: CategoriesWithVisitorCountSnapshot): Unknown type 'CategoriesWithVisitorCountSnapshot'. Add override mapping.

export type CategoriesWithVisitorCountMessageType = {
  categories: any;
};

export class CategoriesWithVisitorCountMessage implements IIncomingPacket<CategoriesWithVisitorCountMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CategoriesWithVisitorCountMessageType
  {

    const packet: CategoriesWithVisitorCountMessageType = {
      categories: undefined as any, // Unknown type 'CategoriesWithVisitorCountSnapshot'. Add override mapping.
    };

    return packet;
  }
}
