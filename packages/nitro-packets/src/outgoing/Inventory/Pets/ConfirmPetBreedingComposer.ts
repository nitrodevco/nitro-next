// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ConfirmPetBreedingComposerType = {
    nestId: number;
    name: string;
    petId: number;
    otherPetId: number;
};

/** Breeds the two pets in a nest and names the baby. */
export class ConfirmPetBreedingComposer implements IOutgoingPacket<ConfirmPetBreedingComposerType> {
    public constructor(private params: ConfirmPetBreedingComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.nestId,
            this.params.name,
            this.params.petId,
            this.params.otherPetId,
        ];
    }
}
