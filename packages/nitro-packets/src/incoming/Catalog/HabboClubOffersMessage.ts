// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ClubOfferDataParser, IClubOfferData } from './Data/ClubOfferDataParser';

/**
 * Flash's `HabboClubOffersMessageParser`: the club offers, then the `source` the request named
 * (`GetClubOffersComposer`'s `requestSource`), which `HabboCatalog.onHabboClubOffers` filters on.
 */
export type HabboClubOffersMessageType = {
    offers: IClubOfferData[];
    source: number;
};

export class HabboClubOffersMessage implements IIncomingPacket<HabboClubOffersMessageType> {
    public parse(wrapper: IMessageDataWrapper): HabboClubOffersMessageType {
        const offers = ParseArray(wrapper, ClubOfferDataParser);
        const source = wrapper.readInt();

        return { offers, source };
    }
}
