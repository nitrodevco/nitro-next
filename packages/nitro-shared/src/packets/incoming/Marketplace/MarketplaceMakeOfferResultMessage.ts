import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceMakeOfferResultMessageType = {
  // no fields

};

export class MarketplaceMakeOfferResultMessage implements IIncomingPacket<MarketplaceMakeOfferResultMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MarketplaceMakeOfferResultMessageType
  {

    const packet: MarketplaceMakeOfferResultMessageType = {
    };

    return packet;
  }
}
