// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TogglePetBreedingPermissionComposerType = {
    petId: number;
};

/** Lets anyone, or only you, breed with this pet. */
export class TogglePetBreedingPermissionComposer implements IOutgoingPacket<TogglePetBreedingPermissionComposerType> {
    public constructor(private params: TogglePetBreedingPermissionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
