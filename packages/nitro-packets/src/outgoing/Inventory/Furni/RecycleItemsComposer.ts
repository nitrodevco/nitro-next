// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `RecycleItemsMessageComposer`: the count, then the strip ids of the furni in the slots. */
export type RecycleItemsComposerType = {
    itemIds: number[];
};

export class RecycleItemsComposer implements IOutgoingPacket<RecycleItemsComposerType> {
    public constructor(private params: RecycleItemsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemIds.length,
            ...this.params.itemIds,
        ];
    }
}
