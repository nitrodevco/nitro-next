import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetStatusUpdateMessageType = {
  // no fields

};

export class PetStatusUpdateMessage implements IIncomingPacket<PetStatusUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetStatusUpdateMessageType
  {

    const packet: PetStatusUpdateMessageType = {
    };

    return packet;
  }
}
