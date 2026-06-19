import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SSOTicketComposerType = {
  sSO: string;
  elapsedMilliseconds: number;
};

export class SSOTicketComposer implements IOutgoingPacket<SSOTicketComposerType>
{
  public constructor(private params: SSOTicketComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.sSO,
      this.params.elapsedMilliseconds,
    ];
  }
}
