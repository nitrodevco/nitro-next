import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenFlatConnectionComposerType = {
  roomId: RoomId;
  password: string;
  unknown1: number;
};

export class OpenFlatConnectionComposer implements IOutgoingPacket<OpenFlatConnectionComposerType>
{
  public constructor(private params: OpenFlatConnectionComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.roomId,
      this.params.password,
      this.params.unknown1,
    ];
  }
}
