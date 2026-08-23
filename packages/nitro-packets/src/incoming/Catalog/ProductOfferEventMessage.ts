import { ICatalogOffer, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogOfferParser } from './Data/CatalogOfferParser';

export type ProductOfferEventMessageType = {
    offer: ICatalogOffer;
};

export class ProductOfferEventMessage implements IIncomingPacket<ProductOfferEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ProductOfferEventMessageType {
        return {
            offer: CatalogOfferParser(wrapper),
        };
    }
}
