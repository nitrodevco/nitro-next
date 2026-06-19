import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RedeemVoucherComposerType = {
  code: string;
};

export class RedeemVoucherComposer implements IOutgoingPacket<RedeemVoucherComposerType>
{
  public constructor(private params: RedeemVoucherComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.code,
    ];
  }
}
