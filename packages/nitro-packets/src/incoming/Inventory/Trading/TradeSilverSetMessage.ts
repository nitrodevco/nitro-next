import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradeSilverSetMessageType = {
  playerSilver: number;
  otherPlayerSilver: number;
};

export class TradeSilverSetMessage implements IIncomingPacket<TradeSilverSetMessageType>
{
  public parse(wrapper: IMessageDataWrapper): TradeSilverSetMessageType
  {
    const packet: TradeSilverSetMessageType = {
      playerSilver: wrapper.readInt(),
      otherPlayerSilver: wrapper.readInt(),
    };

    return packet;
  }
}
