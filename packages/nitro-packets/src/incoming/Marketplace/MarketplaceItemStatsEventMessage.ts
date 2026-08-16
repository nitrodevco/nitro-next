import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceItemStatsEventMessageType = {
  // no fields

};

export class MarketplaceItemStatsEventMessage implements IIncomingPacket<MarketplaceItemStatsEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MarketplaceItemStatsEventMessageType
  {

    const packet: MarketplaceItemStatsEventMessageType = {
    };

    return packet;
  }
}
