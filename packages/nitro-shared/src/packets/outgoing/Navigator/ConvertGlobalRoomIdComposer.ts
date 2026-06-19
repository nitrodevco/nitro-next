import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ConvertGlobalRoomIdComposerType = {
  flatId: string;
};

export class ConvertGlobalRoomIdComposer implements IOutgoingPacket<ConvertGlobalRoomIdComposerType>
{
  public constructor(private params: ConvertGlobalRoomIdComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.flatId,
    ];
  }
}
