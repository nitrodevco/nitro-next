import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseFromCatalogAsGiftComposerType = {
  pageId: number;
  offerCode: number;
  extraParam: string;
  recieverName: string;
  message: string;
  boxStuffTypeId: number;
  boxTypeId: number;
  ribbonTypeId: number;
  showPurchaserName: boolean;
};

export class PurchaseFromCatalogAsGiftComposer implements IOutgoingPacket<PurchaseFromCatalogAsGiftComposerType>
{
  public constructor(private params: PurchaseFromCatalogAsGiftComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.pageId,
      this.params.offerCode,
      this.params.extraParam,
      this.params.recieverName,
      this.params.message,
      this.params.boxStuffTypeId,
      this.params.boxTypeId,
      this.params.ribbonTypeId,
      this.params.showPurchaserName,
    ];
  }
}
