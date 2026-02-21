import type { IVector3D } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectAvatarDirectionUpdateMessage extends RoomObjectUpdateMessage {
    private _headDirction: number;

    constructor(location: IVector3D, direction: IVector3D, headDirction: number) {
        super(location, direction);

        this._headDirction = headDirction;
    }

    public get headDirction(): number {
        return this._headDirction;
    }
}
