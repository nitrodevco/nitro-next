// Body filled by hand from the AS3 `PlacePostItMessageComposer` - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PlacePostItComposerType = {
    /** The post-it pad's inventory item id. */
    itemId: number;
    /** The wall location string (`:w=x,y l=x,y r|l`). */
    wallLocation: string;
};

export class PlacePostItComposer implements IOutgoingPacket<PlacePostItComposerType> {
    public constructor(private params: PlacePostItComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
            this.params.wallLocation,
        ];
    }
}
