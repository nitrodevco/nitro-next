import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetLevelUpdateMessageType = {
  // no fields

};

export class PetLevelUpdateMessage implements IIncomingPacket<PetLevelUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetLevelUpdateMessageType
  {

    const packet: PetLevelUpdateMessageType = {
    };

    return packet;
  }
}
