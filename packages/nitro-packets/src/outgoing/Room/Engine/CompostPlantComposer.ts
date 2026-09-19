// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CompostPlantComposerType = {
    petId: number;
};

/** Composts a dead monsterplant. */
export class CompostPlantComposer implements IOutgoingPacket<CompostPlantComposerType> {
    public constructor(private params: CompostPlantComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
        ];
    }
}
