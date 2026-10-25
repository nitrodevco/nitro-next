// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPetFigureData, PetFigureDataParser } from './PetFigureDataParser';

/** Flash `PetData`: one pet of the pet inventory, as the list and the "added" packet both carry it. */
export interface IPetData {
    id: number;
    name: string;
    figureData: IPetFigureData;
    level: number;
    rarityLevel: number;
}

export const PetDataParser = (wrapper: IMessageDataWrapper): IPetData => ({
    id: wrapper.readInt(),
    name: wrapper.readString(),
    figureData: PetFigureDataParser(wrapper),
    level: wrapper.readInt(),
    rarityLevel: wrapper.readInt(),
});
