// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCraftingRecipesAvailableComposerType = {
    objectId: number;
    /** What is in the mixer right now. */
    itemIds: number[];
};

export class GetCraftingRecipesAvailableComposer implements IOutgoingPacket<GetCraftingRecipesAvailableComposerType> {
    public constructor(private params: GetCraftingRecipesAvailableComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
            this.params.itemIds.length,
            ...this.params.itemIds,
        ];
    }
}
