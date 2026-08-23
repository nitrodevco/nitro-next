import { ICatalogOffer, IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CatalogOfferAsPurchasedParser } from './Data/CatalogOfferAsPurchasedParser';

export type PurchaseOKMessageType = {
    offer: ICatalogOffer;
};

export class PurchaseOKMessage implements IIncomingPacket<PurchaseOKMessageType> {
    public parse(wrapper: IMessageDataWrapper): PurchaseOKMessageType {
        return {
            offer: CatalogOfferAsPurchasedParser(wrapper),
        };
    }
}
