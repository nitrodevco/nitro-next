import type {
    IEventDispatcher,
    IRoom,
    IRoomEventHandler,
    IRoomObject,
    IRoomObjectEvent,
    IRoomSpriteMouseEvent,
} from '@nitrodevco/nitro-api';
import { type RoomObjectEvent, type RoomSpriteMouseEvent } from '@nitrodevco/nitro-shared';

import { RoomEnterEffect } from './utils';

export class RoomEventHandler implements IRoomEventHandler {
    private _roomObjectEventHandler: ((event: RoomObjectEvent) => void) | undefined = undefined;
    private _roomCanvasMouseHandler: ((event: RoomSpriteMouseEvent, object: IRoomObject) => void) | undefined = undefined;

    constructor(private _room: IRoom) { }

    public handleRoomObjectEvent(event: RoomObjectEvent): void {
        if (!event || !this._roomObjectEventHandler) return;

        this._roomObjectEventHandler(event);
    }

    public handleRoomCanvasMouseEvent(event: RoomSpriteMouseEvent, object: IRoomObject): void {
        if (!event || !object || RoomEnterEffect.isRunning() || !this._roomCanvasMouseHandler) return;

        this._roomCanvasMouseHandler(event, object);
    }

    public setRoomObjectEventHandler(handler: ((event: IRoomObjectEvent) => void) | undefined): void {
        this._roomObjectEventHandler = handler;
    }

    public setRoomCanvasMouseHandler(handler: ((event: IRoomSpriteMouseEvent, object: IRoomObject) => void) | undefined): void {
        this._roomCanvasMouseHandler = handler;
    }

    public get eventDispatcher(): IEventDispatcher {
        return this._room.eventDispatcher;
    }
}
