import type { IRoomGeometry } from '../IRoomGeometry';
import type { IRoomSpriteMouseEvent } from '../IRoomSpriteMouseEvent';
import type { IRoomObject } from '../object';

export interface IRoomCanvasMouseListener {
    processRoomCanvasMouseEvent(event: IRoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void;
}
