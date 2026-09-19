// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuildersClubPlaceWallItemComposerType = {
    pageId: number;
    offerId: number;
    extraParam: string;
    location: string;
    /** Sent again with `true` after the user accepts the confirmation the server asked for. */
    confirmed?: boolean;
};

export class BuildersClubPlaceWallItemComposer implements IOutgoingPacket<BuildersClubPlaceWallItemComposerType> {
    public constructor(private params: BuildersClubPlaceWallItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.pageId,
            this.params.offerId,
            this.params.extraParam,
            this.params.location,
            this.params.confirmed ?? false,
        ];
    }
}
