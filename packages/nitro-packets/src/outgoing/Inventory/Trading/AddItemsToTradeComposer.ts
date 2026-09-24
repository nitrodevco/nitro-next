// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddItemsToTradeComposerType = {
    /** The items' strip ids, the count first. */
    itemIds: readonly number[];
};

export class AddItemsToTradeComposer implements IOutgoingPacket<AddItemsToTradeComposerType> {
    public constructor(private params: AddItemsToTradeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemIds.length,
            ...this.params.itemIds,
        ];
    }
}
