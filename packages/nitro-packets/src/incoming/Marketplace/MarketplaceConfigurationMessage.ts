import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceConfigurationMessageType = {
    isEnabled: boolean;
    commission: number;
    tokenBatchPrice: number;
    tokenBatchSize: number;
    offerMaxPrice: number;
    offerMinPrice: number;
    expirationHours: number;
    averagePricePeriod: number;
    sellingFeePercentage: number;
    revenueLimit: number;
    halfTaxLimit: number;
};

export class MarketplaceConfigurationMessage implements IIncomingPacket<MarketplaceConfigurationMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceConfigurationMessageType {
        const isEnabled = wrapper.readBoolean();
        const commission = wrapper.readInt();
        const tokenBatchPrice = wrapper.readInt();
        const tokenBatchSize = wrapper.readInt();
        const offerMinPrice = wrapper.readInt();
        const offerMaxPrice = wrapper.readInt();
        const expirationHours = wrapper.readInt();
        const averagePricePeriod = wrapper.readInt();
        const sellingFeePercentage = wrapper.readInt();
        const revenueLimit = wrapper.readInt();
        const halfTaxLimit = wrapper.readInt();
        return { isEnabled, commission, tokenBatchPrice, tokenBatchSize, offerMaxPrice, offerMinPrice, expirationHours, averagePricePeriod, sellingFeePercentage, revenueLimit, halfTaxLimit };
    }
}
