import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type MarketPlaceOffersEventMessageType = {
  // no fields

};

export class MarketPlaceOffersEventMessage implements IIncomingPacket<MarketPlaceOffersEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): MarketPlaceOffersEventMessageType
  {

    const packet: MarketPlaceOffersEventMessageType = {
    };

    return packet;
  }
}
