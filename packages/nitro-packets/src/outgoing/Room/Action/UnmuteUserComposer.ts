// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UnmuteUserComposerType = {
    userId: number;
    roomId: number;
};

export class UnmuteUserComposer implements IOutgoingPacket<UnmuteUserComposerType> {
    public constructor(private params: UnmuteUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.userId,
            this.params.roomId,
        ];
    }
}
