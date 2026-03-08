import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

// TODO(Catalog: CatalogSnapshot): Unknown type 'CatalogSnapshot'. Add override mapping.

export type CatalogIndexMessageType = {
  catalog: any;
  newAdditionsAvailable: boolean;
};

export class CatalogIndexMessage implements IIncomingPacket<CatalogIndexMessageType>
{
  public parse(wrapper: IMessageDataWrapper): CatalogIndexMessageType
  {

    const packet: CatalogIndexMessageType = {
      catalog: undefined as any, // Unknown type 'CatalogSnapshot'. Add override mapping.
      newAdditionsAvailable: wrapper.readBoolean(),
    };

    return packet;
  }
}
