import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChargeFireworkComposerType = {
  spriteId: number;
  type: number;
};

export class ChargeFireworkComposer implements IOutgoingPacket<ChargeFireworkComposerType>
{
  public constructor(private params: ChargeFireworkComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.spriteId,
      this.params.type,
    ];
  }
}
