import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetRespectFailedMessageType = {
  // no fields

};

export class PetRespectFailedMessage implements IIncomingPacket<PetRespectFailedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetRespectFailedMessageType
  {

    const packet: PetRespectFailedMessageType = {
    };

    return packet;
  }
}
