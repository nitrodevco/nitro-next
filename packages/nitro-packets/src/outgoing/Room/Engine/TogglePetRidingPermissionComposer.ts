// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TogglePetRidingPermissionComposerType = {
    petId: number;
};

/** Lets anyone, or only you, ride this horse. */
export class TogglePetRidingPermissionComposer implements IOutgoingPacket<TogglePetRidingPermissionComposerType> {
    public constructor(private params: TogglePetRidingPermissionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
