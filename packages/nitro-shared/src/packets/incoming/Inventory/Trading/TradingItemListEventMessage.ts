import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingItemListEventMessageType = {
  // no fields

};

export class TradingItemListEventMessage implements IIncomingPacket<TradingItemListEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradingItemListEventMessageType
  {

    const packet: TradingItemListEventMessageType = {
    };

    return packet;
  }
}
