import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingCompletedEventMessageType = {
  // no fields

};

export class TradingCompletedEventMessage implements IIncomingPacket<TradingCompletedEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradingCompletedEventMessageType
  {

    const packet: TradingCompletedEventMessageType = {
    };

    return packet;
  }
}
