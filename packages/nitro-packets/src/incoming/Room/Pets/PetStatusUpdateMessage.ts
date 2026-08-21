import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetStatusUpdateMessageType = {
  roomIndex: number;
  petId: number;
  canBreed: boolean;
  canHarvest: boolean;
  canRevive: boolean;
  hasBreedingPermission: boolean;
};

export class PetStatusUpdateMessage implements IIncomingPacket<PetStatusUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetStatusUpdateMessageType
  {
    const packet: PetStatusUpdateMessageType = {
      roomIndex: wrapper.readInt(),
      petId: wrapper.readInt(),
      canBreed: wrapper.readBoolean(),
      canHarvest: wrapper.readBoolean(),
      canRevive: wrapper.readBoolean(),
      hasBreedingPermission: wrapper.readBoolean(),
    };

    return packet;
  }
}
