import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingNotOpenEventMessageType = {
  // no fields

};

export class TradingNotOpenEventMessage implements IIncomingPacket<TradingNotOpenEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradingNotOpenEventMessageType
  {

    const packet: TradingNotOpenEventMessageType = {
    };

    return packet;
  }
}
