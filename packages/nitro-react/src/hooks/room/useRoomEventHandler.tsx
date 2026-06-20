
import { MouseEventType, NitroLogger, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectUserTypeName } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent, RoomObjectMouseEvent, RoomObjectTileMouseEvent, RoomObjectWallMouseEvent } from '@nitrodevco/nitro-shared';
import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';
import { useRoomInteractionSelector, useRoomPlacedObject, useRoomSelectedObject, useRoomSelector } from '#base/selectors';

import { useRoomCursorUpdate } from './useRoomCursorUpdate';
import { useRoomEventDispatcher } from './useRoomEventDispatcher';
import { useRoomObjectInteraction } from './useRoomObjectInteraction';
import { useRoomObjectModify } from './useRoomObjectModify';
import { useRoomObjectMove } from './useRoomObjectMove';
import { useRoomObjectPlace } from './useRoomObjectPlace';
import { useRoomObjectSelect } from './useRoomObjectSelect';

export const useRoomEventHandler = () => {
    const room = useRoomSelector();

    const [getMouseEventId, setMouseEventId] = useRoomContext(useShallow(x => [x.getMouseEventId, x.setMouseEventId]));


    const { isSpectator, isDecorating, isPlayingGame } = useRoomInteractionSelector();
    const selectedObject = useRoomSelectedObject();
    const placedObject = useRoomPlacedObject();

    const { selectAvatar, selectObject, deselectObject } = useRoomObjectSelect();
    const { canManipulateFurniture, modifyRoomObject } = useRoomObjectModify();
    const { handleObjectMove } = useRoomObjectMove();
    const { placeObject, placeObjectOnUser, handleObjectPlace } = useRoomObjectPlace();
    const { updateCursorForEvent } = useRoomCursorUpdate();
    const { handleMoveTargetFurni } = useRoomObjectInteraction();

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

                updateCursorForEvent(event);

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

                updateCursorForEvent(event, true);

                if (category === RoomObjectCategoryEnum.Room) {
                    if (operation === RoomObjectOperationType.OBJECT_MOVE) handleObjectMove(event, selectedObject);
                    else if (operation === RoomObjectOperationType.OBJECT_PLACE) handleObjectPlace(event);
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
