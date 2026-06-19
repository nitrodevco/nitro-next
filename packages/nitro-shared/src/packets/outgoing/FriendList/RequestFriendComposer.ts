import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestFriendComposerType = {
  playerName: string;
};

export class RequestFriendComposer implements IOutgoingPacket<RequestFriendComposerType>
{
  public constructor(private params: RequestFriendComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.playerName,
    ];
  }
}
