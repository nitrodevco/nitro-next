import type { IObjectData } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectDataUpdateMessage extends RoomObjectUpdateMessage {
    private _state: number;
    private _data: IObjectData | undefined;
    private _extra: number;

    constructor(state: number, data?: IObjectData, extra?: number) {
        super(undefined, undefined);

        this._state = state;
        this._data = data;
        this._extra = extra ?? 0;
    }

    public get state(): number {
        return this._state;
    }

    public get data(): IObjectData | undefined {
        return this._data;
    }

    public get extra(): number {
        return this._extra;
    }
}
