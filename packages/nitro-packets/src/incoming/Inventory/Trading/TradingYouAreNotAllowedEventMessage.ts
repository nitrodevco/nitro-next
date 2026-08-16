import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingYouAreNotAllowedEventMessageType = {
  // no fields

};

export class TradingYouAreNotAllowedEventMessage implements IIncomingPacket<TradingYouAreNotAllowedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradingYouAreNotAllowedEventMessageType
  {

    const packet: TradingYouAreNotAllowedEventMessageType = {
    };

    return packet;
  }
}
