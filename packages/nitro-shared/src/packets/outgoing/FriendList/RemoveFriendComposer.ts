import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveFriendComposerType = {
  friendIds: number[];
};

export class RemoveFriendComposer implements IOutgoingPacket<RemoveFriendComposerType>
{
  public constructor(private params: RemoveFriendComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.friendIds,
    ];
  }
}
