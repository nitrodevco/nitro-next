import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PlaceObjectComposerType = {
  data: string;
};

export class PlaceObjectComposer implements IOutgoingPacket<PlaceObjectComposerType>
{
  public constructor(private params: PlaceObjectComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.data,
    ];
  }
}
