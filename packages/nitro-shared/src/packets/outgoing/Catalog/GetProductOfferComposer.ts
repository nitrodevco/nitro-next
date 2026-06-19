import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetProductOfferComposerType = {
  offerId: number;
};

export class GetProductOfferComposer implements IOutgoingPacket<GetProductOfferComposerType>
{
  public constructor(private params: GetProductOfferComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.offerId,
    ];
  }
}
