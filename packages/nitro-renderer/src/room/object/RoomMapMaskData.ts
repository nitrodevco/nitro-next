import type { IRoomMapMask } from '@nitrodevco/nitro-api';

export class RoomMapMaskData {
    private _masks: IRoomMapMask[];

    constructor() {
        this._masks = [];
    }

    public get masks(): IRoomMapMask[] {
        return this._masks;
    }
}
