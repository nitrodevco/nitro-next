import type { IRoomGeometry } from '../../IRoomGeometry';
import type { IRoomSpriteMouseEvent } from '../../IRoomSpriteMouseEvent';

export interface IRoomObjectMouseHandler {
    mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void;
}
