
import { MouseEventType, NitroLogger, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectUserTypeName, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine, ObjectTileCursorUpdateMessage } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent, RoomObjectMouseEvent, RoomObjectTileMouseEvent, RoomObjectWallMouseEvent } from '@nitrodevco/nitro-shared';
import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '../context';
import { useRoomEventDispatcher } from './useRoomEventDispatcher';
import { useRoomObjectModify } from './useRoomObjectModify';
import { useRoomObjectMove } from './useRoomObjectMove';
import { useRoomObjectPlace } from './useRoomObjectPlace';
import { useRoomObjectSelector } from './useRoomObjectSelector';
import { useRoomObjectValidation } from './useRoomObjectValidation';

export const useRoomEventHandler = () => {
    const [room, isSpectator, isDecorating, isPlayingGame, getMouseEventId, setMouseEventId, selectedObject] = useRoomContext(useShallow(x => [x.room, x.isSpectator, x.isDecorating, x.isPlayingGame, x.getMouseEventId, x.setMouseEventId, x.selectedObject]));
    const { placedObject, selectAvatar, selectObject, deselectObject } = useRoomObjectSelector();
    const { getActiveSurfaceLocation } = useRoomObjectValidation();
    const { canManipulateFurniture, modifyRoomObject } = useRoomObjectModify();
    const { handleObjectMove } = useRoomObjectMove();
    const { placeObject, placeObjectOnUser, handleObjectPlace } = useRoomObjectPlace();

    const handleMoveTargetFurni = (event: RoomObjectMouseEvent) => {
        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return false;

        const point = getActiveSurfaceLocation(roomObject, event);

        if (point && !GetRoomEngine().moveBlocked) {
            NitroLogger.sendPacket(`new RoomUnitWalkComposer(point.x, point.y)`);

            return true;
        }

        return false;
    };

    const handleMouseOverTile = (event: RoomObjectTileMouseEvent) =>
        new ObjectTileCursorUpdateMessage(
            new Vector3d(event.tileXAsInt, event.tileYAsInt, event.tileZAsInt),
            0, true, event.eventId,
        );

    const handleMouseOverObject = (category: RoomObjectCategoryEnum, event: RoomObjectMouseEvent) => {
        if (category !== RoomObjectCategoryEnum.Floor) return undefined;

        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return undefined;

        const location = getActiveSurfaceLocation(roomObject, event);

        if (!location || !room.instance.furnitureStackingHeightMap) return undefined;

        return new ObjectTileCursorUpdateMessage(
            new Vector3d(location.x, location.y, roomObject.getLocation().z),
            location.z, true, event.eventId,
        );
    };

    const handleRoomObjectMouseEvent = (event: RoomObjectMouseEvent) => {
        if (event instanceof RoomObjectTileMouseEvent) room.areaSelection.handleTileMouseEvent(event);

        switch (event.type) {
            case RoomObjectMouseEvent.CLICK: {
                const operation = selectedObject?.operation ?? RoomObjectOperationType.OBJECT_UNDEFINED;
                const category = room.getRoomObjectCategoryForType(event.objectType);

                let didWalk = false;
                let didMove = false;

                if (operation === RoomObjectOperationType.OBJECT_UNDEFINED) didWalk = handleMoveTargetFurni(event);

                if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
                    if (category === RoomObjectCategoryEnum.Floor) {
                        NitroLogger.sendPacket(`new ClickFurniMessageComposer(event.objectId, category)`);
                    } else if (category === RoomObjectCategoryEnum.Wall) {
                        // This packet only sends a negative number to tell the server that its a wall item
                        NitroLogger.sendPacket(`new ClickFurniMessageComposer(-Math.abs(event.objectId), category)`);
                    }
                }

                const roomCursor = room.getRoomObjectCursor();

                if (roomCursor?.logic) {
                    let cursorEvent: ObjectTileCursorUpdateMessage | undefined;

                    if (event instanceof RoomObjectTileMouseEvent) {
                        cursorEvent = handleMouseOverTile(event);
                    } else if (event.object?.id !== -1) {
                        cursorEvent = handleMouseOverObject(category, event);
                    }

                    if (cursorEvent) roomCursor.processUpdateMessage(cursorEvent);
                }

                switch (operation) {
                    case RoomObjectOperationType.OBJECT_MOVE: {
                        if (category === RoomObjectCategoryEnum.Room) {
                            if (selectedObject) modifyRoomObject(selectedObject.objectId, selectedObject.category, RoomObjectOperationType.OBJECT_MOVE_TO);
                        } else if (category === RoomObjectCategoryEnum.Unit) {
                            if (selectedObject && event.objectType === RoomObjectUserTypeName.MonsterPlant)
                                modifyRoomObject(selectedObject.objectId, selectedObject.category, RoomObjectOperationType.OBJECT_MOVE_TO);

                            if (event.eventId) setMouseEventId(RoomObjectCategoryEnum.Room, MouseEventType.MOUSE_CLICK, event.eventId);

                            placeObjectOnUser(event.objectId, category);
                        }

                        didMove = true;

                        if (event.objectId !== -1) selectObject(event.objectId, category);

                        break;
                    }
                    case RoomObjectOperationType.OBJECT_PLACE:
                        if (category === RoomObjectCategoryEnum.Room) {
                            placeObject(event instanceof RoomObjectTileMouseEvent, event instanceof RoomObjectWallMouseEvent);
                        } else if (category === RoomObjectCategoryEnum.Unit) {
                            switch (event.objectType) {
                                case RoomObjectUserTypeName.MonsterPlant:
                                case RoomObjectUserTypeName.RentableBot:
                                    placeObject(event instanceof RoomObjectTileMouseEvent, event instanceof RoomObjectWallMouseEvent);
                                    break;
                                default:
                                    if (event.eventId) setMouseEventId(RoomObjectCategoryEnum.Room, MouseEventType.MOUSE_CLICK, event.eventId);

                                    placeObjectOnUser(event.objectId, category);
                                    break;
                            }
                        }
                        break;
                    case RoomObjectOperationType.OBJECT_UNDEFINED:
                        if (category === RoomObjectCategoryEnum.Room) {
                            if (!didWalk && event instanceof RoomObjectTileMouseEvent) {
                                if (isDecorating || isSpectator) return;

                                if (!GetRoomEngine().moveBlocked) NitroLogger.sendPacket(`new RoomUnitWalkComposer(x, y)`);
                            }
                        } else {
                            if (!room.isAreaSelectionMode || category === RoomObjectCategoryEnum.Unit) {
                                selectObject(event.objectId, category);
                            } else {
                                deselectObject();

                                room.dispatchEvent(
                                    new RoomEngineObjectEvent(RoomEngineObjectEvent.DESELECTED, room.roomId, -1, RoomObjectCategoryEnum.Minimum),
                                );
                            }

                            didMove = false;

                            if (category === RoomObjectCategoryEnum.Unit) {
                                if (event.ctrlKey && !event.altKey && !event.shiftKey && event.objectType === RoomObjectUserTypeName.RentableBot) {
                                    modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_BOT);
                                } else if (event.ctrlKey && !event.altKey && !event.shiftKey && event.objectType === RoomObjectUserTypeName.MonsterPlant) {
                                    modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_PET);
                                } else if (!event.ctrlKey && !event.altKey && event.shiftKey && event.objectType === RoomObjectUserTypeName.MonsterPlant) {
                                    modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                                }

                                didWalk = !isPlayingGame;
                                didMove = isPlayingGame;
                            } else if (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall) {
                                if (event.altKey || event.ctrlKey || event.shiftKey) {
                                    if (!event.ctrlKey && !event.altKey && event.shiftKey && category === RoomObjectCategoryEnum.Floor) {
                                        if (canManipulateFurniture(event.objectId, category)) modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                                    } else if (event.ctrlKey && !event.altKey && !event.shiftKey) {
                                        modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
                                    }

                                    didWalk = isPlayingGame;
                                    didMove = isPlayingGame;
                                }
                            }

                            if (event.eventId) {
                                if (didWalk) setMouseEventId(RoomObjectCategoryEnum.Room, MouseEventType.MOUSE_CLICK, event.eventId);
                                if (didMove) setMouseEventId(RoomObjectCategoryEnum.Minimum, MouseEventType.MOUSE_CLICK, event.eventId);
                            }
                        }
                        break;
                }

                if (category === RoomObjectCategoryEnum.Room) {
                    if (
                        getMouseEventId(RoomObjectCategoryEnum.Minimum, MouseEventType.MOUSE_CLICK) !== event.eventId &&
                        getMouseEventId(RoomObjectCategoryEnum.Unit, MouseEventType.MOUSE_CLICK) !== event.eventId &&
                        !didMove
                    ) {
                        deselectObject();

                        room.dispatchEvent(
                            new RoomEngineObjectEvent(RoomEngineObjectEvent.DESELECTED, room.roomId, -1, RoomObjectCategoryEnum.Minimum),
                        );

                        selectAvatar(0, false);
                    }
                }

                return;
            }
            case RoomObjectMouseEvent.DOUBLE_CLICK:
                room.dispatchEvent(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.DOUBLE_CLICK, room.roomId, event.objectId, room.getRoomObjectCategoryForType(event.objectType)),
                );
                return;
            case RoomObjectMouseEvent.MOUSE_MOVE: {
                const operation = selectedObject?.operation ?? RoomObjectOperationType.OBJECT_UNDEFINED;
                const category = room.getRoomObjectCategoryForType(event.objectType);
                const roomCursor = room.getRoomObjectCursor();

                if (roomCursor?.logic) {
                    let cursorEvent: ObjectTileCursorUpdateMessage | undefined;

                    if (event instanceof RoomObjectTileMouseEvent) {
                        cursorEvent = handleMouseOverTile(event);
                    } else if (event.object?.id !== -1) {
                        cursorEvent = handleMouseOverObject(category, event);
                    } else {
                        cursorEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);
                    }

                    if (cursorEvent) roomCursor.processUpdateMessage(cursorEvent);
                }

                if (category === RoomObjectCategoryEnum.Room) {
                    if (operation === RoomObjectOperationType.OBJECT_MOVE) handleObjectMove(event, selectedObject);
                    else if (operation === RoomObjectOperationType.OBJECT_PLACE) void handleObjectPlace(event);
                }

                return;
            }
            case RoomObjectMouseEvent.MOUSE_DOWN: {
                const operation = selectedObject?.operation ?? RoomObjectOperationType.OBJECT_UNDEFINED;
                const category = room.getRoomObjectCategoryForType(event.objectType);

                if (
                    operation === RoomObjectOperationType.OBJECT_UNDEFINED &&
                    (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall || event.objectType === RoomObjectUserTypeName.MonsterPlant) &&
                    ((event.altKey && !event.ctrlKey && !event.shiftKey) || (isDecorating && !(event.ctrlKey || event.shiftKey)))
                ) {
                    if (canManipulateFurniture(event.objectId, category)) modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_MOVE);
                }

                return;
            }
            case RoomObjectMouseEvent.MOUSE_UP:
                return;
            case RoomObjectMouseEvent.MOUSE_ENTER:
                room.dispatchEvent(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.MOUSE_ENTER, room.roomId, event.objectId, room.getRoomObjectCategoryForType(event.objectType)),
                );
                return;
            case RoomObjectMouseEvent.MOUSE_LEAVE:
                room.dispatchEvent(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.MOUSE_LEAVE, room.roomId, event.objectId, room.getRoomObjectCategoryForType(event.objectType)),
                );
                return;
        }
    }

    useRoomEventDispatcher<RoomEngineObjectEvent>([
        RoomEngineObjectEvent.ADDED,
    ], event => {
        if (!placedObject || placedObject.objectId !== event.objectId || placedObject.category !== event.category) return;

        selectObject(event.objectId, event.category);
    });

    return { handleRoomObjectMouseEvent };
};
