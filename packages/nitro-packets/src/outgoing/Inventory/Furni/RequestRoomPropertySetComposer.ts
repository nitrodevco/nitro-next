// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestRoomPropertySetComposerType = {
    /** The paper's strip id (`FurnitureItem.id`). */
    itemId: number;
};

/**
 * Applies one of the three room layout papers - a wallpaper, a floor or a landscape - to the room
 * the user is in. Flash sends it instead of starting a placement for those categories, because
 * they are not placed on a tile (`FurniModel.requestSelectedFurniPlacement`).
 */
export class RequestRoomPropertySetComposer implements IOutgoingPacket<RequestRoomPropertySetComposerType> {
    public constructor(private params: RequestRoomPropertySetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.itemId,
        ];
    }
}
