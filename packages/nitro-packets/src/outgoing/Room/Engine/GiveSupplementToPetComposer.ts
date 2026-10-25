// Body filled by hand from the AS3 (`GiveSupplementToPetMessageComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GiveSupplementToPetComposerType = {
    petId: number;
    /** `InfoStandWidgetHandler`: 0 water (`RWUAM_GIVE_WATER_TO_PET`), 1 light (`RWUAM_GIVE_LIGHT_TO_PET`). */
    supplementType: number;
};

/** `GiveSupplementToPetMessageComposer`: the pet, then the supplement. */
export class GiveSupplementToPetComposer implements IOutgoingPacket<GiveSupplementToPetComposerType> {
    public constructor(private params: GiveSupplementToPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
            this.params.supplementType,
        ];
    }
}
