import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type BuildersClubPlaceRoomItemComposerType = {
    pageId: number;
    offerId: number;
    extraParam: string;
    x: number;
    y: number;
    direction: number;
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
        ];
    }
}
