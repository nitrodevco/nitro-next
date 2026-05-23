
import type { IEventDispatcher, IRoomObjectEvent } from '#api/events';

import type { IRoomSpriteMouseEvent } from './IRoomSpriteMouseEvent';
import type { IRoomObject } from './object';

export interface IRoomEventHandler {
    setRoomObjectEventHandler(handler: ((event: IRoomObjectEvent) => void) | undefined): void;
    setRoomCanvasMouseHandler(handler: ((event: IRoomSpriteMouseEvent, object: IRoomObject) => void) | undefined): void;
    handleRoomObjectEvent(event: IRoomObjectEvent): void;
    handleRoomCanvasMouseEvent(event: IRoomSpriteMouseEvent, object: IRoomObject): void;
    readonly eventDispatcher: IEventDispatcher;
}
