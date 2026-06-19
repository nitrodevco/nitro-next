import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FollowFriendComposerType = {
  playerId: PlayerId;
};

export class FollowFriendComposer implements IOutgoingPacket<FollowFriendComposerType>
{
  public constructor(private params: FollowFriendComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.playerId,
    ];
  }
}
