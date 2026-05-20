
import type { IEventDispatcher, INitroEvent } from '#api/events';

import type { IRoomGeometry } from './IRoomGeometry';
import type { IRoomSpriteMouseEvent } from './IRoomSpriteMouseEvent';
import type { IRoomObject, RoomObjectCategoryEnum } from './object';

export interface IRoomEventHandler {
    handleRoomObjectEvent(event: INitroEvent): Promise<void>;
    handleRoomCanvasMouseEvent(event: IRoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void;
    setSelectedObject(objectId: number, category: RoomObjectCategoryEnum): void;
    readonly eventDispatcher: IEventDispatcher;
}
