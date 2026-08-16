import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineObjectPlacedEvent extends RoomEngineObjectEvent {
    private _wallLocation: string;
    private _x: number;
    private _y: number;
    private _z: number;
    private _direction: number;
    private _placedInRoom: boolean;
    private _placedOnFloor: boolean;
    private _placedOnWall: boolean;
    private _instanceData: string;

    constructor(
        type: string,
        roomId: number,
        objectId: number,
        category: number,
        wallLocation: string,
        x: number,
        y: number,
        z: number,
        direction: number,
        placedInRoom: boolean,
        placedOnFloor: boolean,
        placedOnWall: boolean,
        instanceData: string,
    ) {
        super(type, roomId, objectId, category);

        this._wallLocation = wallLocation;
        this._x = x;
        this._y = y;
        this._z = z;
        this._direction = direction;
        this._placedInRoom = placedInRoom;
        this._placedOnFloor = placedOnFloor;
        this._placedOnWall = placedOnWall;
        this._instanceData = instanceData;
    }

    public get wallLocation(): string {
        return this._wallLocation;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z;
    }

    public get direction(): number {
        return this._direction;
    }

    public get placedInRoom(): boolean {
        return this._placedInRoom;
    }

    public get placedOnFloor(): boolean {
        return this._placedOnFloor;
    }

    public get placedOnWall(): boolean {
        return this._placedOnWall;
    }

    public get instanceData(): string {
        return this._instanceData;
    }
}
