// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PetSelectedComposerType = {
    petId: number;
};

export class PetSelectedComposer implements IOutgoingPacket<PetSelectedComposerType> {
    public constructor(private params: PetSelectedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
