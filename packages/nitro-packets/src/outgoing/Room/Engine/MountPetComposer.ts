// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MountPetComposerType = {
    petId: number;
    mount: boolean;
};

/** Climb onto a horse, or off it. */
export class MountPetComposer implements IOutgoingPacket<MountPetComposerType> {
    public constructor(private params: MountPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
            this.params.mount,
        ];
    }
}
