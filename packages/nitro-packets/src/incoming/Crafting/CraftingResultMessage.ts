// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CraftableProductParser } from './Data/CraftableProductParser';
import { ICraftableProduct } from './Data/ICraftableProduct';

export type CraftingResultMessageType = {
    success: boolean;
    /** Only sent when it worked; a failure says nothing about what was attempted. */
    productData?: ICraftableProduct;
};

export class CraftingResultMessage implements IIncomingPacket<CraftingResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): CraftingResultMessageType {
        const success = wrapper.readBoolean();

        return {
            success,
            productData: success ? CraftableProductParser(wrapper) : undefined,
        };
    }
}
