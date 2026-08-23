import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISnowWarGameTokenOffer, SnowWarGameTokenOfferParser } from '../Data/SnowWarGameTokenOfferParser';

export type SnowWarGameTokensMessageMessageType = {
    offers: ISnowWarGameTokenOffer[];
};

export class SnowWarGameTokensMessageMessage implements IIncomingPacket<SnowWarGameTokensMessageMessageType> {
    public parse(wrapper: IMessageDataWrapper): SnowWarGameTokensMessageMessageType {
        const packet: SnowWarGameTokensMessageMessageType = {
            offers: [],
        };

        let v1 = wrapper.readInt();
        while (v1 > 0) {
            packet.offers.push(SnowWarGameTokenOfferParser(wrapper));
            v1--;
        }

        return packet;
    }
}
