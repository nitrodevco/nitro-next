import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCraftingRecipesAvailableComposerType = object;

export class GetCraftingRecipesAvailableComposer implements IOutgoingPacket<GetCraftingRecipesAvailableComposerType> {
    public constructor(private params: GetCraftingRecipesAvailableComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
