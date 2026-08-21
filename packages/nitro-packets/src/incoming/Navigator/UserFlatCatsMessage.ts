import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IFlatCategory } from './Data/FlatCategoryParser';
import { FlatCategoryParser } from './Data/FlatCategoryParser';

export type UserFlatCatsMessageType = {
  nodes: IFlatCategory[];
};

export class UserFlatCatsMessage implements IIncomingPacket<UserFlatCatsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): UserFlatCatsMessageType
  {
    const packet: UserFlatCatsMessageType = {
      nodes: []
    };

    let count = wrapper.readInt();

    while (count > 0) {
      packet.nodes.push(FlatCategoryParser(wrapper));

      count--;
    }

    return packet;
  }
}
