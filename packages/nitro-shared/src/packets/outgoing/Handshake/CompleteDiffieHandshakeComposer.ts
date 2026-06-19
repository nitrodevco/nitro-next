import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CompleteDiffieHandshakeComposerType = {
  sharedKey: string;
};

export class CompleteDiffieHandshakeComposer implements IOutgoingPacket<CompleteDiffieHandshakeComposerType>
{
  public constructor(private params: CompleteDiffieHandshakeComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.sharedKey,
    ];
  }
}
