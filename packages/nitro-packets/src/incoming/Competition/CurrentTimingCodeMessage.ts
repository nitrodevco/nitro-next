import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CurrentTimingCodeMessageType = {
  // no fields

};

export class CurrentTimingCodeMessage implements IIncomingPacket<CurrentTimingCodeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CurrentTimingCodeMessageType
  {

    const packet: CurrentTimingCodeMessageType = {
    };

    return packet;
  }
}
