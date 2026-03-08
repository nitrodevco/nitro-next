import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Offer: CatalogOfferSnapshot): Unknown type 'CatalogOfferSnapshot'. Add override mapping.

export type PurchaseOKMessageType = {
  offer: any;
};

export class PurchaseOKMessage implements IIncomingPacket<PurchaseOKMessageType>
{
  public parse(wrapper: IMessageDataWrapper): PurchaseOKMessageType
  {

    const packet: PurchaseOKMessageType = {
      offer: undefined as any, // Unknown type 'CatalogOfferSnapshot'. Add override mapping.
    };

    return packet;
  }
}
