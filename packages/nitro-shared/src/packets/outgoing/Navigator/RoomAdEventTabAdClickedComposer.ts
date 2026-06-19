import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomAdEventTabAdClickedComposerType = {
  flatId: number;
  roomAdName: string;
  roomAdExpiresInMin: number;
};

export class RoomAdEventTabAdClickedComposer implements IOutgoingPacket<RoomAdEventTabAdClickedComposerType>
{
  public constructor(private params: RoomAdEventTabAdClickedComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.flatId,
      this.params.roomAdName,
      this.params.roomAdExpiresInMin,
    ];
  }
}
