import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BonusRareInfoMessageType = {
  productType: string;
  productClassId: number;
  totalCoinsForBonus: number;
  coinsStillRequiredToBuy: number;
};

export class BonusRareInfoMessage implements IIncomingPacket<BonusRareInfoMessageType>
{
  public parse(wrapper: IMessageDataWrapper): BonusRareInfoMessageType
  {

    const packet: BonusRareInfoMessageType = {
      productType: wrapper.readString(),
      productClassId: wrapper.readInt(),
      totalCoinsForBonus: wrapper.readInt(),
      coinsStillRequiredToBuy: wrapper.readInt(),
    };

    return packet;
  }
}
