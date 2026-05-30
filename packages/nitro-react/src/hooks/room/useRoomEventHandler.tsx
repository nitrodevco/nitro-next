
import type { IRoomObject, IRoomObjectController, ISelectedRoomObjectData, IVector3D } from '@nitrodevco/nitro-api';
import { MouseEventType, NitroLogger, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectPlacementSource, RoomObjectType, RoomObjectUserType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine, ObjectTileCursorUpdateMessage, RoomGeometry, SelectedRoomObjectData } from '@nitrodevco/nitro-renderer';
import { RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomEngineObjectPlacedOnUserEvent, RoomObjectMouseEvent, RoomObjectTileMouseEvent, RoomObjectWallMouseEvent } from '@nitrodevco/nitro-shared';

import { useFurnitureDataStore } from '#base/stores';

import { useRoomContext } from '../context';
import { useRoomSelectedObject } from './useRoomSelectedObject';

export const useRoomEventHandler = () => {
    const room = useRoomContext(x => x.room);
    const ownUserId = useRoomContext(x => x.ownUserId);
    const controllerLevel = useRoomContext(x => x.controllerLevel);
    const isRoomOwner = useRoomContext(x => x.isRoomOwner);
    const isSpectator = useRoomContext(x => x.isSpectator);
    const getMouseEventId = useRoomContext(x => x.getMouseEventId);
    const setMouseEventId = useRoomContext(x => x.setMouseEventId);
    const floorItems = useFurnitureDataStore(state => state.floorItems);
    const selectedObject = useRoomContext(x => x.selectedObject);
    const placedObject = useRoomContext(x => x.placedObject);
    const objectPlacementSource = useRoomContext(x => x.objectPlacementSource);
    const setSelectedObject = useRoomContext(x => x.setSelectedObject);
    const setPlacedObject = useRoomContext(x => x.setPlacedObject);
    const { selectAvatar, selectObject, deselectObject, resetSelectedObject } = useRoomSelectedObject();

    const isFurnitureOwner = (object: IRoomObject) => ownUserId === object.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId);

    const canManipulateFurniture = (objectId: number, category: RoomObjectCategoryEnum) => isRoomOwner || (controllerLevel >= RoomControllerLevelEnum.Guest || isFurnitureOwner(room.getRoomObject(objectId, category))); // or isModerator

    const setFurnitureAlphaMultiplier = (object: IRoomObjectController, multiplier: number) => {
        object?.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, multiplier);
    };

    const getActiveSurfaceLocation = (roomObject: IRoomObject, event: RoomObjectMouseEvent) => {
        if (!roomObject || !event) return undefined;

        const furniData = floorItems.get(roomObject.type);

        if (!furniData || (!furniData.canStandOn && !furniData.canSitOn && !furniData.canLayOn)) return undefined;

        const location = roomObject.getLocation();
        const direction = roomObject.getDirection();

        let sizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);
        const sizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);

        if (direction.x === 90 || direction.x === 270) [sizeX, sizeY] = [sizeY, sizeX];

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        const scale = room.getGeometry()?.scale ?? RoomGeometry.SCALE_ZOOMED_IN;
        const sitOffset = furniData.canSitOn ? 0.5 : 0;
        const scaledX = (scale / 2 + event.spriteOffsetX + event.localX) / (scale / 4);
        const scaledY = (event.spriteOffsetY + event.localY + ((sizeZ - sitOffset) * scale) / 2) / (scale / 4);
        const gridX = (scaledX + 2 * scaledY) / 4;
        const gridY = (scaledX - 2 * scaledY) / 4;
        const x = Math.floor(location.x + gridX);
        const y = Math.floor(location.y - gridY + 1);

        const outOfBounds = x < location.x || x >= location.x + sizeX || y < location.y || y >= location.y + sizeY;

        if (outOfBounds) return undefined;

        return new Vector3d(x, y, furniData.canSitOn ? sizeZ - 0.5 : sizeZ);
    };

    const placeObject = (isTileEvent: boolean, isWallEvent: boolean) => {
        if (!selectedObject) return;

        let objectId = selectedObject.id;
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
                        NitroLogger.sendPacket(`new PetPlaceComposer(${selectedObject.id}, Math.trunc(${x}), Math.trunc(${y}))`);
                    } else if (selectedObject.typeId === RoomObjectType.RENTABLE_BOT) {
                        NitroLogger.sendPacket(`new BotPlaceComposer(${selectedObject.id}, Math.trunc(${x}), Math.trunc(${y}))`);
                    }
                } else if (roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureIsStickie) !== undefined) {
                    NitroLogger.sendPacket(`new FurniturePostItPlaceComposer(objectId, wallLocation)`);
                } else {
                    NitroLogger.sendPacket(`new FurniturePlaceComposer(objectId, category, wallLocation, Math.trunc(x), Math.trunc(y), direction)`);
                }
            }
        }

        setPlacedObject(new SelectedRoomObjectData(selectedObject.id, selectedObject.category));

        resetSelectedObject();

        room.dispatchEvent(
            new RoomEngineObjectPlacedEvent(
                RoomEngineObjectEvent.PLACED,
                room.roomId,
                objectId,
                category,
                wallLocation,
                x, y, z,
                direction,
                roomObject?.id === selectedObject.id,
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

    const getValidRoomObjectDirection = (roomObject: IRoomObjectController, forward: boolean) => {
        if (!roomObject?.model) return 0;

        const allowedDirections: number[] = roomObject.type === RoomObjectUserType.MONSTER_PLANT
            ? roomObject.model.getValue<number[]>(RoomObjectVariableEnum.PetAllowedDirections)
            : roomObject.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

        const direction = roomObject.getDirection().x;

        if (!allowedDirections?.length) return direction;

        let dirIndex = allowedDirections.indexOf(direction);

        if (dirIndex < 0) {
            const insertAt = allowedDirections.findIndex(d => direction <= d);
            dirIndex = insertAt < 0 ? 0 : insertAt;
        }

        dirIndex = forward
            ? (dirIndex + 1) % allowedDirections.length
            : (dirIndex - 1 + allowedDirections.length) % allowedDirections.length;

        return allowedDirections[dirIndex];
    };

    const isValidLocation = (object: IRoomObject, goalDirection: IVector3D) => {
        if (!object?.model || !goalDirection) return false;

        const direction = object.getDirection();
        const location = object.getLocation();

        if (!direction || !location) return false;

        if (direction.x % 180 === goalDirection.x % 180) return true;

        let sizeX = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        let prevSizeX = sizeX;
        let prevSizeY = sizeY;

        const goalQuadrant = Math.trunc((Math.trunc(goalDirection.x + 45) % 360) / 90);
        if (goalQuadrant === 1 || goalQuadrant === 3) [sizeX, sizeY] = [sizeY, sizeX];

        const dirQuadrant = Math.trunc((Math.trunc(direction.x + 45) % 360) / 90);
        if (dirQuadrant === 1 || dirQuadrant === 3) [prevSizeX, prevSizeY] = [prevSizeY, prevSizeX];

        const alwaysStackable = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureAlwaysStackable) === 1;

        return room.instance.furnitureStackingHeightMap.validateLocation(
            location.x, location.y, sizeX, sizeY,
            location.x, location.y, prevSizeX, prevSizeY,
            alwaysStackable, location.z,
        );
    };

    const modifyRoomObject = (objectId: number, category: RoomObjectCategoryEnum, operation: RoomObjectOperationType) => {
        const roomObject = room.getRoomObject(objectId, category);

        if (!roomObject) return false;

        let shouldReset = true;

        switch (operation) {
            case RoomObjectOperationType.OBJECT_ROTATE_POSITIVE:
            case RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE: {
                const forward = operation === RoomObjectOperationType.OBJECT_ROTATE_POSITIVE;
                const direction = getValidRoomObjectDirection(roomObject, forward);

                if (isValidLocation(roomObject, new Vector3d(direction))) {
                    const _x = roomObject.getLocation().x;
                    const _y = roomObject.getLocation().y;

                    if (roomObject.type === RoomObjectUserType.MONSTER_PLANT) {
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
                resetSelectedObject();

                setSelectedObject(new SelectedRoomObjectData(
                    roomObject.id, category, operation,
                    roomObject.getLocation(), roomObject.getDirection(),
                ));

                //GetRoomEngine().setObjectMoverIconSprite(roomObject.id, category, true);
                //GetRoomEngine().setObjectMoverIconSpriteVisible(false);

                break;
            case RoomObjectOperationType.OBJECT_MOVE_TO: {
                shouldReset = false;

                setFurnitureAlphaMultiplier(roomObject, 1);

                if (category === RoomObjectCategoryEnum.Wall) room.updateRoomObjectMask(objectId, true);

                //GetRoomEngine().removeObjectMoverIconSprite();

                if (category === RoomObjectCategoryEnum.Floor) {
                    const _angle = roomObject.getDirection().x % 360;
                    const _location = roomObject.getLocation();
                    const _direction = _angle / 45;

                    NitroLogger.sendPacket(`new FurnitureFloorUpdateComposer(objectId, location.x, location.y, direction`);
                } else if (category === RoomObjectCategoryEnum.Wall) {
                    const _angle = roomObject.getDirection().x % 360;
                    const _location = room.instance.legacyGeometry.getOldLocationString(roomObject.getLocation(), _angle);

                    NitroLogger.sendPacket(`new FurnitureWallUpdateComposer(objectId, location)`);
                } else if (category === RoomObjectCategoryEnum.Unit) {
                    const _angle = roomObject.getDirection().x % 360;
                    const _location = roomObject.getLocation();
                    const _direction = _angle / 45;
                    const _race = parseInt(roomObject.model.getValue<string>(RoomObjectVariableEnum.Race));

                    NitroLogger.sendPacket(
                        `new PetMoveComposer(userData.webID, location.x, location.y, direction`)
                }

                setSelectedObject(undefined);

                break;
            }
        }

        if (shouldReset) resetSelectedObject();

        return true;
    };

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

    const validateFurnitureLocation = (roomObject: IRoomObject, loc: IVector3D, prevLoc: IVector3D, prevDir: IVector3D) => {
        if (!roomObject?.model || !loc || !prevLoc || !prevDir) return undefined;

        if (loc.x === prevLoc.x && loc.y === prevLoc.y && roomObject.getDirection().x === prevDir.x) {
            const vec = new Vector3d();
            vec.assign(prevLoc);
            return vec;
        }

        let sizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        let prevSizeX = sizeX;
        let prevSizeY = sizeY;

        const curQuadrant = Math.trunc((Math.trunc(roomObject.getDirection().x + 45) % 360) / 90);
        if (curQuadrant === 1 || curQuadrant === 3) [sizeX, sizeY] = [sizeY, sizeX];

        const prevQuadrant = Math.trunc((Math.trunc(prevDir.x + 45) % 360) / 90);
        if (prevQuadrant === 1 || prevQuadrant === 3) [prevSizeX, prevSizeY] = [prevSizeY, prevSizeX];

        const stackable = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAlwaysStackable) === 1;

        if (!room.instance.furnitureStackingHeightMap.validateLocation(loc.x, loc.y, sizeX, sizeY, prevLoc.x, prevLoc.y, prevSizeX, prevSizeY, stackable))
            return undefined;

        return new Vector3d(loc.x, loc.y, room.instance.furnitureStackingHeightMap.getTileHeight(loc.x, loc.y));
    };

    const validateWallItemLocation = (
        roomObject: IRoomObject,
        origin: IVector3D,
        wallWidth: IVector3D,
        wallHeight: IVector3D,
        posX: number,
        posY: number,
        selectedObjectData: ISelectedRoomObjectData,
    ) => {
        if (!roomObject?.model || !origin || !wallWidth || !wallHeight || !selectedObjectData) return undefined;

        const furniSizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        const furniSizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);
        const furniCenterZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureCenterZ);

        const halfW = furniSizeX / 2;
        const maxX = wallWidth.length - halfW;
        const maxY = wallHeight.length - (furniSizeZ - furniCenterZ);

        if (posX < halfW || posX > maxX || posY < furniCenterZ || posY > maxY) {
            if (posX < halfW && posX <= maxX) posX = halfW;
            else if (posX >= halfW && posX > maxX) posX = maxX;

            if (posY < furniCenterZ && posY <= maxY) posY = furniCenterZ;
            else if (posY >= furniCenterZ && posY > maxY) posY = maxY;
        }

        if (posX < halfW || posX > maxX || posY < furniCenterZ || posY > maxY) return undefined;

        return Vector3d.sum(origin, Vector3d.sum(
            Vector3d.product(wallWidth, posX / wallWidth.length),
            Vector3d.product(wallHeight, posY / wallHeight.length),
        ));
    };

    const handleFurnitureMove = (
        roomObject: IRoomObjectController,
        selectedObjectData: ISelectedRoomObjectData,
        x: number,
        y: number,
    ) => {
        if (!roomObject || !selectedObjectData) return false;

        const realDir = new Vector3d();
        realDir.assign(roomObject.getDirection());

        roomObject.setDirection(selectedObjectData.dir);

        const newLoc = new Vector3d(x, y, 0);
        const newDir = new Vector3d();
        newDir.assign(roomObject.getDirection());

        let loc = validateFurnitureLocation(roomObject, newLoc, selectedObjectData.loc, selectedObjectData.dir);

        if (!loc) {
            newDir.x = getValidRoomObjectDirection(roomObject, true);
            roomObject.setDirection(newDir);
            loc = validateFurnitureLocation(roomObject, newLoc, selectedObjectData.loc, selectedObjectData.dir);
        }

        if (!loc) {
            roomObject.setDirection(realDir);
            return false;
        }

        roomObject.setLocation(loc);
        roomObject.setDirection(newDir);

        return true;
    };

    const handleWallItemMove = (
        roomObject: IRoomObjectController,
        selectedObjectData: ISelectedRoomObjectData,
        wallLocation: IVector3D,
        wallWidth: IVector3D,
        wallHeight: IVector3D,
        posX: number,
        posY: number,
        direction: number,
    ) => {
        if (!roomObject || !selectedObjectData) return false;

        const newLocation = validateWallItemLocation(roomObject, wallLocation, wallWidth, wallHeight, posX, posY, selectedObjectData);

        if (!newLocation) return false;

        roomObject.setLocation(newLocation);
        roomObject.setDirection(new Vector3d(direction));

        return true;
    };

    const handleObjectMove = (event: RoomObjectMouseEvent) => {
        if (!event || !selectedObject) return;

        const roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

        if (!roomObject) return;

        let added = true;

        if (selectedObject.category === RoomObjectCategoryEnum.Floor || selectedObject.category === RoomObjectCategoryEnum.Unit) {
            if (!(event instanceof RoomObjectTileMouseEvent && handleFurnitureMove(roomObject, selectedObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5)))) {
                added = false;
            }
        } else if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
            added = false;

            if (event instanceof RoomObjectWallMouseEvent) {
                if (handleWallItemMove(roomObject, selectedObject, event.wallLocation, event.wallWidth, event.wallHeight, event.x, event.y, event.direction))
                    added = true;
            }

            if (!added) {
                roomObject.setLocation(selectedObject.loc);
                roomObject.setDirection(selectedObject.dir);
            }

            room.updateRoomObjectMask(selectedObject.id, added);
        }

        setFurnitureAlphaMultiplier(roomObject, added ? 0.5 : 0);
    };

    const handleUserPlace = (roomObject: IRoomObjectController, x: number, y: number) => {
        if (!room.instance.legacyGeometry.isRoomTile(x, y)) return false;

        roomObject.setLocation(new Vector3d(x, y, room.instance.legacyGeometry.getHeight(x, y)));

        return true;
    };

    const handleObjectPlace = async (event: RoomObjectMouseEvent) => {
        if (!event || !selectedObject) return;

        let roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

        if (!roomObject) {
            if (event instanceof RoomObjectTileMouseEvent) {
                if (selectedObject.category === RoomObjectCategoryEnum.Floor) {
                    await room.addFurnitureByTypeId(selectedObject.id, selectedObject.typeId, selectedObject.loc, selectedObject.dir, 0, selectedObject.stuffData, parseFloat(selectedObject.instanceData), -1, 0, 0, '', false);
                } else if (selectedObject.category === RoomObjectCategoryEnum.Unit) {
                    await room.addRoomObjectUser(selectedObject.id, new Vector3d(), new Vector3d(180), 180, selectedObject.typeId, selectedObject.instanceData);

                    const placed = room.getRoomObject(selectedObject.id, selectedObject.category);

                    if (placed && selectedObject.posture) placed.model.setValue(RoomObjectVariableEnum.FigurePosture, selectedObject.posture);
                }
            } else if (event instanceof RoomObjectWallMouseEvent && selectedObject.category === RoomObjectCategoryEnum.Wall) {
                await room.addFurnitureWallByTypeId(selectedObject.id, selectedObject.typeId, selectedObject.loc, selectedObject.dir, 0, parseInt(selectedObject.instanceData), 0);
            }

            roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

            if (roomObject && selectedObject.category === RoomObjectCategoryEnum.Floor) {
                const allowedDirections = roomObject.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);

                if (allowedDirections?.length) {
                    roomObject.setDirection(new Vector3d(allowedDirections[0]));

                    setSelectedObject(new SelectedRoomObjectData(
                        selectedObject.id, selectedObject.category, selectedObject.operation, selectedObject.loc, selectedObject.dir,
                        selectedObject.typeId, selectedObject.instanceData, selectedObject.stuffData, selectedObject.state, selectedObject.animFrame, selectedObject.posture,
                    ));
                }
            }

            if (roomObject) setFurnitureAlphaMultiplier(roomObject, 0.5);
            //this._roomEngine.setObjectMoverIconSpriteVisible(true)
        }

        if (!roomObject) return;

        if (selectedObject.category === RoomObjectCategoryEnum.Floor) {
            if (!(event instanceof RoomObjectTileMouseEvent && handleFurnitureMove(roomObject, selectedObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5))))
                room.removeRoomObjectFloor(selectedObject.id);
        } else if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
            const added = event instanceof RoomObjectWallMouseEvent &&
                handleWallItemMove(roomObject, selectedObject, event.wallLocation, event.wallWidth, event.wallHeight, event.x, event.y, event.direction);

            if (!added) room.removeRoomObjectWall(selectedObject.id);

            room.updateRoomObjectMask(selectedObject.id, added);
        } else if (selectedObject.category === RoomObjectCategoryEnum.Unit) {
            if (!(event instanceof RoomObjectTileMouseEvent && handleUserPlace(roomObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5))))
                room.removeRoomObject(selectedObject.id, RoomObjectCategoryEnum.Unit);
        }

        //this._roomEngine.setObjectMoverIconSpriteVisible(!_local_12);
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
                            if (selectedObject) modifyRoomObject(selectedObject.id, selectedObject.category, RoomObjectOperationType.OBJECT_MOVE_TO);
                        } else if (category === RoomObjectCategoryEnum.Unit) {
                            if (selectedObject && event.objectType === RoomObjectUserType.MONSTER_PLANT)
                                modifyRoomObject(selectedObject.id, selectedObject.category, RoomObjectOperationType.OBJECT_MOVE_TO);

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
                                case RoomObjectUserType.MONSTER_PLANT:
                                case RoomObjectUserType.RENTABLE_BOT:
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
                                if (room.isDecorating || isSpectator) return;

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
                                if (event.ctrlKey && !event.altKey && !event.shiftKey && event.objectType === RoomObjectUserType.RENTABLE_BOT) {
                                    modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_BOT);
                                } else if (event.ctrlKey && !event.altKey && !event.shiftKey && event.objectType === RoomObjectUserType.MONSTER_PLANT) {
                                    modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_PET);
                                } else if (!event.ctrlKey && !event.altKey && event.shiftKey && event.objectType === RoomObjectUserType.MONSTER_PLANT) {
                                    modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                                }

                                didWalk = !room.isPlayingGame();
                                didMove = room.isPlayingGame();
                            } else if (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall) {
                                if (event.altKey || event.ctrlKey || event.shiftKey) {
                                    if (!event.ctrlKey && !event.altKey && event.shiftKey && category === RoomObjectCategoryEnum.Floor) {
                                        if (canManipulateFurniture(event.objectId, category)) modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                                    } else if (event.ctrlKey && !event.altKey && !event.shiftKey) {
                                        modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
                                    }

                                    didWalk = room.isPlayingGame();
                                    didMove = !room.isPlayingGame();
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
                    if (operation === RoomObjectOperationType.OBJECT_MOVE) handleObjectMove(event);
                    else if (operation === RoomObjectOperationType.OBJECT_PLACE) void handleObjectPlace(event);
                }

                return;
            }
            case RoomObjectMouseEvent.MOUSE_DOWN: {
                const operation = selectedObject?.operation ?? RoomObjectOperationType.OBJECT_UNDEFINED;
                const category = room.getRoomObjectCategoryForType(event.objectType);

                if (
                    operation === RoomObjectOperationType.OBJECT_UNDEFINED &&
                    (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall || event.objectType === RoomObjectUserType.MONSTER_PLANT) &&
                    ((event.altKey && !event.ctrlKey && !event.shiftKey) || (room.isDecorating && !(event.ctrlKey || event.shiftKey)))
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

    return { handleRoomObjectMouseEvent };
};
