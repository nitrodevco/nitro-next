import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AcceptFriendComposerType = {
  friends: number[];
};

export class AcceptFriendComposer implements IOutgoingPacket<AcceptFriendComposerType>
{
  public constructor(private params: AcceptFriendComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.friends,
    ];
  }
}
