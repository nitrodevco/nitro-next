import { IRoomMapMask } from '@nitrodevco/nitro-api';

/**
 * Nitro's own: the room's window and door masks as data, in place of Flash's
 * `room_plane_mask_xml`.
 */
export class RoomMapMaskData {
    private _masks: IRoomMapMask[];

    constructor() {
        this._masks = [];
    }

    public get masks(): IRoomMapMask[] {
        return this._masks;
    }
}
