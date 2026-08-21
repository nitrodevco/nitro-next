import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IAreaHideMessageData } from '../../Data/AreaHideMessageDataParser';
import { AreaHideMessageDataParser } from '../../Data/AreaHideMessageDataParser';

export type AreaHideMessageType = {
  areaHideMessageData: IAreaHideMessageData;
};

export class AreaHideMessage implements IIncomingPacket<AreaHideMessageType>
{
  public parse(wrapper: IMessageDataWrapper): AreaHideMessageType
  {
    const packet: AreaHideMessageType = {
      areaHideMessageData: {} as any,
    };

    packet.areaHideMessageData = AreaHideMessageDataParser(wrapper);

    return packet;
  }
}
