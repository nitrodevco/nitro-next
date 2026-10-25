// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PlacePetComposerType = {
    petId: number;
    /** The tile to drop the pet on; the inventory sends 0,0 and lets the server pick. */
    x: number;
    y: number;
};

export class PlacePetComposer implements IOutgoingPacket<PlacePetComposerType> {
    public constructor(private params: PlacePetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
            this.params.x,
            this.params.y,
        ];
    }
}
