import type { IEventDispatcher, IRoomEventHandler, IRoomGeometry, IRoomObject } from '@nitrodevco/nitro-api';
import { MouseEventType, NitroLogger, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import type { RoomObjectEvent, RoomSpriteMouseEvent } from '@nitrodevco/nitro-shared';
import { RoomObjectMouseEvent, RoomObjectTileMouseEvent } from '@nitrodevco/nitro-shared';

import { GetRoomEngine } from './GetRoomEngine';
import { RoomEnterEffect } from './utils';

export class RoomEventHandler implements IRoomEventHandler {
    private _eventDispatcher: IEventDispatcher;
    private _eventIds: Map<RoomObjectCategoryEnum, Map<string, number>> = new Map();

    constructor() {}

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
            console.log(event);
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
}
