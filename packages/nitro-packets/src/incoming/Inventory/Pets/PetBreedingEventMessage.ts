import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetBreedingEventMessageType = {
  // no fields

};

export class PetBreedingEventMessage implements IIncomingPacket<PetBreedingEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetBreedingEventMessageType
  {

    const packet: PetBreedingEventMessageType = {
    };

    return packet;
  }
}
