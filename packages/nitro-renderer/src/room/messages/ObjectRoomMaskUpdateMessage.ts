import type { IVector3D } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectRoomMaskUpdateMessage extends RoomObjectUpdateMessage {
    public static ADD_MASK: string = 'RORMUM_ADD_MASK' as const;
    public static REMOVE_MASK: string = 'RORMUM_REMOVE_MASK' as const;
    public static DOOR: string = 'door' as const;
    public static WINDOW: string = 'window' as const;
    public static HOLE: string = 'hole' as const;

    private _type: string;
    private _maskId: string | undefined;
    private _maskType: string | undefined;
    private _maskLocation: IVector3D | undefined;
    private _maskCategory: string;

    constructor(type: string, maskId?: string, maskType?: string, maskLocation?: IVector3D, maskCategory?: string) {
        super(undefined, undefined);

        this._type = type;
        this._maskId = maskId;
        this._maskType = maskType;
        this._maskLocation = maskLocation;
        this._maskCategory = maskCategory ?? 'window';
    }

    public get type(): string {
        return this._type;
    }

    public get maskId(): string | undefined {
        return this._maskId;
    }

    public get maskType(): string | undefined {
        return this._maskType;
    }

    public get maskLocation(): IVector3D | undefined {
        return this._maskLocation;
    }

    public get maskCategory(): string {
        return this._maskCategory;
    }
}
