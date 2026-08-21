import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RemainingMutePeriodMessageType = {
  secondsRemaining: number;
};

export class RemainingMutePeriodMessage implements IIncomingPacket<RemainingMutePeriodMessageType>
{
  public parse(wrapper: IMessageDataWrapper): RemainingMutePeriodMessageType
  {
    const packet: RemainingMutePeriodMessageType = {
      secondsRemaining: wrapper.readInt(),
    };

    return packet;
  }
}
