import type { IVector3D } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectHeightUpdateMessage extends RoomObjectUpdateMessage {
    private _height: number;

    constructor(location: IVector3D | undefined, direction: IVector3D | undefined, height: number) {
        super(location, direction);

        this._height = height;
    }

    public get height(): number {
        return this._height;
    }
}
