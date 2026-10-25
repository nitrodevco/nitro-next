// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ICraftableProduct } from './ICraftableProduct';

export const CraftableProductParser = (wrapper: IMessageDataWrapper): ICraftableProduct => ({
    recipeCode: wrapper.readString(),
    productCode: wrapper.readString(),
    furnitureClassName: wrapper.readString(),
});
