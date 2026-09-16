import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetClubOffersComposerType = {
    /** Where the offers were asked from; the server only logs it. */
    requestSource: number;
};

export class GetClubOffersComposer implements IOutgoingPacket<GetClubOffersComposerType> {
    public constructor(private params: GetClubOffersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.requestSource,
        ];
    }
}
