import { IRoomObject } from '@nitrodevco/nitro-api';

import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectFurniIconAssetEvent extends RoomObjectEvent {
    public static LOAD_FURNI_ICON: string = 'ROFIAE_LOAD_FURNI_ICON' as const;

    private _wallItem: boolean;
    private _typeId: number;
    private _extra: string;

    constructor(type: string, object: IRoomObject, wallItem: boolean, typeId: number, extra: string) {
        super(type, object);

        this._wallItem = wallItem;
        this._typeId = typeId;
        this._extra = extra;
    }

    public get wallItem(): boolean {
        return this._wallItem;
    }

    public get typeId(): number {
        return this._typeId;
    }

    public get extra(): string {
        return this._extra;
    }
}
