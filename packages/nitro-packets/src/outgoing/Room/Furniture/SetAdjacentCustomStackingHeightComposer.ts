// Body filled by hand from the AS3 (`SetAdjacentCustomStackingHeightComposer`) - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetAdjacentCustomStackingHeightComposerType = {
    objectId: number;
    /** The helper's move-down button; false for move-up. The server picks the next stacking height that way. */
    down: boolean;
};

export class SetAdjacentCustomStackingHeightComposer implements IOutgoingPacket<SetAdjacentCustomStackingHeightComposerType> {
    public constructor(private params: SetAdjacentCustomStackingHeightComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.down,
        ];
    }
}
