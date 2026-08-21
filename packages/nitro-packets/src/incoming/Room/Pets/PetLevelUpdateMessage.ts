import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PetLevelUpdateMessageType = {
  roomIndex: number;
  petId: number;
  level: number;
};

export class PetLevelUpdateMessage implements IIncomingPacket<PetLevelUpdateMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PetLevelUpdateMessageType
  {
    const packet: PetLevelUpdateMessageType = {
      roomIndex: wrapper.readInt(),
      petId: wrapper.readInt(),
      level: wrapper.readInt(),
    };

    return packet;
  }
}
