// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MysteryBoxWaitingCanceledComposerType = {
    /** Whoever put the box down - a box waits for its owner, not for the furni. */
    furnitureOwnerId: number;
};

export class MysteryBoxWaitingCanceledComposer implements IOutgoingPacket<MysteryBoxWaitingCanceledComposerType> {
    public constructor(private params: MysteryBoxWaitingCanceledComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.furnitureOwnerId,
        ];
    }
}
