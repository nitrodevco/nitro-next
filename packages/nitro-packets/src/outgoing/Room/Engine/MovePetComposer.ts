// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MovePetComposerType = {
    petId: number;
    x: number;
    y: number;
    direction: number;
};

/** A pet (in practice a monsterplant) moved or turned by its owner; the direction is in eighths of a turn. */
export class MovePetComposer implements IOutgoingPacket<MovePetComposerType> {
    public constructor(private params: MovePetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.petId,
            this.params.x,
            this.params.y,
            this.params.direction,
        ];
    }
}
