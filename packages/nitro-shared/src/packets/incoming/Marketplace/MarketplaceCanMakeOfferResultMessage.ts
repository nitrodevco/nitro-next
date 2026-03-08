import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceCanMakeOfferResultMessageType = {
  // no fields

};

export class MarketplaceCanMakeOfferResultMessage implements IIncomingPacket<MarketplaceCanMakeOfferResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MarketplaceCanMakeOfferResultMessageType
  {

    const packet: MarketplaceCanMakeOfferResultMessageType = {
    };

    return packet;
  }
}
