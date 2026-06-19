import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCraftingRecipeComposerType = object;

export class GetCraftingRecipeComposer implements IOutgoingPacket<GetCraftingRecipeComposerType> {
    public constructor(private params: GetCraftingRecipeComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
