import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GoToBreedingNestFailureEventMessageType = {
  reason: number;
};

export class GoToBreedingNestFailureEventMessage implements IIncomingPacket<GoToBreedingNestFailureEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GoToBreedingNestFailureEventMessageType
  {
    const packet: GoToBreedingNestFailureEventMessageType = {
      reason: wrapper.readInt(),
    };

    return packet;
  }
}
