// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISnowWarGameTokenOffer, SnowWarGameTokenOfferParser } from '../Data/SnowWarGameTokenOfferParser';

export type SnowWarGameTokensMessageType = {
    offers: ISnowWarGameTokenOffer[];
};

/** `SnowWarGameTokensMessageEvent` (`SnowWarGameTokensMessageParser`): the answer to `GetSnowWarGameTokensOfferComposer`. */
export class SnowWarGameTokensMessage implements IIncomingPacket<SnowWarGameTokensMessageType> {
    public parse(wrapper: IMessageDataWrapper): SnowWarGameTokensMessageType {
        const packet: SnowWarGameTokensMessageType = {
            offers: [],
        };

        let count = wrapper.readInt();

        while (count > 0) {
            packet.offers.push(SnowWarGameTokenOfferParser(wrapper));
            count--;
        }

        return packet;
    }
}
