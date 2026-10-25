// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ICatalogOffer, IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ClubGiftDataParser, IClubGiftData } from '../Data/ClubGiftDataParser';
import { CatalogOfferParser } from './Data/CatalogOfferParser';

/**
 * Flash's `ClubGiftInfoParser`: the days until the next gift, how many can be picked now, the
 * gifts as catalogue offers (`CatalogPageMessageOfferData`), and each gift's requirement
 * (`ClubGiftData`) keyed by its offer id.
 */
export type ClubGiftInfoEventMessageType = {
    daysUntilNextGift: number;
    giftsAvailable: number;
    offers: ICatalogOffer[];
    giftData: Map<number, IClubGiftData>;
};

export class ClubGiftInfoEventMessage implements IIncomingPacket<ClubGiftInfoEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): ClubGiftInfoEventMessageType {
        const daysUntilNextGift = wrapper.readInt();
        const giftsAvailable = wrapper.readInt();
        const offers = ParseArray(wrapper, CatalogOfferParser);
        const giftData = new Map<number, IClubGiftData>();

        let count = wrapper.readInt();

        while (count > 0) {
            const gift = ClubGiftDataParser(wrapper);

            giftData.set(gift.offerId, gift);

            count--;
        }

        return { daysUntilNextGift, giftsAvailable, offers, giftData };
    }
}
