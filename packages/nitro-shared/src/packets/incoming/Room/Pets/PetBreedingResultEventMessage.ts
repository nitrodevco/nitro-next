import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetBreedingResultEventMessageType = {
  // no fields

};

export class PetBreedingResultEventMessage implements IIncomingPacket<PetBreedingResultEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetBreedingResultEventMessageType
  {

    const packet: PetBreedingResultEventMessageType = {
    };

    return packet;
  }
}
