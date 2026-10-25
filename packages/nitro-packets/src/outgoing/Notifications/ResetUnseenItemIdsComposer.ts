// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ResetUnseenItemIdsComposerType = {
    /** The unseen item category the ids belong to (`UnseenItemTracker.resetItems`). */
    category: number;
    /** The ids of that category that have been seen. */
    itemIds: number[];
};

/** Flash `ResetUnseenItemIdsComposer`: the category, the id count, then each id. */
export class ResetUnseenItemIdsComposer implements IOutgoingPacket<ResetUnseenItemIdsComposerType> {
    public constructor(private params: ResetUnseenItemIdsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.category,
            this.params.itemIds.length,
            ...this.params.itemIds,
        ];
    }
}
