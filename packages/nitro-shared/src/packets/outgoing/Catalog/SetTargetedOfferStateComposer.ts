import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetTargetedOfferStateComposerType = {
  targetedOfferId: number;
  trackingState: number;
};

export class SetTargetedOfferStateComposer implements IOutgoingPacket<SetTargetedOfferStateComposerType>
{
  public constructor(private params: SetTargetedOfferStateComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.targetedOfferId,
      this.params.trackingState,
    ];
  }
}
