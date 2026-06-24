import type { IRoomObject } from "@nitrodevco/nitro-api";
import { RoomObjectCategoryEnum } from "@nitrodevco/nitro-api";
import { NitroLogger, RoomControllerLevelEnum, RoomObjectOperationType, RoomObjectUserTypeName, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import { SelectedRoomObjectData } from "@nitrodevco/nitro-renderer";

import { useIsModerator, useOwnUserId, useRoomPermissionsSelector, useRoomSelectedObject, useRoomSelectedObjectActions, useRoomSelector } from "#base/context";

import { useRoomObjectSelect } from "./useRoomObjectSelect";
import { useRoomObjectValidation } from "./useRoomObjectValidation";

export const useRoomObjectModify = () => {
    const room = useRoomSelector();
    const ownUserId = useOwnUserId();
    const isModerator = useIsModerator();
    const selectedObject = useRoomSelectedObject();
    const { controllerLevel, isRoomOwner } = useRoomPermissionsSelector();
    const { setSelectedObject } = useRoomSelectedObjectActions();
    const { resetSelectedObject } = useRoomObjectSelect();
    const { setFurnitureAlphaMultiplier, isValidLocation, getValidRoomObjectDirection } = useRoomObjectValidation();

    const isFurnitureOwner = (object: IRoomObject | undefined) => object && (ownUserId === object.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId));

    const canManipulateFurniture = (objectId: number, category: RoomObjectCategoryEnum) => room && (isRoomOwner || isModerator || (controllerLevel >= RoomControllerLevelEnum.Guest) || isFurnitureOwner(room.getRoomObject(objectId, category)));

    const modifyRoomObject = (objectId: number, category: RoomObjectCategoryEnum, operation: RoomObjectOperationType) => {
        if (!room) return false;

        const roomObject = room.getRoomObject(objectId, category);

        if (!roomObject) return false;

        let shouldReset = true;

        let selectedObjectData = selectedObject;

        switch (operation) {
            case RoomObjectOperationType.OBJECT_ROTATE_POSITIVE:
            case RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE: {
                const forward = operation === RoomObjectOperationType.OBJECT_ROTATE_POSITIVE;
                const direction = getValidRoomObjectDirection(roomObject, forward);

                if (isValidLocation(roomObject, new Vector3d(direction))) {
                    const _x = roomObject.getLocation().x;
                    const _y = roomObject.getLocation().y;

                    if (roomObject.type === RoomObjectUserTypeName.MonsterPlant) {
                        NitroLogger.sendPacket(`GetCommunication().connection.send(
                                        new PetMoveComposer(userData.webID, Math.trunc(x), Math.trunc(y), Math.trunc(direction / 45)),
                                    )`);
                    } else {
                        NitroLogger.sendPacket(
                            `new FurnitureFloorUpdateComposer(objectId, x, y, Math.trunc(direction / 45))`
                        );
                    }
                }

                break;
            }
            case RoomObjectOperationType.OBJECT_EJECT:
            case RoomObjectOperationType.OBJECT_PICKUP:
                NitroLogger.sendPacket(`new FurniturePickupComposer(category, objectId)`);
                break;
            case RoomObjectOperationType.OBJECT_PICKUP_PET: {
                /* const session = GetRoomSessionManager().getSession(roomId);
     
                if (session) {
                    const userData = session.userDataManager.getUserDataByIndex(objectId);
     
                    session.pickupPet(userData.webID);
                } */
                break;
            }
            case RoomObjectOperationType.OBJECT_PICKUP_BOT: {
                /* const session = GetRoomSessionManager().getSession(roomId);
     
                if (session) {
                    const userData = session.userDataManager.getUserDataByIndex(objectId);
     
                    session.pickupBot(userData.webID);
                } */
                break;
            }
            case RoomObjectOperationType.OBJECT_MOVE:
                shouldReset = false;
                setFurnitureAlphaMultiplier(roomObject, 0.5);

                selectedObjectData = new SelectedRoomObjectData(
                    roomObject.id,
                    category,
                    operation,
                    roomObject.getLocation(),
                    roomObject.getDirection(),
                );

                void (async () => {
                    await room.setRoomOverlayIconSprite(roomObject.id, category, true);

                    room.setRoomOverlayIconSpriteVisibility(false);
                })();

                break;
            case RoomObjectOperationType.OBJECT_MOVE_TO: {
                if (selectedObject) selectedObjectData = new SelectedRoomObjectData(
                    selectedObject.objectId,
                    selectedObject.category,
                    RoomObjectOperationType.OBJECT_MOVE_TO,
                    roomObject.getLocation(),
                    roomObject.getDirection(),
                );

                setFurnitureAlphaMultiplier(roomObject, 1);

                room.removeRoomOverlayIconSprite();

                if (category === RoomObjectCategoryEnum.Floor) {
                    const _angle = roomObject.getDirection().x % 360;
                    const _location = roomObject.getLocation();
                    const _direction = _angle / 45;

                    NitroLogger.sendPacket(`new FurnitureFloorUpdateComposer(objectId, location.x, location.y, direction`);
                } else if (category === RoomObjectCategoryEnum.Wall) {
                    const _angle = roomObject.getDirection().x % 360;
                    const _location = room.legacyGeometry?.getOldLocationString(roomObject.getLocation(), _angle);

                    NitroLogger.sendPacket(`new FurnitureWallUpdateComposer(objectId, location)`);
                } else if (category === RoomObjectCategoryEnum.Unit) {
                    const _angle = roomObject.getDirection().x % 360;
                    const _location = roomObject.getLocation();
                    const _direction = _angle / 45;
                    const _race = parseInt(roomObject.model.getValue<string>(RoomObjectVariableEnum.Race));

                    NitroLogger.sendPacket(
                        `new PetMoveComposer(userData.webID, location.x, location.y, direction`
                    )
                }

                break;
            }
        }

        if (selectedObjectData !== selectedObject) setSelectedObject(selectedObjectData);

        if (shouldReset) resetSelectedObject(selectedObjectData);

        return true;
    };

    return { canManipulateFurniture, modifyRoomObject };
}