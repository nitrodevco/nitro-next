import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHabboClubExtendOfferComposerType = object;

export class GetHabboClubExtendOfferComposer implements IOutgoingPacket<GetHabboClubExtendOfferComposerType> {
    public constructor(private params: GetHabboClubExtendOfferComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
