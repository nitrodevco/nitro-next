import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeleteFavouriteRoomComposerType = {
  roomId: RoomId;
};

export class DeleteFavouriteRoomComposer implements IOutgoingPacket<DeleteFavouriteRoomComposerType>
{
  public constructor(private params: DeleteFavouriteRoomComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.roomId,
    ];
  }
}
