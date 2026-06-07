
import { NitroLogger, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ObjectAvatarSelectedMessage, ObjectSelectedMessage, ObjectVisibilityUpdateMessage } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent } from '@nitrodevco/nitro-shared';

import { useRoomContext } from '../context';

export const useRoomObjectSelector = () => {
    const room = useRoomContext(x => x.room);
    const selectedAvatarId = useRoomContext(x => x.selectedAvatarId);
    const selectedObjectId = useRoomContext(x => x.selectedObjectId);
    const selectedObjectCategory = useRoomContext(x => x.selectedObjectCategory);
    const selectedObject = useRoomContext(x => x.selectedObject);
    const placedObject = useRoomContext(x => x.placedObject);
    const setSelectedAvatarId = useRoomContext(x => x.setSelectedAvatarId);
    const setSelectedObjectId = useRoomContext(x => x.setSelectedObjectId);
    const setSelectedObjectCategory = useRoomContext(x => x.setSelectedObjectCategory);
    const setSelectedObject = useRoomContext(x => x.setSelectedObject);

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

                    if (objectId !== selectedObjectId) {
                        deselectObject();

                        const roomObject = room.getRoomObject(objectId, category);

                        if (roomObject?.logic) {
                            roomObject.processUpdateMessage(new ObjectSelectedMessage(true));

                            setSelectedObjectId(objectId);
                            setSelectedObjectCategory(category);
                        }
                    }
                }

                room.dispatchEvent(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.SELECTED, room.roomId, objectId, category),
                );
            }
        }
    };

    const selectAvatar = (objectId: number, lookAt: boolean) => {
        const prevAvatar = room.getRoomObject(selectedAvatarId, RoomObjectCategoryEnum.Unit);

        if (prevAvatar?.logic) {
            prevAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(false));
            setSelectedAvatarId(-1);
        }

        const nextAvatar = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (nextAvatar?.logic) {
            nextAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(true));
            setSelectedAvatarId(objectId);

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
        if (selectedObjectId === -1) return;

        const roomObject = room.getRoomObject(selectedObjectId, selectedObjectCategory);

        if (roomObject?.logic) roomObject.processUpdateMessage(new ObjectSelectedMessage(false));

        setSelectedObjectId(-1);
        setSelectedObjectCategory(RoomObjectCategoryEnum.Minimum);
    };

    const resetSelectedObject = () => {
        if (!selectedObject) return;
        //this._roomEngine.removeObjectMoverIconSprite();

        if (selectedObject.operation === RoomObjectOperationType.OBJECT_MOVE || selectedObject.operation === RoomObjectOperationType.OBJECT_MOVE_TO) {
            const roomObject = room.getRoomObject(selectedObject.objectId, selectedObject.category);

            if (roomObject) {
                if (selectedObject.operation !== RoomObjectOperationType.OBJECT_MOVE_TO) {
                    roomObject.setLocation(selectedObject.loc);
                    roomObject.setDirection(selectedObject.dir);
                }

                roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, 1);
            }

            if (selectedObject.category === RoomObjectCategoryEnum.Wall) room.updateRoomObjectMask(selectedObject.objectId, true);
        } else if (selectedObject.operation === RoomObjectOperationType.OBJECT_PLACE) {
            switch (selectedObject.category) {
                case RoomObjectCategoryEnum.Floor:
                    room.removeRoomObjectFloor(selectedObject.objectId);
                    break;
                case RoomObjectCategoryEnum.Wall:
                    room.removeRoomObjectWall(selectedObject.objectId);
                    break;
                case RoomObjectCategoryEnum.Unit:
                    room.removeRoomObject(selectedObject.objectId, RoomObjectCategoryEnum.Unit);
                    break;
            }
        }

        setSelectedObject(undefined);
    };

    return { selectedObject, placedObject, selectObject, selectAvatar, deselectObject, resetSelectedObject };
};
