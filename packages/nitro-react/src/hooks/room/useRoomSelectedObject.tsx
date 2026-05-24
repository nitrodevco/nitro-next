
import type { ISelectedRoomObjectData } from '@nitrodevco/nitro-api';
import { NitroLogger, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectPlacementSource, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ObjectAvatarSelectedMessage, ObjectSelectedMessage, ObjectVisibilityUpdateMessage } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent } from '@nitrodevco/nitro-shared';
import { useRef } from 'react';
import { useRoomContext } from '../context';

export const useRoomSelectedObject = () => {
    const room = useRoomContext(x => x.room);
    const selectedAvatarId = useRef(-1);
    const selectedObjectId = useRef(-1);
    const selectedObjectCategory = useRef<RoomObjectCategoryEnum>(RoomObjectCategoryEnum.Minimum);
    const selectedObject = useRef<ISelectedRoomObjectData | undefined>(undefined);
    const placedObject = useRef<ISelectedRoomObjectData | undefined>(undefined);
    const objectPlacementSource = useRef<RoomObjectPlacementSource>(RoomObjectPlacementSource.INVENTORY);

    const selectObject = (objectId: number, category: RoomObjectCategoryEnum) => {
        switch (category) {
            case RoomObjectCategoryEnum.Unit:
            case RoomObjectCategoryEnum.Floor:
            case RoomObjectCategoryEnum.Wall: {
                if (category === RoomObjectCategoryEnum.Unit) {
                    deselectObject();
                    selectAvatar(objectId, true);
                } else {
                    selectAvatar(0, false);

                    if (objectId !== selectedObjectId.current) {
                        deselectObject();

                        const roomObject = room.getRoomObject(objectId, category);

                        if (roomObject?.logic) {
                            roomObject.processUpdateMessage(new ObjectSelectedMessage(true));

                            selectedObjectId.current = objectId;
                            selectedObjectCategory.current = category;
                        }
                    }
                }

                room.eventHandler.eventDispatcher.dispatchEvent(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.SELECTED, room.roomId, objectId, category),
                );
            }
        }
    };

    const selectAvatar = (objectId: number, lookAt: boolean) => {
        const prevAvatar = room.getRoomObject(selectedAvatarId.current, RoomObjectCategoryEnum.Unit);

        if (prevAvatar?.logic) {
            prevAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(false));
            selectedAvatarId.current = -1;
        }

        const nextAvatar = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (nextAvatar?.logic) {
            nextAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(true));
            selectedAvatarId.current = objectId;

            if (lookAt) {
                const location = nextAvatar.getLocation();
                NitroLogger.sendPacket(`new RoomUnitLookComposer(~~(${location.x}), ~~(${location.y}))`);
            }
        }

        const selectionArrow = room.getRoomObjectSelectionArrow();

        if (selectionArrow?.logic) {
            const visibility = lookAt && !room.isPlayingGame()
                ? ObjectVisibilityUpdateMessage.ENABLED
                : ObjectVisibilityUpdateMessage.DISABLED;

            selectionArrow.processUpdateMessage(new ObjectVisibilityUpdateMessage(visibility));
        }
    };

    const deselectObject = () => {
        if (selectedObjectId.current === -1) return;

        const roomObject = room.getRoomObject(selectedObjectId.current, selectedObjectCategory.current);

        if (roomObject?.logic) roomObject.processUpdateMessage(new ObjectSelectedMessage(false));

        selectedObjectId.current = -1;
        selectedObjectCategory.current = RoomObjectCategoryEnum.Minimum;
    };

    const resetSelectedObject = () => {
        if (!selectedObject.current) return;
        //this._roomEngine.removeObjectMoverIconSprite();

        const obj = selectedObject.current;

        if (obj.operation === RoomObjectOperationType.OBJECT_MOVE || obj.operation === RoomObjectOperationType.OBJECT_MOVE_TO) {
            const roomObject = room.getRoomObject(obj.id, obj.category);

            if (roomObject) {
                if (obj.operation !== RoomObjectOperationType.OBJECT_MOVE_TO) {
                    roomObject.setLocation(obj.loc);
                    roomObject.setDirection(obj.dir);
                }

                roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, 1);
            }

            if (obj.category === RoomObjectCategoryEnum.Wall) room.updateRoomObjectMask(obj.id, true);
        } else if (obj.operation === RoomObjectOperationType.OBJECT_PLACE) {
            switch (obj.category) {
                case RoomObjectCategoryEnum.Floor:
                    room.removeRoomObjectFloor(obj.id);
                    break;
                case RoomObjectCategoryEnum.Wall:
                    room.removeRoomObjectWall(obj.id);
                    break;
                case RoomObjectCategoryEnum.Unit:
                    room.removeRoomObject(obj.id, RoomObjectCategoryEnum.Unit);
                    break;
            }
        }

        selectedObject.current = undefined;
    };

    return { selectedObject, placedObject, objectPlacementSource, selectObject, selectAvatar, deselectObject, resetSelectedObject };
};
