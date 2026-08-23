import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceConfigurationEventMessageType = object;

export class MarketplaceConfigurationEventMessage implements IIncomingPacket<MarketplaceConfigurationEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceConfigurationEventMessageType {
        const packet: MarketplaceConfigurationEventMessageType = {
        };

        return packet;
    }
}
