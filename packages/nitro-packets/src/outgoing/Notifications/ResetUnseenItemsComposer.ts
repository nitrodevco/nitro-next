// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ResetUnseenItemsComposerType = {
    /** The unseen item category (`UnseenItemTracker.resetCategory`), 8 for habbicons. */
    category: number;
};

/** Flash `ResetUnseenItemsComposer`: every item of the category has been seen. */
export class ResetUnseenItemsComposer implements IOutgoingPacket<ResetUnseenItemsComposerType> {
    public constructor(private params: ResetUnseenItemsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.category,
        ];
    }
}
