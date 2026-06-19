import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UniqueIdComposerType = {
  machineID: string;
  fingerprint: string;
  flashVersion: string;
};

export class UniqueIdComposer implements IOutgoingPacket<UniqueIdComposerType>
{
  public constructor(private params: UniqueIdComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.machineID,
      this.params.fingerprint,
      this.params.flashVersion,
    ];
  }
}
