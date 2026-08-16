import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetRemovedFromInventoryEventMessageType = {
  // no fields

};

export class PetRemovedFromInventoryEventMessage implements IIncomingPacket<PetRemovedFromInventoryEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetRemovedFromInventoryEventMessageType
  {

    const packet: PetRemovedFromInventoryEventMessageType = {
    };

    return packet;
  }
}
