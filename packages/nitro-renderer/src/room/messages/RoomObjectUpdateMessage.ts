import type { IRoomObjectUpdateMessage, IVector3D } from '@nitrodevco/nitro-api';

export class RoomObjectUpdateMessage implements IRoomObjectUpdateMessage {
    private _location: IVector3D | undefined;
    private _direction: IVector3D | undefined;

    constructor(location: IVector3D | undefined, direction: IVector3D | undefined) {
        this._location = location;
        this._direction = direction;
    }

    public get location(): IVector3D | undefined {
        return this._location;
    }

    public get direction(): IVector3D | undefined {
        return this._direction;
    }
}
