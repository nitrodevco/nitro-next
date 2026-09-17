// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TogglePetBreedingPermissionComposerType = {
    petId: number;
};

export class TogglePetBreedingPermissionComposer implements IOutgoingPacket<TogglePetBreedingPermissionComposerType> {
    public constructor(private params: TogglePetBreedingPermissionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
