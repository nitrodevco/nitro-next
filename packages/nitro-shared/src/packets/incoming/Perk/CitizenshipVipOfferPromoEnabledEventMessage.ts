import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CitizenshipVipOfferPromoEnabledEventMessageType = {
  // no fields

};

export class CitizenshipVipOfferPromoEnabledEventMessage implements IIncomingPacket<CitizenshipVipOfferPromoEnabledEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CitizenshipVipOfferPromoEnabledEventMessageType
  {

    const packet: CitizenshipVipOfferPromoEnabledEventMessageType = {
    };

    return packet;
  }
}
