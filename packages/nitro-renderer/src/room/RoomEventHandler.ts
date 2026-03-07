import type {
    IEventDispatcher,
    IRoom,
    IRoomEventHandler,
    IRoomGeometry,
    IRoomObject,
    IVector3D,
} from '@nitrodevco/nitro-api';
import {
    MouseEventType,
    NitroLogger,
    RoomObjectCategoryEnum,
    RoomObjectOperationType,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import type { RoomObjectEvent, RoomSpriteMouseEvent } from '@nitrodevco/nitro-shared';
import { FurnitureDataStore, RoomObjectMouseEvent, RoomObjectTileMouseEvent } from '@nitrodevco/nitro-shared';

import { GetRoomEngine } from './GetRoomEngine';
import { ObjectTileCursorUpdateMessage } from './messages';
import { RoomEnterEffect, RoomGeometry } from './utils';

export class RoomEventHandler implements IRoomEventHandler {
    private _eventIds: Map<RoomObjectCategoryEnum, Map<string, number>> = new Map();

    constructor(private _room: IRoom) {}

    public handleRoomObjectEvent(event: RoomObjectEvent): void {
        if (!event) return;

        if (event instanceof RoomObjectMouseEvent) {
            this.handleRoomObjectMouseEvent(event);

            return;
        }

        switch (event.type) {
            default:
                NitroLogger.warn('Unhandled Event', event.constructor.name, 'Object ID', event.object.id);
                return;
        }
    }

    public handleRoomCanvasMouseEvent(event: RoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void {
        if (!event || !object || RoomEnterEffect.isRunning()) return;

        const type = object.type;

        let category = GetRoomEngine().getRoomObjectCategoryForType(type);

        if (
            category !== RoomObjectCategoryEnum.Room &&
            (!GetRoomEngine().isPlayingGame || category !== RoomObjectCategoryEnum.Unit)
        )
            category = RoomObjectCategoryEnum.Minimum;

        const eventId = this.getMouseEventId(category, event.type);

        if (eventId === event.eventId) {
            if (
                event.type === MouseEventType.MOUSE_CLICK ||
                event.type === MouseEventType.DOUBLE_CLICK ||
                event.type === MouseEventType.MOUSE_DOWN ||
                event.type === MouseEventType.MOUSE_UP ||
                event.type === MouseEventType.MOUSE_MOVE
            )
                return;
        } else if (event.eventId) {
            this.setMouseEventId(category, event.type, event.eventId);
        }

        if (object.mouseHandler) object.mouseHandler.mouseEvent(event, geometry);
    }

    public get eventDispatcher(): IEventDispatcher {
        return this._room.eventDispatcher;
    }

    private handleRoomObjectMouseEvent(event: RoomObjectMouseEvent): void {
        if (!event || !event.type) return;

        if (event instanceof RoomObjectTileMouseEvent) {
            //GetRoomEngine().areaSelectionManager.handleTileMouseEvent(event);
        }

        switch (event.type) {
            case RoomObjectMouseEvent.CLICK:
                this.handleRoomObjectMouseClickEvent(event);
                return;
            case RoomObjectMouseEvent.DOUBLE_CLICK:
                this.handleRoomObjectMouseDoubleClickEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_MOVE:
                this.handleRoomObjectMouseMoveEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN:
                this.handleRoomObjectMouseDownEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN_LONG:
                this.handleRoomObjectMouseDownLongEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_ENTER:
                this.handleRoomObjectMouseEnterEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_LEAVE:
                this.handleRoomObjectMouseLeaveEvent(event);
                return;
        }
    }

    private handleRoomObjectMouseClickEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;

        this.clickRoomObject(event);

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this._room.instance.selectedObject;

        if (selectedData) operation = selectedData.operation;

        let didWalk = false;
        const didMove = false;

        if (GetRoomEngine().whereYouClickIsWhereYouGo()) {
            if (operation === RoomObjectOperationType.OBJECT_UNDEFINED) {
                didWalk = this.handleMoveTargetFurni(event);
            }
        }
    }

    private handleRoomObjectMouseDoubleClickEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private handleRoomObjectMouseMoveEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;

        const operation: RoomObjectOperationType = RoomObjectOperationType.OBJECT_UNDEFINED;

        //const selectedData = this.getSelectedRoomObjectData(roomId);

        //if (selectedData) operation = selectedData.operation;

        const category = GetRoomEngine().getRoomObjectCategoryForType(event.objectType);

        const roomCursor = this._room.getRoomObjectCursor();

        if (roomCursor && roomCursor.logic) {
            let newEvent: ObjectTileCursorUpdateMessage | undefined = undefined;

            if (event instanceof RoomObjectTileMouseEvent) newEvent = this.handleMouseOverTile(event);
            else if (event.object && event.object.id !== -1) {
                //if (GetRoomEngine().whereYouClickIsWhereYouGo()) newEvent = this.handleMouseOverObject(category, roomId, event);
            } else {
                newEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);
            }

            if (newEvent) roomCursor.processUpdateMessage(newEvent);
        }

        /* switch (operation) {
            case RoomObjectOperationType.OBJECT_MOVE:
                //if (category === RoomObjectCategoryEnum.Room) this.handleObjectMove(event, roomId);

                return;
            case RoomObjectOperationType.OBJECT_PLACE:
                //if (category === RoomObjectCategoryEnum.Room) this.handleObjectPlace(event, roomId);

                return;
        } */
    }

    private handleRoomObjectMouseDownEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private handleRoomObjectMouseDownLongEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private handleRoomObjectMouseEnterEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private handleRoomObjectMouseLeaveEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private getMouseEventId(category: RoomObjectCategoryEnum, type: string): number | undefined {
        return this._eventIds.get(category)?.get(type);
    }

    private setMouseEventId(category: RoomObjectCategoryEnum, type: string, eventId: number): void {
        let existing = this._eventIds.get(category);

        if (!existing) {
            existing = new Map();

            this._eventIds.set(category, existing);
        }

        existing.delete(type);
        existing.set(type, eventId);
    }

    private handleMouseOverTile(event: RoomObjectTileMouseEvent): ObjectTileCursorUpdateMessage | undefined {
        if (GetRoomEngine().whereYouClickIsWhereYouGo()) {
            return new ObjectTileCursorUpdateMessage(
                new Vector3d(event.tileXAsInt, event.tileYAsInt, event.tileZAsInt),
                0,
                true,
                event.eventId,
            );
        }

        const cursor = this._room.getRoomObjectCursor();

        if (cursor && cursor.visualization) {
            const tileX = event.tileXAsInt;
            const tileY = event.tileYAsInt;
            const tileZ = event.tileZAsInt;
            const tileObjects = this._room.instance.tileObjectMap;

            const tileObject = tileObjects.getObjectIntTile(tileX, tileY);
            const heightMap = this._room.instance.furnitureStackingHeightMap;

            if (tileObject && tileObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureIsVariableHeight) > 0) {
                const tileHeight = heightMap.getTileHeight(tileX, tileY);
                const wallOffset = this._room.instance.legacyGeometry.getHeight(tileX, tileY);

                return new ObjectTileCursorUpdateMessage(
                    new Vector3d(tileX, tileY, tileZ),
                    tileHeight - wallOffset,
                    true,
                    event.eventId,
                );
            }

            return new ObjectTileCursorUpdateMessage(new Vector3d(tileX, tileY, tileZ), 0, true, event.eventId);
        }

        return undefined;
    }

    private clickRoomObject(event: RoomObjectMouseEvent): void {
        if (!event || event.altKey || event.ctrlKey || event.shiftKey) return;

        const objectId = event.objectId;
        const objectType = event.objectType;
        const category = GetRoomEngine().getRoomObjectCategoryForType(objectType);

        if (category === RoomObjectCategoryEnum.Floor) {
            //GetCommunication().connection.send(new ClickFurniMessageComposer(objectId, category));

            return;
        }

        if (category === RoomObjectCategoryEnum.Wall) {
            // This packet only sends a negative number to tell the server that its a wall item
            //GetCommunication().connection.send(new ClickFurniMessageComposer(-Math.abs(objectId), category));

            return;
        }
    }

    private handleMoveTargetFurni(event: RoomObjectMouseEvent): boolean {
        const roomObject = this._room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);
        const point = this.getActiveSurfaceLocation(roomObject, event);

        if (point && !GetRoomEngine().moveBlocked) {
            //GetCommunication().connection.send(new RoomUnitWalkComposer(point.x, point.y));

            return true;
        }

        return false;
    }

    private getActiveSurfaceLocation(roomObject: IRoomObject, event: RoomObjectMouseEvent): IVector3D | undefined {
        if (!roomObject || !event) return undefined;

        const furniData = FurnitureDataStore.getState().floorItems?.get(roomObject.type);

        if (!furniData || (!furniData.canStandOn && !furniData.canSitOn && !furniData.canLayOn)) return undefined;

        const location = roomObject.getLocation();
        const direction = roomObject.getDirection();

        let sizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);
        const sizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);

        if (direction.x === 90 || direction.x === 270) [sizeX, sizeY] = [sizeY, sizeX];

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        const scale = this._room.getGeometry()?.scale ?? RoomGeometry.SCALE_ZOOMED_IN;
        const _local_13 = furniData.canSitOn ? 0.5 : 0;
        const _local_14 = (scale / 2 + event.spriteOffsetX + event.localX) / (scale / 4);
        const _local_15 = (event.spriteOffsetY + event.localY + ((sizeZ - _local_13) * scale) / 2) / (scale / 4);
        const _local_16 = (_local_14 + 2 * _local_15) / 4;
        const _local_17 = (_local_14 - 2 * _local_15) / 4;
        const x = Math.floor(location.x + _local_16);
        const y = Math.floor(location.y - _local_17 + 1);

        let _local_20 = false;

        if (x < location.x || x >= location.x + sizeX) _local_20 = true;
        else if (y < location.y || y >= location.y + sizeY) _local_20 = true;

        const z = furniData.canSitOn ? sizeZ - 0.5 : sizeZ;

        if (!_local_20) return new Vector3d(x, y, z);

        return undefined;
    }
}
