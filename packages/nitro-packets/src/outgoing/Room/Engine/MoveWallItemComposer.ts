// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MoveWallItemComposerType = {
    objectId: number;
    wallPosition: string;
};

export class MoveWallItemComposer implements IOutgoingPacket<MoveWallItemComposerType> {
    public constructor(private params: MoveWallItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.wallPosition,
        ];
    }
}
