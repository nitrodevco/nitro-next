import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuildersClubPlaceWallItemComposerType = {
  pageId: number;
  offerId: number;
  extraParam: string;
  location: string;
};

export class BuildersClubPlaceWallItemComposer implements IOutgoingPacket<BuildersClubPlaceWallItemComposerType>
{
  public constructor(private params: BuildersClubPlaceWallItemComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.pageId,
      this.params.offerId,
      this.params.extraParam,
      this.params.location,
    ];
  }
}
