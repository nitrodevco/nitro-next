import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketplaceBuyOfferResultEventMessageType = {
  // no fields

};

export class MarketplaceBuyOfferResultEventMessage implements IIncomingPacket<MarketplaceBuyOfferResultEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MarketplaceBuyOfferResultEventMessageType
  {

    const packet: MarketplaceBuyOfferResultEventMessageType = {
    };

    return packet;
  }
}
