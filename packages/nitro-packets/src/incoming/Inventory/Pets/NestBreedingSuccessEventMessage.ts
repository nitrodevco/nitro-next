import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NestBreedingSuccessEventMessageType = {
  petId: number;
  rarityCategory: number;
};

export class NestBreedingSuccessEventMessage implements IIncomingPacket<NestBreedingSuccessEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): NestBreedingSuccessEventMessageType
  {
    const packet: NestBreedingSuccessEventMessageType = {
      petId: wrapper.readInt(),
      rarityCategory: wrapper.readInt(),
    };

    return packet;
  }
}
