// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveSaddleFromPetComposerType = {
    petId: number;
};

export class RemoveSaddleFromPetComposer implements IOutgoingPacket<RemoveSaddleFromPetComposerType> {
    public constructor(private params: RemoveSaddleFromPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
