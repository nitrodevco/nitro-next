import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCatalogPageComposerType = {
  pageId: number;
  offerId: number;
  catalogType: CatalogType;
};

export class GetCatalogPageComposer implements IOutgoingPacket<GetCatalogPageComposerType>
{
  public constructor(private params: GetCatalogPageComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.pageId,
      this.params.offerId,
      this.params.catalogType,
    ];
  }
}
