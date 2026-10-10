import { IRoomObjectController, RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomEngineObjectPlacedOnUserEvent, RoomObjectCategoryEnum, RoomObjectMouseEvent, RoomObjectPlacementSource, RoomObjectTileMouseEvent, RoomObjectUserType, RoomObjectVariableEnum, RoomObjectWallMouseEvent, Vector3d } from '@nitrodevco/nitro-api';
import { PlaceBotComposer, PlaceObjectComposer, PlacePetComposer, PlacePostItComposer } from '@nitrodevco/nitro-packets';
import { SelectedRoomObjectData } from '@nitrodevco/nitro-renderer';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomObjectPlacementSource, useRoomSelectedObject, useRoomSelectedObjectActions } from '#base/context/room';
import { setObjectAlphaMultiplier } from '#base/utils';

import { useRoomObjectMove } from './useRoomObjectMove';
import { useRoomObjectSelect } from './useRoomObjectSelect';

/**
 * Placing an object from the inventory, the catalogue or the infostand - `RoomObjectEventHandler.placeObject`
 * and `handleObjectPlace`: a ghost of the object follows the mouse, and a click where it fits
 * places it - the inventory's sent from here, the others by whoever started them, on `REOE_PLACED`.
 */
export const useRoomObjectPlace = () => {
    const room = useRoom();
    const selectedObject = useRoomSelectedObject();
    const objectPlacementSource = useRoomObjectPlacementSource();
    const { setSelectedObject, setPlacedObject } = useRoomSelectedObjectActions();
    const { resetSelectedObject } = useRoomObjectSelect();
    const { handleFurnitureMove, handleWallItemMove } = useRoomObjectMove();
    const { send } = useWebSocketContext();

    const placeObject = (isTileEvent: boolean, isWallEvent: boolean) => {
        if (!room || !selectedObject) return;

        let objectId = selectedObject.objectId;
        const category = selectedObject.category;

        let x = 0;
        let y = 0;
        let z = 0;
        let direction = 0;
        let wallLocation = '';

        const roomObject = room.getRoomObject(objectId, category);

        if (roomObject) {
            const location = roomObject.getLocation();

            direction = roomObject.getDirection().x;
            x = location.x;
            y = location.y;
            z = location.z;

            if (category === RoomObjectCategoryEnum.Wall) {
                const wallGeometry = room.legacyGeometry;

                if (wallGeometry) wallLocation = wallGeometry.getOldLocationString(location, direction);
            }

            direction = (((direction / 45) % 8) + 8) % 8;

            if (objectId < 0 && category === RoomObjectCategoryEnum.Unit) objectId = -objectId;

            // Only the inventory's placements are sent here: the catalogue and the infostand send their own when they hear `REOE_PLACED`.
            if (objectPlacementSource === RoomObjectPlacementSource.INVENTORY) {
                if (category === RoomObjectCategoryEnum.Unit) {
                    if (Number(selectedObject.typeId) === Number(RoomObjectUserType.Pet)) {
                        send(new PlacePetComposer({ petId: objectId, x: Math.trunc(x), y: Math.trunc(y) }));
                    } else if (Number(selectedObject.typeId) === Number(RoomObjectUserType.RentableBot)) {
                        send(new PlaceBotComposer({ botId: objectId, x: Math.trunc(x), y: Math.trunc(y) }));
                    }
                } else if (roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureIsStickie) !== undefined) {
                    send(new PlacePostItComposer({ itemId: objectId, wallLocation }));
                } else {
                    send(new PlaceObjectComposer({
                        itemId: objectId, category, wallLocation, x: Math.trunc(x), y: Math.trunc(y), rotation: direction,
                    }));
                }
            }
        }

        setPlacedObject(new SelectedRoomObjectData(selectedObject.objectId, selectedObject.category));

        resetSelectedObject(selectedObject);

        room.dispatchEvent(
            new RoomEngineObjectPlacedEvent(
                RoomEngineObjectEvent.PLACED,
                room.roomId,
                objectId,
                category,
                wallLocation,
                x,
                y,
                z,
                direction,
                roomObject?.id === selectedObject.objectId,
                isTileEvent,
                isWallEvent,
                selectedObject.instanceData,
            ),
        );
    };

    const placeObjectOnUser = (objectId: number, category: RoomObjectCategoryEnum) => {
        room?.dispatchEvent(
            new RoomEngineObjectPlacedOnUserEvent(
                RoomEngineObjectEvent.PLACED_ON_USER,
                room.roomId,
                objectId,
                category,
                objectId,
                category,
            ),
        );
    };

    const handleUserPlace = (roomObject: IRoomObjectController, x: number, y: number) => {
        if (!room || !room.legacyGeometry?.isRoomTile(x, y)) return false;

        roomObject.setLocation(new Vector3d(x, y, room.legacyGeometry.getHeight(x, y)));

        return true;
    };

    const handleObjectPlace = (event: RoomObjectMouseEvent) => {
        if (!room || !event || !selectedObject) return;

        let roomObject = room.getRoomObject(selectedObject.objectId, selectedObject.category);

        if (!roomObject) {
            if (event instanceof RoomObjectTileMouseEvent) {
                if (selectedObject.category === RoomObjectCategoryEnum.Floor) {
                    room.addFurnitureFloorByTypeId(selectedObject.objectId, selectedObject.typeId, selectedObject.loc, selectedObject.dir, 0, selectedObject.stuffData, parseFloat(selectedObject.instanceData), -1, 0, 0, '', false);
                } else if (selectedObject.category === RoomObjectCategoryEnum.Unit) {
                    room.addRoomObjectUser(selectedObject.objectId, new Vector3d(), new Vector3d(180), 180, selectedObject.typeId, selectedObject.instanceData);

                    const placed = room.getRoomObject(selectedObject.objectId, selectedObject.category);

                    if (placed && selectedObject.posture) placed.model.setValue(RoomObjectVariableEnum.FigurePosture, selectedObject.posture);
                }
            } else if (event instanceof RoomObjectWallMouseEvent && selectedObject.category === RoomObjectCategoryEnum.Wall) {
                room.addFurnitureWallByTypeId(selectedObject.objectId, selectedObject.typeId, selectedObject.loc, selectedObject.dir, 0, selectedObject.instanceData, 0);
            }

            roomObject = room.getRoomObject(selectedObject.objectId, selectedObject.category);

            if (roomObject && selectedObject.category === RoomObjectCategoryEnum.Floor) {
                const allowedDirections = roomObject.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

                if (allowedDirections?.length) {
                    roomObject.setDirection(new Vector3d(allowedDirections[0]));

                    setSelectedObject(new SelectedRoomObjectData(
                        selectedObject.objectId,
                        selectedObject.category,
                        selectedObject.operation,
                        selectedObject.loc,
                        selectedObject.dir,
                        selectedObject.typeId,
                        selectedObject.instanceData,
                        selectedObject.stuffData,
                        selectedObject.state,
                        selectedObject.animFrame,
                        selectedObject.posture,
                    ));
                }
            }

            if (roomObject) setObjectAlphaMultiplier(roomObject, 0.5);

            room.setRoomOverlayIconSpriteVisibility(true);
        }

        if (!roomObject) return;

        let added = true;

        if (selectedObject.category === RoomObjectCategoryEnum.Floor) {
            if (!(event instanceof RoomObjectTileMouseEvent && handleFurnitureMove(roomObject, selectedObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5)))) {
                room.removeRoomObjectFloor(selectedObject.objectId);

                added = false;
            }
        } else if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
            added = event instanceof RoomObjectWallMouseEvent
                && handleWallItemMove(roomObject, selectedObject, event.wallLocation, event.wallWidth, event.wallHeight, event.x, event.y, event.direction);

            if (!added) room.removeRoomObjectWall(selectedObject.objectId);

            room.updateRoomObjectMask(selectedObject.objectId, added);
        } else if (selectedObject.category === RoomObjectCategoryEnum.Unit) {
            if (!(event instanceof RoomObjectTileMouseEvent && handleUserPlace(roomObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5)))) {
                room.removeRoomObject(selectedObject.objectId, RoomObjectCategoryEnum.Unit);

                added = false;
            }
        }

        room.setRoomOverlayIconSpriteVisibility(!added);
    };

    return { placeObject, placeObjectOnUser, handleUserPlace, handleObjectPlace };
};
