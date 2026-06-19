import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApplySnapshotComposerType = {
  id: number;
};

export class ApplySnapshotComposer implements IOutgoingPacket<ApplySnapshotComposerType>
{
  public constructor(private params: ApplySnapshotComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.id,
    ];
  }
}
