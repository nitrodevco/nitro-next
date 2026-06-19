import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MoveWallItemComposerType = {
  objectId: number;
  wallPosition: string;
};

export class MoveWallItemComposer implements IOutgoingPacket<MoveWallItemComposerType>
{
  public constructor(private params: MoveWallItemComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.objectId,
      this.params.wallPosition,
    ];
  }
}
