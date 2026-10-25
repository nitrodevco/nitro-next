// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetBreedingResultData, PetBreedingResultDataParser } from './Data/PetBreedingResultDataParser';

export type PetBreedingResultEventMessageType = {
    /** Your seed, then the other owner's. */
    resultData: IPetBreedingResultData;
    otherResultData: IPetBreedingResultData;
};

/** What two bred monsterplants produced. */
export class PetBreedingResultEventMessage implements IIncomingPacket<PetBreedingResultEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): PetBreedingResultEventMessageType {
        return {
            resultData: PetBreedingResultDataParser(wrapper),
            otherResultData: PetBreedingResultDataParser(wrapper),
        };
    }
}
