// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CancelPetBreedingComposerType = {
    nestId: number;
};

/** Calls the pets back out of a breeding nest. */
export class CancelPetBreedingComposer implements IOutgoingPacket<CancelPetBreedingComposerType> {
    public constructor(private params: CancelPetBreedingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.nestId,
        ];
    }
}
