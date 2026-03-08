import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetReceivedMessageType = {
  // no fields

};

export class PetReceivedMessage implements IIncomingPacket<PetReceivedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetReceivedMessageType
  {

    const packet: PetReceivedMessageType = {
    };

    return packet;
  }
}
