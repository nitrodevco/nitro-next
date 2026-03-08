import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Offer: CatalogOfferSnapshot): Unknown type 'CatalogOfferSnapshot'. Add override mapping.

export type ProductOfferEventMessageType = {
  offer: any;
};

export class ProductOfferEventMessage implements IIncomingPacket<ProductOfferEventMessageType>
{
  public parse(wrapper: IMessageDataWrapper): ProductOfferEventMessageType
  {

    const packet: ProductOfferEventMessageType = {
      offer: undefined as any, // Unknown type 'CatalogOfferSnapshot'. Add override mapping.
    };

    return packet;
  }
}
