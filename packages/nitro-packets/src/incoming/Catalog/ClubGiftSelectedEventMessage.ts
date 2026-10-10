// Body filled by hand from the AS3 parser - the generator has no preserve step, so re-apply after a regeneration.
import { ICatalogProduct, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogProductParser } from './Data/CatalogProductParser';

/** Flash `ClubGiftSelectedEvent`'s parser: the club gift picked, and its products (`CatalogPageMessageProductData`). */
export type ClubGiftSelectedEventMessageType = {
    productCode: string;
    products: ICatalogProduct[];
};

export class ClubGiftSelectedEventMessage implements IIncomingPacket<ClubGiftSelectedEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ClubGiftSelectedEventMessageType {
        const productCode = wrapper.readString();
        const products: ICatalogProduct[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            products.push(CatalogProductParser(wrapper));
            count--;
        }

        return { productCode, products };
    }
}
