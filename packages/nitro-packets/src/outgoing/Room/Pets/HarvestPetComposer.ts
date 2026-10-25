// Added by hand: the generator did not emit this one, though its header id is already known.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type HarvestPetComposerType = {
    petId: number;
};

export class HarvestPetComposer implements IOutgoingPacket<HarvestPetComposerType> {
    public constructor(private params: HarvestPetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
