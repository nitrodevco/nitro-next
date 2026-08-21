import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IHabboGroupDetailsData } from '../Data/HabboGroupDetailsDataParser';
import { HabboGroupDetailsDataParser } from '../Data/HabboGroupDetailsDataParser';

export type HabboGroupDetailsMessageType = {
  data: IHabboGroupDetailsData;
};

export class HabboGroupDetailsMessage implements IIncomingPacket<HabboGroupDetailsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): HabboGroupDetailsMessageType
  {
    const packet: HabboGroupDetailsMessageType = {
      data: HabboGroupDetailsDataParser(wrapper),
    };

    return packet;
  }
}
