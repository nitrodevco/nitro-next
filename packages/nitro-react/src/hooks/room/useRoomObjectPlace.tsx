import type { IRoomObjectController } from "@nitrodevco/nitro-api";
import { NitroLogger, RoomObjectCategoryEnum, RoomObjectPlacementSource, RoomObjectType, RoomObjectVariableEnum, Vector3d } from "@nitrodevco/nitro-api";
import { SelectedRoomObjectData } from "@nitrodevco/nitro-renderer";
import type { RoomObjectMouseEvent } from "@nitrodevco/nitro-shared";
import { RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomEngineObjectPlacedOnUserEvent, RoomObjectTileMouseEvent, RoomObjectWallMouseEvent } from "@nitrodevco/nitro-shared";

import { useRoomObjectPlacementSource, useRoomSelectedObject, useRoomSelectedObjectActions, useRoomSelector } from "#base/context";

import { useRoomObjectMove } from "./useRoomObjectMove";
import { useRoomObjectSelect } from "./useRoomObjectSelect";
import { useRoomObjectValidation } from "./useRoomObjectValidation";

export const useRoomObjectPlace = () => {
    const room = useRoomSelector();
    const selectedObject = useRoomSelectedObject();
    const objectPlacementSource = useRoomObjectPlacementSource();
    const { setSelectedObject, setPlacedObject } = useRoomSelectedObjectActions();
    const { setFurnitureAlphaMultiplier } = useRoomObjectValidation();
    const { resetSelectedObject } = useRoomObjectSelect();
    const { handleFurnitureMove, handleWallItemMove } = useRoomObjectMove();

    const placeObject = (isTileEvent: boolean, isWallEvent: boolean) => {
        if (!selectedObject) return;

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
                const wallGeometry = room.instance.legacyGeometry;

                if (wallGeometry) wallLocation = wallGeometry.getOldLocationString(location, direction);
            }

            direction = (((direction / 45) % 8) + 8) % 8;

            if (objectId < 0 && category === RoomObjectCategoryEnum.Unit) objectId = -objectId;

            if (objectPlacementSource !== RoomObjectPlacementSource.CATALOG) {
                if (category === RoomObjectCategoryEnum.Unit) {
                    if (selectedObject.typeId === RoomObjectType.PET) {
                        NitroLogger.sendPacket(`new PetPlaceComposer(${selectedObject.objectId}, Math.trunc(${x}), Math.trunc(${y}))`);
                    } else if (selectedObject.typeId === RoomObjectType.RENTABLE_BOT) {
                        NitroLogger.sendPacket(`new BotPlaceComposer(${selectedObject.objectId}, Math.trunc(${x}), Math.trunc(${y}))`);
                    }
                } else if (roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureIsStickie) !== undefined) {
                    NitroLogger.sendPacket(`new FurniturePostItPlaceComposer(objectId, wallLocation)`);
                } else {
                    NitroLogger.sendPacket(`new FurniturePlaceComposer(objectId, category, wallLocation, Math.trunc(x), Math.trunc(y), direction)`);
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
        room.dispatchEvent(
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
        if (!room.instance.legacyGeometry.isRoomTile(x, y)) return false;

        roomObject.setLocation(new Vector3d(x, y, room.instance.legacyGeometry.getHeight(x, y)));

        return true;
    };

    const handleObjectPlace = (event: RoomObjectMouseEvent) => {
        if (!event || !selectedObject) return;

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
                room.addFurnitureWallByTypeId(selectedObject.objectId, selectedObject.typeId, selectedObject.loc, selectedObject.dir, 0, parseInt(selectedObject.instanceData), 0);
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

            if (roomObject) setFurnitureAlphaMultiplier(roomObject, 0.5);

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
            added = event instanceof RoomObjectWallMouseEvent &&
                handleWallItemMove(roomObject, selectedObject, event.wallLocation, event.wallWidth, event.wallHeight, event.x, event.y, event.direction);

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
}