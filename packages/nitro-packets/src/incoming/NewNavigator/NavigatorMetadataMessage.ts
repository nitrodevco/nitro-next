import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { ITopLevelContext } from './Data/TopLevelContextParser';
import { TopLevelContextParser } from './Data/TopLevelContextParser';

export type NavigatorMetadataMessageType = {
  topLevelContexts: ITopLevelContext[];
};

export class NavigatorMetadataMessage implements IIncomingPacket<NavigatorMetadataMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NavigatorMetadataMessageType
  {
    const packet: NavigatorMetadataMessageType = {
      topLevelContexts: []
    };

    let count = wrapper.readInt();

    while (count > 0) {
      packet.topLevelContexts.push(TopLevelContextParser(wrapper));

      count--;
    }

    return packet;
  }
}
