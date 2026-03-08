import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RemainingMutePeriodMessageType = {
  // no fields

};

export class RemainingMutePeriodMessage implements IIncomingPacket<RemainingMutePeriodMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RemainingMutePeriodMessageType
  {

    const packet: RemainingMutePeriodMessageType = {
    };

    return packet;
  }
}
