import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceBuyOfferResultMessageType = {
    result: number;
    offerId: number;
    newPrice: number;
    requestedOfferId: number;
};

export class MarketplaceBuyOfferResultMessage implements IIncomingPacket<MarketplaceBuyOfferResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceBuyOfferResultMessageType {
        const result = wrapper.readInt();
        const offerId = wrapper.readInt();
        const newPrice = wrapper.readInt();
        const requestedOfferId = wrapper.readInt();
        return { result, offerId, newPrice, requestedOfferId };
    }
}
