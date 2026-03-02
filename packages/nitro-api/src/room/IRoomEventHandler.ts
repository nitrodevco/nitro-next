import type { IEventDispatcher, INitroEvent } from '../events';
import type { IRoomGeometry } from './IRoomGeometry';
import type { IRoomSpriteMouseEvent } from './IRoomSpriteMouseEvent';
import type { IRoomObject } from './object';

export interface IRoomEventHandler {
    handleRoomObjectEvent(event: INitroEvent): void;
    handleRoomCanvasMouseEvent(event: IRoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void;
    readonly eventDispatcher: IEventDispatcher;
}
