// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemovePetFromFlatComposerType = {
    petId: number;
};

export class RemovePetFromFlatComposer implements IOutgoingPacket<RemovePetFromFlatComposerType> {
    public constructor(private params: RemovePetFromFlatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
