import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceItemStatsMessageType = {
    averagePrice: number;
    offerCount: number;
    historyLength: number;
    furniTypeId: number;
    furniCategoryId: number;
    lowestCurrentPrice: number;
    suggestedPrice: number;
};

export class MarketplaceItemStatsMessage implements IIncomingPacket<MarketplaceItemStatsMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceItemStatsMessageType {
        const dayOffsets: unknown[] = [];
        const averagePrices: unknown[] = [];
        const soldAmounts: unknown[] = [];
        const averagePrice = wrapper.readInt();
        const offerCount = wrapper.readInt();
        const historyLength = wrapper.readInt();
        const count = wrapper.readInt();
        for (let i2 = 0; i2 < count; i2++) {
            dayOffsets.push(wrapper.readInt());
            averagePrices.push(wrapper.readInt());
            soldAmounts.push(wrapper.readInt());
        }
        const furniCategoryId = wrapper.readInt();
        const furniTypeId = wrapper.readInt();
        const lowestCurrentPrice = wrapper.readInt();
        const suggestedPrice = wrapper.readInt();
        return { averagePrice, offerCount, historyLength, furniTypeId, furniCategoryId, lowestCurrentPrice, suggestedPrice };
    }
}
