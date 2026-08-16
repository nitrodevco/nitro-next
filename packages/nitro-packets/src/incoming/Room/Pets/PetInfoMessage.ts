import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetInfoMessageType = {
  // no fields

};

export class PetInfoMessage implements IIncomingPacket<PetInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetInfoMessageType
  {

    const packet: PetInfoMessageType = {
    };

    return packet;
  }
}
