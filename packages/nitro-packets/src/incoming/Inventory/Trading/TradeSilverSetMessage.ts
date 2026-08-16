import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradeSilverSetMessageType = {
  // no fields

};

export class TradeSilverSetMessage implements IIncomingPacket<TradeSilverSetMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradeSilverSetMessageType
  {

    const packet: TradeSilverSetMessageType = {
    };

    return packet;
  }
}
