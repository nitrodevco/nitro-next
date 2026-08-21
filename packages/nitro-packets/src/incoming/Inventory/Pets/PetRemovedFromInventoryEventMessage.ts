import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetRemovedFromInventoryEventMessageType = {
  petId: number;
};

export class PetRemovedFromInventoryEventMessage implements IIncomingPacket<PetRemovedFromInventoryEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetRemovedFromInventoryEventMessageType
  {
    const packet: PetRemovedFromInventoryEventMessageType = {
      petId: wrapper.readInt(),
    };

    return packet;
  }
}
