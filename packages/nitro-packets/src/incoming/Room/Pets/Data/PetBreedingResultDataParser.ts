// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One of the two seeds a plant breeding produced; `stuffId` is -1 for the owner who got nothing. */
export interface IPetBreedingResultData {
    stuffId: number;
    classId: number;
    productCode: string;
    userId: number;
    userName: string;
    rarityLevel: number;
    hasMutation: boolean;
}

export const PetBreedingResultDataParser = (wrapper: IMessageDataWrapper): IPetBreedingResultData => ({
    stuffId: wrapper.readInt(),
    classId: wrapper.readInt(),
    productCode: wrapper.readString(),
    userId: wrapper.readInt(),
    userName: wrapper.readString(),
    rarityLevel: wrapper.readInt(),
    hasMutation: wrapper.readBoolean(),
});
