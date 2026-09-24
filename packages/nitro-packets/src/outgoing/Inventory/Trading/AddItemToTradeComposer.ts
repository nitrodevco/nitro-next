// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddItemToTradeComposerType = {
    /** The item's strip id (`FurnitureItem.id`). */
    itemId: number;
};

export class AddItemToTradeComposer implements IOutgoingPacket<AddItemToTradeComposerType> {
    public constructor(private params: AddItemToTradeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
        ];
    }
}
