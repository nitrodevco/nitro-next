import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SelectClubGiftComposerType = {
  productCode: string;
};

export class SelectClubGiftComposer implements IOutgoingPacket<SelectClubGiftComposerType>
{
  public constructor(private params: SelectClubGiftComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.productCode,
    ];
  }
}
