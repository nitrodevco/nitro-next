import { IRoomObject, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectUserTypeName, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { MoveEntityInFlatComposer, MoveObjectComposer, MovePetComposer, MoveWallItemComposer, PickupObjectComposer, RemoveBotFromFlatComposer, RemovePetFromFlatComposer } from '@nitrodevco/nitro-packets';
import { SelectedRoomObjectData } from '@nitrodevco/nitro-renderer';

import { useWebSocketContext } from '#base/context/communication';
import { roomStore, useRoom, useRoomSelectedObject, useRoomSelectedObjectActions, useRoomStore } from '#base/context/room';
import { useOwnIsModerator, useOwnUserId } from '#base/context/user';

import { useRoomObjectSelect } from './useRoomObjectSelect';
import { useRoomObjectValidation } from './useRoomObjectValidation';

/**
 * The manipulation menu's operations on a room object - move, rotate, pick up, eject and the
 * rest of `RoomObjectOperationType` - and who may perform them:
 * `RoomObjectEventHandler.modifyRoomObject` with `SessionDataManager.canManipulateFurniture`.
 * While the session is in wired play test mode nothing is modified, unless the room's
 * configuration items free the furni for everyone.
 */
export const useRoomObjectModify = () => {
    const room = useRoom();
    const ownUserId = useOwnUserId();
    const isModerator = useOwnIsModerator();
    const selectedObject = useRoomSelectedObject();
    const controllerLevel = useRoomStore(x => x.controllerLevel);
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const isFreeFurniMovementsMode = useRoomStore(x => x.isFreeFurniMovementsMode);
    const playTestMode = useRoomStore(x => x.playTestMode);
    const { setSelectedObject } = useRoomSelectedObjectActions();
    const { resetSelectedObject } = useRoomObjectSelect();
    const { setObjectAlphaMultiplier, isValidLocation, getValidRoomObjectDirection } = useRoomObjectValidation();
    const { send } = useWebSocketContext();

    /**
     * A unit's own account id, which is what the pet and bot composers are addressed by. Read when
     * the operation happens rather than subscribed to - every user update would otherwise
     * re-render whatever mounts this.
     */
    const getUserWebId = (objectId: number) => roomStore.getState().usersByRoomObjectId[objectId]?.webID ?? 0;

    /**
     * `RoomObjectEventHandler.sendMoveUserObjectMessage`: of the units, a rentable bot moves by its
     * room object id and a monsterplant by its pet id; anything else cannot be moved this way.
     */
    const moveUnit = (roomObject: IRoomObject, objectId: number, x: number, y: number, direction: number) => {
        if (roomObject.type === RoomObjectUserTypeName.RentableBot) {
            send(new MoveEntityInFlatComposer({ objectId, x, y, direction }));

            return;
        }

        if (roomObject.type !== RoomObjectUserTypeName.MonsterPlant) return;

        const petId = getUserWebId(objectId);

        if (petId) send(new MovePetComposer({ petId, x, y, direction }));
    };

    const isFurnitureOwner = (object: IRoomObject | undefined) => object && (ownUserId === object.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId));

    /** `RoomDesktop.checkFurniManipulationRights`: rights, ownership, or a room whose configuration items free the furni for everyone. */
    const canManipulateFurniture = (objectId: number, category: RoomObjectCategoryEnum) => room && (isRoomOwner || isModerator || (controllerLevel >= RoomControllerLevelEnum.Guest) || isFreeFurniMovementsMode || isFurnitureOwner(room.getRoomObject(objectId, category)));

    const modifyRoomObject = (objectId: number, category: RoomObjectCategoryEnum, operation: RoomObjectOperationType) => {
        if (!room) return false;

        if (!isFreeFurniMovementsMode && playTestMode) return false;

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
                    const x = roomObject.getLocation().x;
                    const y = roomObject.getLocation().y;

                    if (category === RoomObjectCategoryEnum.Unit) moveUnit(roomObject, objectId, x, y, direction / 45);
                    else send(new MoveObjectComposer({ objectId, x, y, rotation: direction / 45 }));
                }

                break;
            }
            case RoomObjectOperationType.OBJECT_EJECT:
            case RoomObjectOperationType.OBJECT_PICKUP:
                send(new PickupObjectComposer({ categoryId: category, objectId, confirm: true }));
                break;
            /*
             * A pet and a bot are picked up by their own id rather than the room object's, which
             * is why neither goes through `PickupObjectComposer`.
             */
            case RoomObjectOperationType.OBJECT_PICKUP_PET: {
                const petId = getUserWebId(objectId);

                if (petId) send(new RemovePetFromFlatComposer({ petId }));
                break;
            }
            case RoomObjectOperationType.OBJECT_PICKUP_BOT: {
                const botId = getUserWebId(objectId);

                if (botId) send(new RemoveBotFromFlatComposer({ botId }));
                break;
            }
            case RoomObjectOperationType.OBJECT_MOVE:
                shouldReset = false;
                setObjectAlphaMultiplier(roomObject, 0.5);

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

                setObjectAlphaMultiplier(roomObject, 1);

                room.removeRoomOverlayIconSprite();

                if (category === RoomObjectCategoryEnum.Floor) {
                    const _angle = roomObject.getDirection().x % 360;
                    const location = roomObject.getLocation();
                    const rotation = _angle / 45;

                    send(new MoveObjectComposer({ objectId, x: location.x, y: location.y, rotation }));
                } else if (category === RoomObjectCategoryEnum.Wall) {
                    const _angle = roomObject.getDirection().x % 360;
                    const location = room.legacyGeometry?.getOldLocationString(roomObject.getLocation(), _angle);

                    send(new MoveWallItemComposer({ objectId, wallPosition: location ?? '' }));
                } else if (category === RoomObjectCategoryEnum.Unit) {
                    const location = roomObject.getLocation();

                    moveUnit(roomObject, objectId, Math.trunc(location.x), Math.trunc(location.y), (roomObject.getDirection().x % 360) / 45);
                }

                break;
            }
        }

        if (selectedObjectData !== selectedObject) setSelectedObject(selectedObjectData);

        if (shouldReset) resetSelectedObject(selectedObjectData);

        return true;
    };

    return { canManipulateFurniture, modifyRoomObject };
};
