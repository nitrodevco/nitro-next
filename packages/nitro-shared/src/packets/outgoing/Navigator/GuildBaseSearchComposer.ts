import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuildBaseSearchComposerType = {
  unknown: number;
};

export class GuildBaseSearchComposer implements IOutgoingPacket<GuildBaseSearchComposerType>
{
  public constructor(private params: GuildBaseSearchComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.unknown,
    ];
  }
}
