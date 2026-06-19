import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateHomeRoomComposerType = {
  roomId: RoomId;
};

export class UpdateHomeRoomComposer implements IOutgoingPacket<UpdateHomeRoomComposerType>
{
  public constructor(private params: UpdateHomeRoomComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.roomId,
    ];
  }
}
