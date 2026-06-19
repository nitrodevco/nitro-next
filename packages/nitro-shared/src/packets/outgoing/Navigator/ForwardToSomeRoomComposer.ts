import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ForwardToSomeRoomComposerType = {
  forwardData: string;
};

export class ForwardToSomeRoomComposer implements IOutgoingPacket<ForwardToSomeRoomComposerType>
{
  public constructor(private params: ForwardToSomeRoomComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.forwardData,
    ];
  }
}
