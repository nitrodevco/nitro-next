// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPetInfoComposerType = {
    /** The pet's own id, which is its room user's `webID`. */
    petId: number;
};

export class GetPetInfoComposer implements IOutgoingPacket<GetPetInfoComposerType> {
    public constructor(private params: GetPetInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
