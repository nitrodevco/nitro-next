import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketPlaceOwnOffersEventMessageType = object;

export class MarketPlaceOwnOffersEventMessage implements IIncomingPacket<MarketPlaceOwnOffersEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketPlaceOwnOffersEventMessageType {
        const packet: MarketPlaceOwnOffersEventMessageType = {
        };

        return packet;
    }
}
