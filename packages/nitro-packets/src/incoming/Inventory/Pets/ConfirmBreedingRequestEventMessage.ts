// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BreedingPetInfoParser, IBreedingPetInfo } from '../../Data/BreedingPetInfoParser';
import { IRarityCategoryData, RarityCategoryDataParser } from '../../Data/RarityCategoryDataParser';

export type ConfirmBreedingRequestEventMessageType = {
    nestId: number;
    pet1: IBreedingPetInfo;
    pet2: IBreedingPetInfo;
    rarityCategories: IRarityCategoryData[];
    resultPetType: number;
};

export class ConfirmBreedingRequestEventMessage implements IIncomingPacket<ConfirmBreedingRequestEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ConfirmBreedingRequestEventMessageType {
        const nestId = wrapper.readInt();
        const pet1 = BreedingPetInfoParser(wrapper);
        const pet2 = BreedingPetInfoParser(wrapper);
        const rarityCategories: IRarityCategoryData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            rarityCategories.push(RarityCategoryDataParser(wrapper));
            count--;
        }

        const resultPetType = wrapper.readInt();

        return { nestId, pet1, pet2, rarityCategories, resultPetType };
    }
}
