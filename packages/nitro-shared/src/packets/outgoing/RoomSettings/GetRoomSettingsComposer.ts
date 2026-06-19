import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRoomSettingsComposerType = {
  roomId: RoomId;
};

export class GetRoomSettingsComposer implements IOutgoingPacket<GetRoomSettingsComposerType>
{
  public constructor(private params: GetRoomSettingsComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.roomId,
    ];
  }
}
