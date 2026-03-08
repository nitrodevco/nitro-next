import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CatalogPageWithEarliestExpiryMessageType = {
  // no fields

};

export class CatalogPageWithEarliestExpiryMessage implements IIncomingPacket<CatalogPageWithEarliestExpiryMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CatalogPageWithEarliestExpiryMessageType
  {

    const packet: CatalogPageWithEarliestExpiryMessageType = {
    };

    return packet;
  }
}
