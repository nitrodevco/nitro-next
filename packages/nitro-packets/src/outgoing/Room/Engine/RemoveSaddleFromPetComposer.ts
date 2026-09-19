// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveSaddleFromPetComposerType = {
    petId: number;
};

/** Takes the saddle off a horse. */
export class RemoveSaddleFromPetComposer implements IOutgoingPacket<RemoveSaddleFromPetComposerType> {
    public constructor(private params: RemoveSaddleFromPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
