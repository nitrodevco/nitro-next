// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomDimmerGetPresetsComposerType = {
    /** The dimmer's own object id, not the room's - `FurnitureDimmerWidgetHandler` sends the furni. */
    objectId: number;
};

export class RoomDimmerGetPresetsComposer implements IOutgoingPacket<RoomDimmerGetPresetsComposerType> {
    public constructor(private params: RoomDimmerGetPresetsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
