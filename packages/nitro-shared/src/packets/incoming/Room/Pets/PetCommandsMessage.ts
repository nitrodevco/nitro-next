import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetCommandsMessageType = {
  // no fields

};

export class PetCommandsMessage implements IIncomingPacket<PetCommandsMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetCommandsMessageType
  {

    const packet: PetCommandsMessageType = {
    };

    return packet;
  }
}
