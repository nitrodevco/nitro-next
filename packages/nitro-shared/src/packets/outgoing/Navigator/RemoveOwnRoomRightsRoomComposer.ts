import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveOwnRoomRightsRoomComposerType = {
  roomId: RoomId;
};

export class RemoveOwnRoomRightsRoomComposer implements IOutgoingPacket<RemoveOwnRoomRightsRoomComposerType>
{
  public constructor(private params: RemoveOwnRoomRightsRoomComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.roomId,
    ];
  }
}
