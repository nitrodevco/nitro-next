import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetExperienceMessageType = {
  // no fields

};

export class PetExperienceMessage implements IIncomingPacket<PetExperienceMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetExperienceMessageType
  {

    const packet: PetExperienceMessageType = {
    };

    return packet;
  }
}
