// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * Flash `MarketplaceItemStatsEvent` (parser `§_-T18§`): the price history of one furni type - a
 * day offset, an average price and a sold amount per day - then which furni it is about.
 */
export type MarketplaceItemStatsMessageType = {
    averagePrice: number;
    offerCount: number;
    historyLength: number;
    dayOffsets: number[];
    averagePrices: number[];
    soldAmounts: number[];
    furniCategoryId: number;
    furniTypeId: number;
    lowestCurrentPrice: number;
    suggestedPrice: number;
};

export class MarketplaceItemStatsMessage implements IIncomingPacket<MarketplaceItemStatsMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceItemStatsMessageType {
        const dayOffsets: number[] = [];
        const averagePrices: number[] = [];
        const soldAmounts: number[] = [];
        const averagePrice = wrapper.readInt();
        const offerCount = wrapper.readInt();
        const historyLength = wrapper.readInt();
        const count = wrapper.readInt();

        for (let i = 0; i < count; i++) {
            dayOffsets.push(wrapper.readInt());
            averagePrices.push(wrapper.readInt());
            soldAmounts.push(wrapper.readInt());
        }

        const furniCategoryId = wrapper.readInt();
        const furniTypeId = wrapper.readInt();
        const lowestCurrentPrice = wrapper.readInt();
        const suggestedPrice = wrapper.readInt();

        return { averagePrice, offerCount, historyLength, dayOffsets, averagePrices, soldAmounts, furniCategoryId, furniTypeId, lowestCurrentPrice, suggestedPrice };
    }
}
