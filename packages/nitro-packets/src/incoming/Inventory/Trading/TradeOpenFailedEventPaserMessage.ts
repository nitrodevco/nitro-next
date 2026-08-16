import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradeOpenFailedEventPaserMessageType = {
  // no fields

};

export class TradeOpenFailedEventPaserMessage implements IIncomingPacket<TradeOpenFailedEventPaserMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradeOpenFailedEventPaserMessageType
  {

    const packet: TradeOpenFailedEventPaserMessageType = {
    };

    return packet;
  }
}
