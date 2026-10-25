// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { GetObjectDataForFlags, GetObjectDataFromWrapper, IIncomingPacket, IMessageDataWrapper, IObjectData } from '@nitrodevco/nitro-api';

import { IMarketPlaceOffersOffer } from './Data/IMarketPlaceOffersOffer';

export type MarketPlaceOffersMessageType = {
    offers: IMarketPlaceOffersOffer[];
    totalItemsFound: number;
};

export class MarketPlaceOffersMessage implements IIncomingPacket<MarketPlaceOffersMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketPlaceOffersMessageType {
        const offers: IMarketPlaceOffersOffer[] = [];
        const count = wrapper.readInt();

        for (let i = 0; i < count; i++) {
            let furniId = 0;
            let isUsable = false;
            let isUsed = false;
            let extraData = '';
            let stuffData: IObjectData | undefined;
            const offerId = wrapper.readInt();
            const status = wrapper.readInt();
            let furniType = wrapper.readInt();

            if (furniType === 1 || furniType === 4) {
                furniId = wrapper.readInt();
                stuffData = GetObjectDataFromWrapper(wrapper);
                isUsable = furniType === 4;
                if (isUsable) {
                    isUsed = wrapper.readBoolean();
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
            const offerCount = wrapper.readInt();
            const offer: IMarketPlaceOffersOffer = { offerId, furniId, furniType, extraData, stuffData, price, status, timeLeftMinutes, averagePrice, offerCount, statusTime: NaN, isUsable, isUsed };

            // The client keeps the first 500 offers and only reads past the rest.
            if (i < 500) offers.push(offer);
        }

        const totalItemsFound = wrapper.readInt();
        return { offers, totalItemsFound };
    }
}
