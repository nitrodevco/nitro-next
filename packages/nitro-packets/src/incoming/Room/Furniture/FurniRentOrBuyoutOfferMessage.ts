import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FurniRentOrBuyoutOfferMessageType = {
  isWallItem: boolean;
  furniTypeName: string;
  buyout: boolean;
  priceInCredits: number;
  priceInActivityPoints: number;
  activityPointType: number;
};

export class FurniRentOrBuyoutOfferMessage implements IIncomingPacket<FurniRentOrBuyoutOfferMessageType>
{
  public parse(wrapper: IMessageDataWrapper): FurniRentOrBuyoutOfferMessageType
  {

    const packet: FurniRentOrBuyoutOfferMessageType = {
      isWallItem: wrapper.readBoolean(),
      furniTypeName: wrapper.readString(),
      buyout: wrapper.readBoolean(),
      priceInCredits: wrapper.readInt(),
      priceInActivityPoints: wrapper.readInt(),
      activityPointType: wrapper.readInt(),
    };

    return packet;
  }
}
