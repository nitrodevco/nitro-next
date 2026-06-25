import type { IVector3D } from '@nitrodevco/nitro-api';

import { RoomToObjectEvent } from './RoomToObjectEvent';

export class RoomToObjectOwnAvatarMoveEvent extends RoomToObjectEvent {
    public static ROAME_MOVE_TO: string = 'ROAME_MOVE_TO' as const;

    private _targetLocation: IVector3D;

    constructor(type: string, targetLocation: IVector3D) {
        super(type);

        this._targetLocation = targetLocation;
    }

    public get targetLocation(): IVector3D {
        return this._targetLocation;
    }
}
