import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetClubOffersComposerType = {
  requestSource: ClubOfferRequestSourceType;
};

export class GetClubOffersComposer implements IOutgoingPacket<GetClubOffersComposerType>
{
  public constructor(private params: GetClubOffersComposerType) { }

  public compose(): any[]
  {
    return [
      this.params.requestSource,
    ];
  }
}
