import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetClubOffersComposerType = {
    requestSource: ClubOfferRequestSourceType;
};

export class GetClubOffersComposer implements IOutgoingPacket<GetClubOffersComposerType> {
    public constructor(private params: GetClubOffersComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.requestSource,
        ];
    }
}
