// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MoveAvatarComposerType = {
    targetX: number;
    targetY: number;
};

export class MoveAvatarComposer implements IOutgoingPacket<MoveAvatarComposerType> {
    public constructor(private params: MoveAvatarComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.targetX,
            this.params.targetY,
        ];
    }
}
