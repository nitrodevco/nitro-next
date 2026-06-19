import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UseWallItemComposerType = {
  objectId: number;
  param: number;
};

export class UseWallItemComposer implements IOutgoingPacket<UseWallItemComposerType>
{
  public constructor(private params: UseWallItemComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.objectId,
      this.params.param,
    ];
  }
}
