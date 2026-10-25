// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCraftingRecipeComposerType = {
    /** Which recipe to list the ingredients of. */
    recipeCode: string;
};

export class GetCraftingRecipeComposer implements IOutgoingPacket<GetCraftingRecipeComposerType> {
    public constructor(private params: GetCraftingRecipeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.recipeCode,
        ];
    }
}
