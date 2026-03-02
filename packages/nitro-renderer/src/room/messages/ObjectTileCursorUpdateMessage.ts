import type { IVector3D } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectTileCursorUpdateMessage extends RoomObjectUpdateMessage {
    private _height: number;
    private _sourceEventId: number;
    private _visible: boolean;
    private _toggleVisibility: boolean;

    constructor(
        location: IVector3D | undefined,
        height: number,
        visible: boolean,
        sourceEventId: number,
        toggleVisibility: boolean = false,
    ) {
        super(location, undefined);

        this._height = height;
        this._visible = visible;
        this._sourceEventId = sourceEventId;
        this._toggleVisibility = toggleVisibility;
    }

    public get height(): number {
        return this._height;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get sourceEventId(): number {
        return this._sourceEventId;
    }

    public get toggleVisibility(): boolean {
        return this._toggleVisibility;
    }
}
