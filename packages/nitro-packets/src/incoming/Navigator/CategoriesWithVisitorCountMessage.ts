import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { ICategoriesWithVisitorCountData } from '../Data/CategoriesWithVisitorCountDataParser';
import { CategoriesWithVisitorCountDataParser } from '../Data/CategoriesWithVisitorCountDataParser';

export type CategoriesWithVisitorCountMessageType = {
  data: ICategoriesWithVisitorCountData;
};

export class CategoriesWithVisitorCountMessage implements IIncomingPacket<CategoriesWithVisitorCountMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CategoriesWithVisitorCountMessageType
  {
    const packet: CategoriesWithVisitorCountMessageType = {
      data: {} as any,
    };

    packet.data = CategoriesWithVisitorCountDataParser(wrapper);

    return packet;
  }
}
