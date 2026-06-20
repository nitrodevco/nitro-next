
import { NitroLogger, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ObjectAvatarSelectedMessage, ObjectSelectedMessage, ObjectVisibilityUpdateMessage } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent } from '@nitrodevco/nitro-shared';
import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';
import { useRoomIsPlayingGame, useRoomSelectedObjectDetails, useRoomSelector } from '#base/selectors';

export const useRoomObjectSelect = () => {
    const room = useRoomSelector();
    const isPlayingGame = useRoomIsPlayingGame();
    const { selectedAvatarId, selectedObjectId, selectedObjectCategory } = useRoomSelectedObjectDetails();

    const [getSelectedObject, setSelectedAvatarId, setSelectedObjectId, setSelectedObjectCategory, setSelectedObject] = useRoomContext(useShallow(x => [x.getSelectedObject, x.setSelectedAvatarId, x.setSelectedObjectId, x.setSelectedObjectCategory, x.setSelectedObject]));

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
            const visibility = lookAt && !isPlayingGame
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
        const selectedObject = getSelectedObject();

        if (!selectedObject) return;

        room.removeRoomOverlayIconSprite();

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

    return { selectObject, selectAvatar, deselectObject, resetSelectedObject };
};
