// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ICraftingIngredient } from './ICraftingIngredient';

export const CraftingIngredientParser = (wrapper: IMessageDataWrapper): ICraftingIngredient => ({
    count: wrapper.readInt(),
    furnitureClassName: wrapper.readString(),
});
