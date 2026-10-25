// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BreedPetsComposerType = {
    state: number;
    petId: number;
    otherPetId: number;
};

/** Two monsterplants breeding - `BreedPetsMessageComposer`: state 0 asks, 1 cancels, 2 accepts the other owner's request. */
export class BreedPetsComposer implements IOutgoingPacket<BreedPetsComposerType> {
    public constructor(private params: BreedPetsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.state,
            this.params.petId,
            this.params.otherPetId,
        ];
    }
}
