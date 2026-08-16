import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetAddedToInventoryEventMessageType = {
  // no fields

};

export class PetAddedToInventoryEventMessage implements IIncomingPacket<PetAddedToInventoryEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetAddedToInventoryEventMessageType
  {

    const packet: PetAddedToInventoryEventMessageType = {
    };

    return packet;
  }
}
