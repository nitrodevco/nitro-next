import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CatalogPublishedMessageType = {
  // no fields

};

export class CatalogPublishedMessage implements IIncomingPacket<CatalogPublishedMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CatalogPublishedMessageType
  {

    const packet: CatalogPublishedMessageType = {
    };

    return packet;
  }
}
