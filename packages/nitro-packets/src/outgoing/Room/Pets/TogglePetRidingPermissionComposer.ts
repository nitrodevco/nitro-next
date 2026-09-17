// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TogglePetRidingPermissionComposerType = {
    petId: number;
};

export class TogglePetRidingPermissionComposer implements IOutgoingPacket<TogglePetRidingPermissionComposerType> {
    public constructor(private params: TogglePetRidingPermissionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
