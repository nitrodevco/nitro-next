import { IEventDispatcher, IRoomObjectEvent } from '#api/events';

import { IRoomSpriteMouseEvent } from './IRoomSpriteMouseEvent';
import { IRoomObject } from './object';

export interface IRoomEventHandler {
    handleRoomObjectEvent(event: IRoomObjectEvent): void;
    handleRoomCanvasMouseEvent(event: IRoomSpriteMouseEvent, object: IRoomObject): void;
    setRoomObjectEventHandler(handler: ((event: IRoomObjectEvent) => void) | undefined): void;
    setRoomCanvasMouseHandler(handler: ((event: IRoomSpriteMouseEvent, object: IRoomObject) => void) | undefined): void;
    readonly eventDispatcher: IEventDispatcher;
}
