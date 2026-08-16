import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradeSilverFeeMessageType = {
  // no fields

};

export class TradeSilverFeeMessage implements IIncomingPacket<TradeSilverFeeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradeSilverFeeMessageType
  {

    const packet: TradeSilverFeeMessageType = {
    };

    return packet;
  }
}
