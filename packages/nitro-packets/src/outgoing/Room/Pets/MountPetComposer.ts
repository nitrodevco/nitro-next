// Body filled by hand from the 2026 client's own composer - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MountPetComposerType = {
    petId: number;
    /** The one composer does both: true climbs on, false gets off. */
    mount: boolean;
};

export class MountPetComposer implements IOutgoingPacket<MountPetComposerType> {
    public constructor(private params: MountPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
            this.params.mount,
        ];
    }
}
