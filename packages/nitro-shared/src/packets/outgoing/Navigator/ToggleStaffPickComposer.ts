import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ToggleStaffPickComposerType = {
  roomId: RoomId;
  isStaffPicked: boolean;
};

export class ToggleStaffPickComposer implements IOutgoingPacket<ToggleStaffPickComposerType>
{
  public constructor(private params: ToggleStaffPickComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.roomId,
      this.params.isStaffPicked,
    ];
  }
}
