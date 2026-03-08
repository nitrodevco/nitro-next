import type {
    IObjectData,
    ISelectedRoomObjectData,
    IVector3D,
    RoomObjectCategoryEnum,
    RoomObjectOperationType,
} from '@nitrodevco/nitro-api';
import { Vector3d } from '@nitrodevco/nitro-api';

export class SelectedRoomObjectData implements ISelectedRoomObjectData {
    private _id: number;
    private _category: RoomObjectCategoryEnum;
    private _operation: RoomObjectOperationType | undefined;
    private _loc: IVector3D = new Vector3d();
    private _dir: IVector3D = new Vector3d();
    private _typeId: number;
    private _instanceData: string;
    private _stuffData: IObjectData | undefined;
    private _state: number;
    private _animFrame: number;
    private _posture: string;

    constructor(
        id: number,
        category: RoomObjectCategoryEnum,
        operation?: RoomObjectOperationType,
        location?: IVector3D,
        direction?: IVector3D,
        typeId?: number,
        instanceData?: string,
        stuffData?: IObjectData,
        state?: number,
        frameNumber?: number,
        posture?: string,
    ) {
        this._id = id;
        this._category = category;
        this._operation = operation ?? undefined;

        if (location) this._loc.assign(location);
        if (direction) this._dir.assign(direction);

        this._typeId = typeId ?? 0;
        this._instanceData = instanceData ?? '';
        this._stuffData = stuffData ?? undefined;
        this._state = state ?? -1;
        this._animFrame = frameNumber ?? -1;
        this._posture = posture ?? '';
    }

    public get id(): number {
        return this._id;
    }

    public get category(): RoomObjectCategoryEnum {
        return this._category;
    }

    public get operation(): RoomObjectOperationType | undefined {
        return this._operation;
    }

    public get loc(): IVector3D {
        return this._loc;
    }

    public get dir(): IVector3D {
        return this._dir;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get instanceData(): string {
        return this._instanceData;
    }

    public get stuffData(): IObjectData | undefined {
        return this._stuffData;
    }

    public get state(): number {
        return this._state;
    }

    public get animFrame(): number {
        return this._animFrame;
    }

    public get posture(): string {
        return this._posture;
    }

    public dispose(): void {
        this._loc = null!;
        this._dir = null!;
    }
}
