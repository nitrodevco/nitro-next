// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemovePetFromFlatComposerType = {
    petId: number;
};

/** Picks a pet up into the inventory. */
export class RemovePetFromFlatComposer implements IOutgoingPacket<RemovePetFromFlatComposerType> {
    public constructor(private params: RemovePetFromFlatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
