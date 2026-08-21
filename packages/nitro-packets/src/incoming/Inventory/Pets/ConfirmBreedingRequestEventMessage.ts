import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import type { IBreedingPetInfo } from '../../Data/BreedingPetInfoParser';
import { BreedingPetInfoParser } from '../../Data/BreedingPetInfoParser';
import type { IRarityCategoryData } from '../../Data/RarityCategoryDataParser';
import { RarityCategoryDataParser } from '../../Data/RarityCategoryDataParser';

export type ConfirmBreedingRequestEventMessageType = {
  nestId: number;
  pet1: IBreedingPetInfo;
  pet2: IBreedingPetInfo;
  rarityCategories: IRarityCategoryData[];
  resultPetType: number;
};

export class ConfirmBreedingRequestEventMessage implements IIncomingPacket<ConfirmBreedingRequestEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ConfirmBreedingRequestEventMessageType
  {
    const packet: ConfirmBreedingRequestEventMessageType = {
      nestId: 0,
      pet1: {} as any,
      pet2: {} as any,
      rarityCategories: [],
      resultPetType: 0,
    };

    packet.nestId = wrapper.readInt();
    packet.pet1 = BreedingPetInfoParser(wrapper);
    packet.pet2 = BreedingPetInfoParser(wrapper);
    let v1 = wrapper.readInt();
    while (v1 > 0) {
        packet.rarityCategories.push(RarityCategoryDataParser(wrapper));
        v1--;
    }
    packet.resultPetType = wrapper.readInt();

    return packet;
  }
}
