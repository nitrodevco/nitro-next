// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MoveEntityInFlatComposerType = {
    objectId: number;
    x: number;
    y: number;
    direction: number;
};

/** A rentable bot moved or turned, addressed by its room object id; the direction is in eighths of a turn. */
export class MoveEntityInFlatComposer implements IOutgoingPacket<MoveEntityInFlatComposerType> {
    public constructor(private params: MoveEntityInFlatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.x,
            this.params.y,
            this.params.direction,
        ];
    }
}
