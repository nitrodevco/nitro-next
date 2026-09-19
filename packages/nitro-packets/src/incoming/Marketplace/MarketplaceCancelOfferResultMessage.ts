import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceCancelOfferResultMessageType = {
    offerId: number;
    success: boolean;
};

export class MarketplaceCancelOfferResultMessage implements IIncomingPacket<MarketplaceCancelOfferResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceCancelOfferResultMessageType {
        const offerId = wrapper.readInt();
        const success = wrapper.readBoolean();
        return { offerId, success };
    }
}
