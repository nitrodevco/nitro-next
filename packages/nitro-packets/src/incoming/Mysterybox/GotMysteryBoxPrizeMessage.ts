import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GotMysteryBoxPrizeMessageType = {
  // no fields

};

export class GotMysteryBoxPrizeMessage implements IIncomingPacket<GotMysteryBoxPrizeMessageType>
{
  public parse(wrapper: IMessageDataWrapper): GotMysteryBoxPrizeMessageType
  {

    const packet: GotMysteryBoxPrizeMessageType = {
    };

    return packet;
  }
}
