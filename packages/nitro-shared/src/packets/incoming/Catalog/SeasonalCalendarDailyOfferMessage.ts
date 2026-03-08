import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type SeasonalCalendarDailyOfferMessageType = {
  // no fields

};

export class SeasonalCalendarDailyOfferMessage implements IIncomingPacket<SeasonalCalendarDailyOfferMessageType>
{
  public parse(wrapper: IMessageDataWrapper): SeasonalCalendarDailyOfferMessageType
  {

    const packet: SeasonalCalendarDailyOfferMessageType = {
    };

    return packet;
  }
}
