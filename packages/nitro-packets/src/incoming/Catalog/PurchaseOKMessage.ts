import { ICatalogOffer, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogOfferParser } from './Data/CatalogOfferParser';

export type PurchaseOKMessageType = {
    offer: ICatalogOffer;
};

export class PurchaseOKMessage implements IIncomingPacket<PurchaseOKMessageType> {
    public parse(wrapper: IMessageDataWrapper): PurchaseOKMessageType {
        return {
            offer: CatalogOfferParser(wrapper)
        }
    }
}
