import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetPlacingErrorMessageType = {
  // no fields

};

export class PetPlacingErrorMessage implements IIncomingPacket<PetPlacingErrorMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetPlacingErrorMessageType
  {

    const packet: PetPlacingErrorMessageType = {
    };

    return packet;
  }
}
