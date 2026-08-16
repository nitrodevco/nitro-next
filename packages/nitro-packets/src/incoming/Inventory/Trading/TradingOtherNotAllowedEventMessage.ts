import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingOtherNotAllowedEventMessageType = {
  // no fields

};

export class TradingOtherNotAllowedEventMessage implements IIncomingPacket<TradingOtherNotAllowedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradingOtherNotAllowedEventMessageType
  {

    const packet: TradingOtherNotAllowedEventMessageType = {
    };

    return packet;
  }
}
