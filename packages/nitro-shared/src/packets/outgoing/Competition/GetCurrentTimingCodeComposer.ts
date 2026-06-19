import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCurrentTimingCodeComposerType = {
  slotConfig: string;
};

export class GetCurrentTimingCodeComposer implements IOutgoingPacket<GetCurrentTimingCodeComposerType>
{
  public constructor(private params: GetCurrentTimingCodeComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.slotConfig,
    ];
  }
}
