// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { CraftingIngredientParser } from './Data/CraftingIngredientParser';
import { ICraftingIngredient } from './Data/ICraftingIngredient';

export type CraftingRecipeMessageType = {
    ingredients: ICraftingIngredient[];
};

export class CraftingRecipeMessage implements IIncomingPacket<CraftingRecipeMessageType> {
    public parse(wrapper: IMessageDataWrapper): CraftingRecipeMessageType {
        const packet: CraftingRecipeMessageType = {
            ingredients: ParseArray(wrapper, CraftingIngredientParser),
        };

        return packet;
    }
}
