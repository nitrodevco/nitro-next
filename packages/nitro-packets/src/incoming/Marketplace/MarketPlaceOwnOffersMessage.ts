// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { GetObjectDataForFlags, GetObjectDataFromWrapper, IIncomingPacket, IMessageDataWrapper, IObjectData, ReadLong } from '@nitrodevco/nitro-api';

import { IMarketPlaceOffersOffer } from './Data/IMarketPlaceOffersOffer';

export type MarketPlaceOwnOffersMessageType = {
    offers: IMarketPlaceOffersOffer[];
    creditsWaiting: number;
};

export class MarketPlaceOwnOffersMessage implements IIncomingPacket<MarketPlaceOwnOffersMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketPlaceOwnOffersMessageType {
        const offers: IMarketPlaceOffersOffer[] = [];
        const creditsWaiting = wrapper.readInt();
        const count = wrapper.readInt();

        for (let i = 0; i < count; i++) {
            let furniId = 0;
            let stuffData: IObjectData | undefined;
            let extraData = '';
            const offerId = wrapper.readInt();
            const status = wrapper.readInt();
            let furniType = wrapper.readInt();

            if (furniType === 1 || furniType === 4) {
                furniId = wrapper.readInt();
                stuffData = GetObjectDataFromWrapper(wrapper);
                if (furniType === 4) {
                    wrapper.readBoolean();
                    furniType = 1;
                }
            } else if (furniType === 2) {
                furniId = wrapper.readInt();
                extraData = wrapper.readString();
            } else if (furniType === 3) {
                furniId = wrapper.readInt();
                stuffData = GetObjectDataForFlags(0);
                stuffData.uniqueNumber = wrapper.readInt();
                stuffData.uniqueSeries = wrapper.readInt();
                furniType = 1;
            }
            const price = wrapper.readInt();
            const timeLeftMinutes = wrapper.readInt();
            const averagePrice = wrapper.readInt();
            // Only a sold or expired offer carries the time it changed status.
            const statusTime = (status === 2 || status === 3) ? ReadLong(wrapper) : NaN;
            const offer: IMarketPlaceOffersOffer = { offerId, furniId, furniType, extraData, stuffData, price, status, timeLeftMinutes, averagePrice, offerCount: -1, statusTime };

            if (i < 500) offers.push(offer);
        }

        return { offers, creditsWaiting };
    }
}
