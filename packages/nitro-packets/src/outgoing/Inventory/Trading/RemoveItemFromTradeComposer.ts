// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveItemFromTradeComposerType = {
    /** The item's strip id (`FurnitureItem.id`). */
    itemId: number;
};

export class RemoveItemFromTradeComposer implements IOutgoingPacket<RemoveItemFromTradeComposerType> {
    public constructor(private params: RemoveItemFromTradeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
        ];
    }
}
