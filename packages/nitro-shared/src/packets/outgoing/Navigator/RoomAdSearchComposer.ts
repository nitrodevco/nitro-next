import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomAdSearchComposerType = {
  adIndex: number;
  tabId: number;
};

export class RoomAdSearchComposer implements IOutgoingPacket<RoomAdSearchComposerType>
{
  public constructor(private params: RoomAdSearchComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.adIndex,
      this.params.tabId,
    ];
  }
}
