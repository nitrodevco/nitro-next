import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradeSilverFeeMessageType = {
  silverFee: number;
};

export class TradeSilverFeeMessage implements IIncomingPacket<TradeSilverFeeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradeSilverFeeMessageType
  {
    const packet: TradeSilverFeeMessageType = {
      silverFee: wrapper.readInt(),
    };

    return packet;
  }
}
