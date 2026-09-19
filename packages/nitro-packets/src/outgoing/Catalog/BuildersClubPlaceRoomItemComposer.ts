// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuildersClubPlaceRoomItemComposerType = {
    pageId: number;
    offerId: number;
    extraParam: string;
    x: number;
    y: number;
    direction: number;
    /** Sent again with `true` after the user accepts the confirmation the server asked for. */
    confirmed?: boolean;
};

export class BuildersClubPlaceRoomItemComposer implements IOutgoingPacket<BuildersClubPlaceRoomItemComposerType> {
    public constructor(private params: BuildersClubPlaceRoomItemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.pageId,
            this.params.offerId,
            this.params.extraParam,
            this.params.x,
            this.params.y,
            this.params.direction,
            this.params.confirmed ?? false,
        ];
    }
}
