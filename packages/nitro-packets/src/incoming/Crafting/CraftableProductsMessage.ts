// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray, ParseStrings } from '@nitrodevco/nitro-api';

import { CraftableProductParser } from './Data/CraftableProductParser';
import { ICraftableProduct } from './Data/ICraftableProduct';

export type CraftableProductsMessageType = {
    recipeProductItems: ICraftableProduct[];
    /** Which of your furni the table will accept as an ingredient. */
    usableInventoryFurniClasses: string[];
};

export class CraftableProductsMessage implements IIncomingPacket<CraftableProductsMessageType> {
    public parse(wrapper: IMessageDataWrapper): CraftableProductsMessageType {
        const packet: CraftableProductsMessageType = {
            recipeProductItems: ParseArray(wrapper, CraftableProductParser),
            usableInventoryFurniClasses: ParseStrings(wrapper),
        };

        return packet;
    }
}
