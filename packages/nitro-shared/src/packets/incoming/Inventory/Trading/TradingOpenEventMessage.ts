import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingOpenEventMessageType = {
  // no fields

};

export class TradingOpenEventMessage implements IIncomingPacket<TradingOpenEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradingOpenEventMessageType
  {

    const packet: TradingOpenEventMessageType = {
    };

    return packet;
  }
}
