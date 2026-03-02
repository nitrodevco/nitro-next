import type { IEventDispatcher, IRoomEventHandler, IRoomGeometry, IRoomObject } from '@nitrodevco/nitro-api';
import {
    MouseEventType,
    NitroLogger,
    RoomObjectCategoryEnum,
    RoomObjectOperationType,
    Vector3d,
} from '@nitrodevco/nitro-api';
import type { RoomObjectEvent, RoomSpriteMouseEvent } from '@nitrodevco/nitro-shared';
import { RoomObjectMouseEvent, RoomObjectTileMouseEvent } from '@nitrodevco/nitro-shared';

import { GetRoomEngine } from './GetRoomEngine';
import { ObjectTileCursorUpdateMessage } from './messages';
import { RoomEnterEffect } from './utils';

export class RoomEventHandler implements IRoomEventHandler {
    private _eventDispatcher: IEventDispatcher;
    private _eventIds: Map<RoomObjectCategoryEnum, Map<string, number>> = new Map();

    constructor(private _roomId: number) {}

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
        return this._eventDispatcher;
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

        const roomCursor = GetRoomEngine().getRoomObjectCursor(this._roomId);

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

        /* const roomObject = this._roomEngine.getRoomObjectCursor(roomId);

        if (roomObject && roomObject.visualization) {
            const _local_4 = event.tileXAsInt;
            const _local_5 = event.tileYAsInt;
            const _local_6 = event.tileZAsInt;
            const _local_7 = this._roomEngine.getRoomInstance(roomId);

            if (_local_7) {
                const _local_8 = this._roomEngine.getRoomTileObjectMap(roomId);

                if (_local_8) {
                    const _local_9 = _local_8.getObjectIntTile(_local_4, _local_5);
                    const _local_10 = this._roomEngine.getFurnitureStackingHeightMap(roomId);

                    if (_local_10) {
                        if (
                            _local_9 &&
                            _local_9.model &&
                            _local_9.model.getValue<number>(RoomObjectVariable.FURNITURE_IS_VARIABLE_HEIGHT) > 0
                        ) {
                            const _local_11 = _local_10.getTileHeight(_local_4, _local_5);
                            const _local_12 = this._roomEngine
                                .getLegacyWallGeometry(roomId)
                                .getHeight(_local_4, _local_5);

                            return new ObjectTileCursorUpdateMessage(
                                new Vector3d(_local_4, _local_5, _local_6),
                                _local_11 - _local_12,
                                true,
                                event.eventId,
                            );
                        }

                        return new ObjectTileCursorUpdateMessage(
                            new Vector3d(_local_4, _local_5, _local_6),
                            0,
                            true,
                            event.eventId,
                        );
                    }
                }
            }
        } */

        return undefined;
    }
}
