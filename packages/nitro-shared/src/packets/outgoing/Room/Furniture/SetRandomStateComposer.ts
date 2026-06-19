import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRandomStateComposerType = {
  objectId: number;
  param: number;
};

export class SetRandomStateComposer implements IOutgoingPacket<SetRandomStateComposerType>
{
  public constructor(private params: SetRandomStateComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.objectId,
      this.params.param,
    ];
  }
}
