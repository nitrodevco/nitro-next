import type { IRoomObject } from "@nitrodevco/nitro-api";
import { MouseEventType, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectVariableEnum } from "@nitrodevco/nitro-api";
import type { RoomObjectEvent, RoomSpriteMouseEvent } from "@nitrodevco/nitro-shared";
import { RoomEngineObjectEvent, RoomObjectFurnitureActionEvent, RoomObjectMouseEvent, RoomWidgetUpdateRoomObjectEvent } from "@nitrodevco/nitro-shared";
import { useEffect } from "react";

import { useIsModerator, useRoomControllerLevel, useRoomIsPlayingGame, useRoomMouseActions, useRoomSelector } from "#base/context";
import { useRoomEventDispatcher, useRoomEventHandler } from "#base/hooks";

export const RoomEventHandler = () => {
    const room = useRoomSelector();
    const isModerator = useIsModerator();
    const controllerLevel = useRoomControllerLevel();
    const isPlayingGame = useRoomIsPlayingGame();
    const { getMouseEventId, setMouseEventId, addCursorOwner, removeCursorOwner } = useRoomMouseActions();
    const { handleRoomObjectMouseEvent } = useRoomEventHandler();

    useRoomEventDispatcher<RoomEngineObjectEvent>([
        RoomEngineObjectEvent.SELECTED,
        RoomEngineObjectEvent.DESELECTED,
        RoomEngineObjectEvent.ADDED,
        RoomEngineObjectEvent.REMOVED,
        RoomEngineObjectEvent.PLACED,
        RoomEngineObjectEvent.MOUSE_ENTER,
        RoomEngineObjectEvent.MOUSE_LEAVE,
        RoomEngineObjectEvent.DOUBLE_CLICK,
    ], event => {
        if (!room) return;
        //if (RoomId.isRoomPreviewerId(event.roomId)) return;

        let updateEvent: RoomWidgetUpdateRoomObjectEvent | undefined = undefined;

        switch (event.type) {
            case RoomEngineObjectEvent.SELECTED: {
                const roomObject = room.getRoomObject(event.objectId, event.category);

                if (!roomObject) return;

                const disabled = (roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSelectionDisabled) === 1);

                if (!disabled || isModerator) updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            }
            case RoomEngineObjectEvent.DESELECTED:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.ADDED: {
                let addedEventType: string = '';

                switch (event.category) {
                    case RoomObjectCategoryEnum.Floor:
                    case RoomObjectCategoryEnum.Wall:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_ADDED;
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        addedEventType = RoomWidgetUpdateRoomObjectEvent.USER_ADDED;
                        break;
                }

                if (addedEventType) updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    addedEventType,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            }
            case RoomEngineObjectEvent.REMOVED: {
                let removedEventType: string = '';

                switch (event.category) {
                    case RoomObjectCategoryEnum.Floor:
                    case RoomObjectCategoryEnum.Wall:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED;
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        removedEventType = RoomWidgetUpdateRoomObjectEvent.USER_REMOVED;
                        break;
                }

                if (removedEventType) updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    removedEventType,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            }
            case RoomEngineObjectEvent.MOUSE_ENTER:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.MOUSE_LEAVE:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
            case RoomEngineObjectEvent.DOUBLE_CLICK:
                updateEvent = new RoomWidgetUpdateRoomObjectEvent(
                    RoomWidgetUpdateRoomObjectEvent.OBJECT_DOUBLE_CLICKED,
                    event.objectId,
                    event.category,
                    event.roomId,
                );
                break;
        }

        if (updateEvent) room.dispatchEvent(updateEvent);
    });

    useEffect(() => {
        if (!room) return;

        const handleRoomObjectEvent = (event: RoomObjectEvent) => {
            if (event instanceof RoomObjectMouseEvent) {
                handleRoomObjectMouseEvent(event);

                return;
            }

            switch (event.type) {
                case RoomObjectFurnitureActionEvent.MOUSE_ARROW: {
                    removeCursorOwner(event.objectId, room.getRoomObjectCategoryForType(event.objectType));
                    return;
                }
                case RoomObjectFurnitureActionEvent.MOUSE_BUTTON: {
                    const category = room.getRoomObjectCategoryForType(event.objectType);

                    if (
                        (category !== RoomObjectCategoryEnum.Floor && category !== RoomObjectCategoryEnum.Wall) ||
                        controllerLevel >= RoomControllerLevelEnum.Guest
                    ) addCursorOwner(event.objectId, category);
                    return;
                }
            }
        };

        room.eventHandler.setRoomObjectEventHandler(handleRoomObjectEvent);

        return () => room.eventHandler.setRoomObjectEventHandler(undefined);
    }, [room, controllerLevel, handleRoomObjectMouseEvent, removeCursorOwner, addCursorOwner]);

    useEffect(() => {
        if (!room) return;

        const handleRoomCanvasMouseEvent = (event: RoomSpriteMouseEvent, object: IRoomObject) => {
            if (!object) return;

            let category = room.getRoomObjectCategoryForType(object.type);

            if (category !== RoomObjectCategoryEnum.Room && (!isPlayingGame || category !== RoomObjectCategoryEnum.Unit)) category = RoomObjectCategoryEnum.Minimum;

            const eventId = getMouseEventId(category, event.type);

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
                setMouseEventId(category, event.type, event.eventId);
            }

            if (object.mouseHandler) object.mouseHandler.mouseEvent(event, room.getGeometry());
        }

        room.eventHandler.setRoomCanvasMouseHandler(handleRoomCanvasMouseEvent);

        return () => room.eventHandler.setRoomCanvasMouseHandler(undefined);
    }, [room, isPlayingGame, getMouseEventId, setMouseEventId]);

    return null;
}