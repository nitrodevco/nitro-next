import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceCancelOfferResultEventMessageType = object;

export class MarketplaceCancelOfferResultEventMessage implements IIncomingPacket<MarketplaceCancelOfferResultEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceCancelOfferResultEventMessageType {
        const packet: MarketplaceCancelOfferResultEventMessageType = {
        };

        return packet;
    }
}
