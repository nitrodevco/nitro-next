import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GoToBreedingNestFailureEventMessageType = {
  // no fields

};

export class GoToBreedingNestFailureEventMessage implements IIncomingPacket<GoToBreedingNestFailureEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GoToBreedingNestFailureEventMessageType
  {

    const packet: GoToBreedingNestFailureEventMessageType = {
    };

    return packet;
  }
}
