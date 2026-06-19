import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCatalogIndexComposerType = {
  catalogType: CatalogType;
};

export class GetCatalogIndexComposer implements IOutgoingPacket<GetCatalogIndexComposerType>
{
  public constructor(private params: GetCatalogIndexComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.catalogType,
    ];
  }
}
