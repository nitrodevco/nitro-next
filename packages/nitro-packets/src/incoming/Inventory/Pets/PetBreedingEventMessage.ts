import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetBreedingEventMessageType = {
  state: number;
  ownPetId: number;
  otherPetId: number;
};

export class PetBreedingEventMessage implements IIncomingPacket<PetBreedingEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetBreedingEventMessageType
  {
    const packet: PetBreedingEventMessageType = {
      state: wrapper.readInt(),
      ownPetId: wrapper.readInt(),
      otherPetId: wrapper.readInt(),
    };

    return packet;
  }
}
