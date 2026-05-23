
import type { IRoomObject, IRoomObjectController, ISelectedRoomObjectData, IVector3D } from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectPlacementSource, RoomObjectType, RoomObjectUserType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine, ObjectAvatarSelectedMessage, ObjectSelectedMessage, ObjectTileCursorUpdateMessage, ObjectVisibilityUpdateMessage, RoomGeometry, SelectedRoomObjectData } from '@nitrodevco/nitro-renderer';
import type { RoomObjectEvent, RoomSpriteMouseEvent } from '@nitrodevco/nitro-shared';
import { RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomEngineObjectPlacedOnUserEvent, RoomObjectFurnitureActionEvent, RoomObjectMouseEvent, RoomObjectTileMouseEvent, RoomObjectWallMouseEvent } from '@nitrodevco/nitro-shared';
import { useEffect, useRef, useState } from 'react';

import { useFurnitureDataStore } from '#base/stores';

import { useRoomContext } from './useRoomContext';
import { useRoomObjectEvent } from './useRoomObjectEvent';

export const useRoomEventHandler = () => {
    const { room } = useRoomContext();
    const floorItems = useFurnitureDataStore(state => state.floorItems);
    const [selectedAvatarId, setSelectedAvatarId] = useState<number>(-1);
    const [selectedObjectId, setSelectedObjectId] = useState<number>(-1);
    const [selectedObjectCategory, setSelectedObjectCategory] = useState<RoomObjectCategoryEnum>(RoomObjectCategoryEnum.Minimum);
    const [selectedObject, setSelectedObject] = useState<ISelectedRoomObjectData | undefined>(undefined);
    const [placedObject, setPlacedObject] = useState<ISelectedRoomObjectData | undefined>(undefined);
    const [objectPlacementSource, setObjectPlacementSource] = useState<RoomObjectPlacementSource>(RoomObjectPlacementSource.INVENTORY);

    const eventIds = useRef(new Map<RoomObjectCategoryEnum, Map<string, number>>);

    const getMouseEventId = (category: RoomObjectCategoryEnum, type: string) => eventIds.current.get(category)?.get(type);

    const setMouseEventId = (category: RoomObjectCategoryEnum, type: string, eventId: number) => {
        let existing = eventIds.current.get(category);

        if (!existing) {
            existing = new Map();

            eventIds.current.set(category, existing);
        }

        existing.delete(type);
        existing.set(type, eventId);
    }

    const deselectObject = () => {
        if (selectedObjectId === -1) return;

        const roomObject = room?.getRoomObject(selectedObjectId, selectedObjectCategory);

        if (roomObject && roomObject.logic) roomObject.processUpdateMessage(new ObjectSelectedMessage(false));

        setSelectedObjectId(-1);
        setSelectedObjectCategory(RoomObjectCategoryEnum.Minimum);
    }

    const selectAvatar = (objectId: number, lookAt: boolean) => {
        if (!room) return;

        const prevAvatar = room.getRoomObject(selectedAvatarId, RoomObjectCategoryEnum.Unit);

        if (prevAvatar && prevAvatar.logic) {
            prevAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(false));

            setSelectedAvatarId(-1);
        }

        const nextAvatar = room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (nextAvatar && nextAvatar.logic) {
            nextAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(true));

            setSelectedAvatarId(objectId);

            if (lookAt) {
                const location = nextAvatar.getLocation();
                //GetCommunication().connection.send(new RoomUnitLookComposer(~~(location.x), ~~(location.y)));
            }
        }

        const selectionArrow = room.getRoomObjectSelectionArrow();

        if (selectionArrow && selectionArrow.logic) {
            if (lookAt && !room.isPlayingGame())
                selectionArrow.processUpdateMessage(
                    new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.ENABLED),
                );
            else
                selectionArrow.processUpdateMessage(
                    new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.DISABLED),
                );
        }
    }

    const selectObject = (objectId: number, category: RoomObjectCategoryEnum) => {
        if (!room) return;

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

                        if (roomObject && roomObject.logic) {
                            roomObject.processUpdateMessage(new ObjectSelectedMessage(true));

                            setSelectedObjectId(objectId);
                            setSelectedObjectCategory(category);
                        }
                    }
                }

                room.eventDispatcher.dispatchEvent(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.SELECTED, room.roomId, objectId, category),
                );
            }
        }
    }

    const setFurnitureAlphaMultiplier = (object: IRoomObjectController, multiplier: number) => {
        if (!object || !object.model) return;

        object.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, multiplier);
    }

    const resetSelectedObject = () => {
        if (!room) return;
        //this._roomEngine.removeObjectMoverIconSprite();

        if (selectedObject) {
            if (
                selectedObject.operation === RoomObjectOperationType.OBJECT_MOVE ||
                selectedObject.operation === RoomObjectOperationType.OBJECT_MOVE_TO
            ) {
                const roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

                if (roomObject && selectedObject.operation !== RoomObjectOperationType.OBJECT_MOVE_TO) {
                    roomObject.setLocation(selectedObject.loc);
                    roomObject.setDirection(selectedObject.dir);
                }

                setFurnitureAlphaMultiplier(roomObject, 1);

                if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
                    room.updateRoomObjectMask(selectedObject.id, true);
                }

                setSelectedObject(
                    new SelectedRoomObjectData(
                        selectedObject.id,
                        selectedObject.category,
                        RoomObjectOperationType.OBJECT_MOVE,
                        selectedObject.loc,
                        selectedObject.dir,
                        selectedObject.typeId,
                        selectedObject.instanceData,
                        selectedObject.stuffData,
                        selectedObject.state,
                        selectedObject.animFrame,
                        selectedObject.posture,
                    ),
                );
            } else if (selectedObject.operation === RoomObjectOperationType.OBJECT_PLACE) {
                const objectId = selectedObject.id;
                const category = selectedObject.category;

                switch (category) {
                    case RoomObjectCategoryEnum.Floor:
                        room.removeRoomObjectFloor(objectId);
                        break;
                    case RoomObjectCategoryEnum.Wall:
                        room.removeRoomObjectWall(objectId);
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        room.removeRoomObject(objectId, RoomObjectCategoryEnum.Unit);
                        break;
                }
            }

            setSelectedObject(undefined);
        }
    }

    const getActiveSurfaceLocation = (roomObject: IRoomObject, event: RoomObjectMouseEvent) => {
        if (!room || !roomObject || !event) return undefined;

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
        const _local_13 = furniData.canSitOn ? 0.5 : 0;
        const _local_14 = (scale / 2 + event.spriteOffsetX + event.localX) / (scale / 4);
        const _local_15 = (event.spriteOffsetY + event.localY + ((sizeZ - _local_13) * scale) / 2) / (scale / 4);
        const _local_16 = (_local_14 + 2 * _local_15) / 4;
        const _local_17 = (_local_14 - 2 * _local_15) / 4;
        const x = Math.floor(location.x + _local_16);
        const y = Math.floor(location.y - _local_17 + 1);

        let _local_20 = false;

        if (x < location.x || x >= location.x + sizeX) _local_20 = true;
        else if (y < location.y || y >= location.y + sizeY) _local_20 = true;

        const z = furniData.canSitOn ? sizeZ - 0.5 : sizeZ;

        if (!_local_20) return new Vector3d(x, y, z);

        return undefined;
    }

    const placeObject = (isTileEvent: boolean, isWallEvent: boolean) => {
        if (!room || !selectedObject) return;

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

            if (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Unit) {
                x = location.x;
                y = location.y;
                z = location.z;
            } else if (category === RoomObjectCategoryEnum.Wall) {
                x = location.x;
                y = location.y;
                z = location.z;

                const wallGeometry = room.instance.legacyGeometry;

                if (wallGeometry) wallLocation = wallGeometry.getOldLocationString(location, direction);
            }

            direction = (((direction / 45) % 8) + 8) % 8;

            if (objectId < 0 && category === RoomObjectCategoryEnum.Unit) objectId = objectId * -1;

            if (objectPlacementSource !== RoomObjectPlacementSource.CATALOG) {
                if (category === RoomObjectCategoryEnum.Unit) {
                    if (selectedObject.typeId === RoomObjectType.PET) {
                        //GetCommunication().connection.send(new PetPlaceComposer(objectId, Math.trunc(x), Math.trunc(y)));
                    } else if (selectedObject.typeId === RoomObjectType.RENTABLE_BOT) {
                        //GetCommunication().connection.send(new BotPlaceComposer(objectId, Math.trunc(x), Math.trunc(y)));
                    }
                } else if (roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureIsStickie) !== undefined) {
                    //GetCommunication().connection.send(new FurniturePostItPlaceComposer(objectId, wallLocation));
                } else {
                    //GetCommunication().connection.send(new FurniturePlaceComposer(objectId, category, wallLocation, Math.trunc(x), Math.trunc(y), direction));
                }
            }
        }

        setPlacedObject(new SelectedRoomObjectData(selectedObject.id, selectedObject.category));

        resetSelectedObject();

        const placedInRoom = roomObject && roomObject.id === selectedObject.id;

        room.eventDispatcher.dispatchEvent(
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
                placedInRoom,
                isTileEvent,
                isWallEvent,
                selectedObject.instanceData,
            ),
        );
    }

    const placeObjectOnUser = (objectId: number, category: RoomObjectCategoryEnum) => {
        room?.eventDispatcher.dispatchEvent(
            new RoomEngineObjectPlacedOnUserEvent(
                RoomEngineObjectEvent.PLACED_ON_USER,
                room.roomId,
                objectId,
                category,
                objectId,
                category,
            ),
        );
    }

    const getValidRoomObjectDirection = (roomObject: IRoomObjectController, _arg_2: boolean) => {
        if (!roomObject || !roomObject.model) return 0;

        let _local_6 = 0;
        let _local_7 = 0;
        let allowedDirections: number[] = [];

        if (roomObject.type === RoomObjectUserType.MONSTER_PLANT) {
            allowedDirections = roomObject.model.getValue<number[]>(RoomObjectVariableEnum.PetAllowedDirections);
        } else {
            allowedDirections = roomObject.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);
        }

        let direction = roomObject.getDirection().x;

        if (allowedDirections && allowedDirections.length) {
            _local_6 = allowedDirections.indexOf(direction);

            if (_local_6 < 0) {
                _local_6 = 0;
                _local_7 = 0;

                while (_local_7 < allowedDirections.length) {
                    if (direction <= allowedDirections[_local_7]) break;

                    _local_6++;
                    _local_7++;
                }

                _local_6 = _local_6 % allowedDirections.length;
            }

            if (_arg_2) _local_6 = (_local_6 + 1) % allowedDirections.length;
            else _local_6 = (_local_6 - 1 + allowedDirections.length) % allowedDirections.length;

            direction = allowedDirections[_local_6];
        }

        return direction;
    }

    const isValidLocation = (object: IRoomObject, goalDirection: IVector3D) => {
        if (!room || !object || !object.model || !goalDirection) return false;

        const direction = object.getDirection();
        const location = object.getLocation();

        if (!direction || !location) return false;

        if (direction.x % 180 === goalDirection.x % 180) return true;

        let sizeX = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);

        if (sizeX < 1) sizeX = 1;

        if (sizeY < 1) sizeY = 1;

        let _local_8 = sizeX;
        let _local_9 = sizeY;

        let _local_11 = Math.trunc((Math.trunc(goalDirection.x + 45) % 360) / 90);

        if (_local_11 === 1 || _local_11 === 3) [sizeX, sizeY] = [sizeY, sizeX];

        _local_11 = Math.trunc((Math.trunc(direction.x + 45) % 360) / 90);

        if (_local_11 === 1 || _local_11 === 3) [_local_8, _local_9] = [_local_9, _local_8];

        const alwaysStackable = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureAlwaysStackable) === 1;

        if (
            room.instance.furnitureStackingHeightMap.validateLocation(
                location.x,
                location.y,
                sizeX,
                sizeY,
                location.x,
                location.y,
                _local_8,
                _local_9,
                alwaysStackable,
                location.z,
            )
        )
            return true;

        return false;
    }

    const modifyRoomObject = (
        objectId: number,
        category: RoomObjectCategoryEnum,
        operation: RoomObjectOperationType,
    ) => {
        if (!room) return false;

        const roomObject = room.getRoomObject(objectId, category);

        if (!room || !roomObject) return false;

        let _local_9 = true;

        switch (operation) {
            case RoomObjectOperationType.OBJECT_ROTATE_POSITIVE:
            case RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE:
                {
                    let direction = 0;

                    if (operation == RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE) {
                        direction = getValidRoomObjectDirection(roomObject, false);
                    } else {
                        direction = getValidRoomObjectDirection(roomObject, true);
                    }

                    const x = roomObject.getLocation().x;
                    const y = roomObject.getLocation().y;

                    if (isValidLocation(roomObject, new Vector3d(direction))) {
                        direction = Math.trunc(direction / 45);

                        if (roomObject.type === RoomObjectUserType.MONSTER_PLANT) {
                            /* const roomSession = GetRoomSessionManager().getSession(roomId);
     
                            if (roomSession) {
                                const userData = roomSession.userDataManager.getUserDataByIndex(objectId);
     
                                if (userData) {
                                    GetCommunication().connection.send(
                                        new PetMoveComposer(userData.webID, Math.trunc(x), Math.trunc(y), direction),
                                    );
                                }
                            } */
                        } else {
                            /* GetCommunication().connection.send(
                                new FurnitureFloorUpdateComposer(objectId, x, y, direction),
                            ); */
                        }
                    }
                }
                break;
            case RoomObjectOperationType.OBJECT_EJECT:
            case RoomObjectOperationType.OBJECT_PICKUP:
                //GetCommunication().connection.send(new FurniturePickupComposer(category, objectId));
                break;
            case RoomObjectOperationType.OBJECT_PICKUP_PET:
                /* const session = GetRoomSessionManager().getSession(roomId);
     
                if (session) {
                    const userData = session.userDataManager.getUserDataByIndex(objectId);
     
                    session.pickupPet(userData.webID);
                } */
                break;
            case RoomObjectOperationType.OBJECT_PICKUP_BOT:
                /* const session = GetRoomSessionManager().getSession(roomId);
     
                if (session) {
                    const userData = session.userDataManager.getUserDataByIndex(objectId);
     
                    session.pickupBot(userData.webID);
                } */
                break;
            case RoomObjectOperationType.OBJECT_MOVE:
                _local_9 = false;
                setFurnitureAlphaMultiplier(roomObject, 0.5);
                resetSelectedObject();

                setSelectedObject(new SelectedRoomObjectData(
                    roomObject.id,
                    category,
                    operation,
                    roomObject.getLocation(),
                    roomObject.getDirection(),
                ));

                //GetRoomEngine().setObjectMoverIconSprite(roomObject.id, category, true);
                //GetRoomEngine().setObjectMoverIconSpriteVisible(false);
                break;
            case RoomObjectOperationType.OBJECT_MOVE_TO: {
                if (selectedObject)
                    setSelectedObject(
                        new SelectedRoomObjectData(
                            selectedObject.id,
                            selectedObject.category,
                            RoomObjectOperationType.OBJECT_MOVE_TO,
                            selectedObject.loc,
                            selectedObject.dir,
                            selectedObject.typeId,
                            selectedObject.instanceData,
                            selectedObject.stuffData,
                            selectedObject.state,
                            selectedObject.animFrame,
                            selectedObject.posture,
                        ),
                    );

                setFurnitureAlphaMultiplier(roomObject, 1);

                //GetRoomEngine().removeObjectMoverIconSprite();

                if (category === RoomObjectCategoryEnum.Floor) {
                    const angle = roomObject.getDirection().x % 360;
                    const location = roomObject.getLocation();
                    const direction = angle / 45;

                    //new FurnitureFloorUpdateComposer(objectId, location.x, location.y, direction);
                } else if (category === RoomObjectCategoryEnum.Wall) {
                    const angle = roomObject.getDirection().x % 360;
                    const wallGeometry = room.instance.legacyGeometry;

                    if (wallGeometry) {
                        const location = wallGeometry.getOldLocationString(roomObject.getLocation(), angle);

                        //GetCommunication().connection.send(new FurnitureWallUpdateComposer(objectId, location));
                    }
                } else if (category === RoomObjectCategoryEnum.Unit) {
                    const angle = roomObject.getDirection().x % 360;
                    const location = roomObject.getLocation();
                    const direction = angle / 45;
                    const race = parseInt(roomObject.model.getValue<string>(RoomObjectVariableEnum.Race));
                    /* const roomSession = GetRoomSessionManager().getSession(roomId);
     
                    if (roomSession) {
                        const userData = roomSession.userDataManager.getUserDataByIndex(objectId);
     
                        if (userData)
                            GetCommunication().connection.send(
                                new PetMoveComposer(userData.webID, location.x, location.y, direction),
                            );
                    } */
                }

                break;
            }
        }

        if (_local_9) resetSelectedObject();

        return true;
    }

    const handleMoveTargetFurni = (event: RoomObjectMouseEvent) => {
        if (!room) return false;

        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);
        const point = getActiveSurfaceLocation(roomObject, event);

        if (point && !GetRoomEngine().moveBlocked) {
            //GetCommunication().connection.send(new RoomUnitWalkComposer(point.x, point.y));

            return true;
        }

        return false;
    }

    const handleMouseOverTile = (event: RoomObjectTileMouseEvent) => new ObjectTileCursorUpdateMessage(
        new Vector3d(event.tileXAsInt, event.tileYAsInt, event.tileZAsInt),
        0,
        true,
        event.eventId,
    );

    const handleMouseOverObject = (
        category: RoomObjectCategoryEnum,
        event: RoomObjectMouseEvent,
    ) => {
        if (!room || category !== RoomObjectCategoryEnum.Floor) return undefined;

        const roomObject = room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return undefined;

        const location = getActiveSurfaceLocation(roomObject, event);

        if (!location) return undefined;

        const furnitureHeightMap = room.instance.furnitureStackingHeightMap;

        if (!furnitureHeightMap) return undefined;

        const x = location.x;
        const y = location.y;
        const z = location.z;

        return new ObjectTileCursorUpdateMessage(
            new Vector3d(x, y, roomObject.getLocation().z),
            z,
            true,
            event.eventId,
        );
    }

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

        if (newDir) roomObject.setDirection(newDir);

        return true;
    }

    const handleWallItemMove = (
        k: IRoomObjectController,
        _arg_2: ISelectedRoomObjectData,
        _arg_3: IVector3D,
        _arg_4: IVector3D,
        _arg_5: IVector3D,
        _arg_6: number,
        _arg_7: number,
        _arg_8: number,
    ) => {
        if (!k || !_arg_2) return false;

        const _local_9 = new Vector3d(_arg_8);
        const _local_10 = validateWallItemLocation(k, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7, _arg_2);

        if (!_local_10) return false;

        k.setLocation(_local_10);
        k.setDirection(_local_9);

        return true;
    }

    const validateFurnitureLocation = (
        roomObject: IRoomObject,
        loc: IVector3D,
        prevLoc: IVector3D,
        prevDir: IVector3D,
    ) => {
        if (!room || !roomObject || !roomObject.model || !loc || !prevLoc || !prevDir) return undefined;

        if (loc.x === prevLoc.x && loc.y === prevLoc.y) {
            if (roomObject.getDirection().x === prevDir.x) {
                const _local_15 = new Vector3d();

                _local_15.assign(prevLoc);

                return _local_15;
            }
        }

        let sizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);

        if (sizeX < 1) sizeX = 1;

        if (sizeY < 1) sizeY = 1;

        const _local_9 = prevLoc.x;
        const _local_10 = prevLoc.y;

        let _local_11 = sizeX;
        let _local_12 = sizeY;
        let _local_13 = 0;
        let _local_14 = Math.trunc((Math.trunc(roomObject.getDirection().x + 45) % 360) / 90);

        if (_local_14 === 1 || _local_14 === 3) {
            _local_13 = sizeX;

            sizeX = sizeY;
            sizeY = _local_13;
        }

        _local_14 = Math.trunc((Math.trunc(prevDir.x + 45) % 360) / 90);

        if (_local_14 === 1 || _local_14 === 3) {
            _local_13 = _local_11;
            _local_11 = _local_12;
            _local_12 = _local_13;
        }

        const stackable = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAlwaysStackable) === 1;

        if (
            room.instance.furnitureStackingHeightMap.validateLocation(
                loc.x,
                loc.y,
                sizeX,
                sizeY,
                _local_9,
                _local_10,
                _local_11,
                _local_12,
                stackable,
            )
        )
            return new Vector3d(
                loc.x,
                loc.y,
                room.instance.furnitureStackingHeightMap.getTileHeight(loc.x, loc.y),
            );

        return undefined;
    }

    const validateWallItemLocation = (
        k: IRoomObject,
        _arg_2: IVector3D,
        _arg_3: IVector3D,
        _arg_4: IVector3D,
        _arg_5: number,
        _arg_6: number,
        _arg_7: ISelectedRoomObjectData,
    ) => {
        if (!room || k == null || k.model == null || _arg_2 == null || _arg_3 == null || _arg_4 == null || _arg_7 == null)
            return undefined;

        const _local_8 = k.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        const _local_9 = k.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);
        const _local_10 = k.model.getValue<number>(RoomObjectVariableEnum.FurnitureCenterZ);

        if (
            _arg_5 < _local_8 / 2 ||
            _arg_5 > _arg_3.length - _local_8 / 2 ||
            _arg_6 < _local_10 ||
            _arg_6 > _arg_4.length - (_local_9 - _local_10)
        ) {
            if (_arg_5 < _local_8 / 2 && _arg_5 <= _arg_3.length - _local_8 / 2) {
                _arg_5 = _local_8 / 2;
            } else if (_arg_5 >= _local_8 / 2 && _arg_5 > _arg_3.length - _local_8 / 2) {
                _arg_5 = _arg_3.length - _local_8 / 2;
            }

            if (_arg_6 < _local_10 && _arg_6 <= _arg_4.length - (_local_9 - _local_10)) {
                _arg_6 = _local_10;
            } else if (_arg_6 >= _local_10 && _arg_6 > _arg_4.length - (_local_9 - _local_10)) {
                _arg_6 = _arg_4.length - (_local_9 - _local_10);
            }
        }

        if (
            _arg_5 < _local_8 / 2 ||
            _arg_5 > _arg_3.length - _local_8 / 2 ||
            _arg_6 < _local_10 ||
            _arg_6 > _arg_4.length - (_local_9 - _local_10)
        ) {
            return undefined;
        }

        return Vector3d.sum(
            _arg_2,
            Vector3d.sum(
                Vector3d.product(_arg_3, _arg_5 / _arg_3.length),
                Vector3d.product(_arg_4, _arg_6 / _arg_4.length),
            ),
        );
    }

    const handleObjectMove = (event: RoomObjectMouseEvent) => {
        if (!event || !room || !selectedObject) return;

        const roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

        if (!roomObject) return;

        let added = true;

        if (
            selectedObject.category === RoomObjectCategoryEnum.Floor ||
            selectedObject.category === RoomObjectCategoryEnum.Unit
        ) {
            if (
                !(
                    event instanceof RoomObjectTileMouseEvent &&
                    handleFurnitureMove(
                        roomObject,
                        selectedObject,
                        Math.trunc(event.tileX + 0.5),
                        Math.trunc(event.tileY + 0.5),
                    )
                )
            ) {
                handleFurnitureMove(roomObject, selectedObject, selectedObject.loc.x, selectedObject.loc.y);

                added = false;
            }
        } else if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
            added = false;

            if (event instanceof RoomObjectWallMouseEvent) {
                const _local_10 = event.wallLocation;
                const _local_11 = event.wallWidth;
                const _local_12 = event.wallHeight;
                const _local_13 = event.x;
                const _local_14 = event.y;
                const _local_15 = event.direction;

                if (
                    handleWallItemMove(
                        roomObject,
                        selectedObject,
                        _local_10,
                        _local_11,
                        _local_12,
                        _local_13,
                        _local_14,
                        _local_15,
                    )
                ) {
                    added = true;
                }
            }

            if (!added) {
                roomObject.setLocation(selectedObject.loc);
                roomObject.setDirection(selectedObject.dir);
            }

            room.updateRoomObjectMask(selectedObject.id, added);
        }

        if (added) {
            setFurnitureAlphaMultiplier(roomObject, 0.5);

            //this._roomEngine.setObjectMoverIconSpriteVisible(false);
        } else {
            setFurnitureAlphaMultiplier(roomObject, 0);

            //this._roomEngine.setObjectMoverIconSpriteVisible(true);
        }
    }

    const handleUserPlace = (roomObject: IRoomObjectController, x: number, y: number) => {
        if (!room || !room.instance.legacyGeometry.isRoomTile(x, y)) return false;

        roomObject.setLocation(new Vector3d(x, y, room.instance.legacyGeometry.getHeight(x, y)));

        return true;
    }

    const handleObjectPlace = async (event: RoomObjectMouseEvent) => {
        if (!event || !room || !selectedObject) return;

        let roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

        if (!roomObject) {
            if (event instanceof RoomObjectTileMouseEvent) {
                if (selectedObject.category === RoomObjectCategoryEnum.Floor) {
                    await room.addFurnitureByTypeId(
                        selectedObject.id,
                        selectedObject.typeId,
                        selectedObject.loc,
                        selectedObject.dir,
                        0,
                        selectedObject.stuffData,
                        parseFloat(selectedObject.instanceData),
                        -1,
                        0,
                        0,
                        '',
                        false,
                    );
                } else if (selectedObject.category === RoomObjectCategoryEnum.Unit) {
                    await room.addRoomObjectUser(
                        selectedObject.id,
                        new Vector3d(),
                        new Vector3d(180),
                        180,
                        selectedObject.typeId,
                        selectedObject.instanceData,
                    );

                    const roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

                    if (roomObject && selectedObject.posture)
                        roomObject.model.setValue(RoomObjectVariableEnum.FigurePosture, selectedObject.posture);
                }
            } else if (event instanceof RoomObjectWallMouseEvent) {
                if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
                    await room.addFurnitureWallByTypeId(
                        selectedObject.id,
                        selectedObject.typeId,
                        selectedObject.loc,
                        selectedObject.dir,
                        0,
                        parseInt(selectedObject.instanceData),
                        0,
                    );
                }
            }

            roomObject = room.getRoomObject(selectedObject.id, selectedObject.category);

            if (roomObject) {
                if (selectedObject.category === RoomObjectCategoryEnum.Floor) {
                    const allowedDirections = roomObject.model.getValue<number[]>(
                        RoomObjectVariableEnum.FurnitureAllowedDirections,
                    );

                    if (allowedDirections && allowedDirections.length) {
                        const direction = new Vector3d(allowedDirections[0]);

                        roomObject.setDirection(direction);

                        setSelectedObject(
                            new SelectedRoomObjectData(
                                selectedObject.id,
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
                            ),
                        );
                    }
                }
            }

            setFurnitureAlphaMultiplier(roomObject, 0.5);
            //this._roomEngine.setObjectMoverIconSpriteVisible(true);
        }

        if (roomObject) {
            let added = true;

            if (selectedObject.category === RoomObjectCategoryEnum.Floor) {
                if (
                    !(
                        event instanceof RoomObjectTileMouseEvent &&
                        handleFurnitureMove(
                            roomObject,
                            selectedObject,
                            Math.trunc(event.tileX + 0.5),
                            Math.trunc(event.tileY + 0.5),
                        )
                    )
                ) {
                    room.removeRoomObjectFloor(selectedObject.id);

                    added = false;
                }
            } else if (selectedObject.category === RoomObjectCategoryEnum.Wall) {
                added = false;

                if (
                    event instanceof RoomObjectWallMouseEvent &&
                    handleWallItemMove(
                        roomObject,
                        selectedObject,
                        event.wallLocation,
                        event.wallWidth,
                        event.wallHeight,
                        event.x,
                        event.y,
                        event.direction,
                    )
                )
                    added = true;

                if (!added) {
                    room.removeRoomObjectWall(selectedObject.id);
                }

                room.updateRoomObjectMask(selectedObject.id, added);
            } else if (selectedObject.category === RoomObjectCategoryEnum.Unit) {
                if (
                    !(
                        event instanceof RoomObjectTileMouseEvent &&
                        handleUserPlace(roomObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5))
                    )
                ) {
                    room.removeRoomObject(selectedObject.id, RoomObjectCategoryEnum.Unit);

                    added = false;
                }
            }

            //this._roomEngine.setObjectMoverIconSpriteVisible(!_local_12);
        }
    }

    useRoomObjectEvent<RoomObjectFurnitureActionEvent>([RoomObjectFurnitureActionEvent.MOUSE_ARROW, RoomObjectFurnitureActionEvent.MOUSE_BUTTON], event => {
        room?.updateMousePointer(event.type, event.objectId, event.objectType);
    });

    useEffect(() => {
        if (!room) return;

        const handleRoomObjectEvent = (event: RoomObjectEvent) => {
            if (!room) return;

            if (event instanceof RoomObjectMouseEvent) {
                if (event instanceof RoomObjectTileMouseEvent) room.areaSelection.handleTileMouseEvent(event);

                switch (event.type) {
                    case RoomObjectMouseEvent.CLICK: {
                        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

                        if (selectedObject && selectedObject.operation) operation = selectedObject.operation;

                        let didWalk = false;
                        let didMove = false;

                        if (operation === RoomObjectOperationType.OBJECT_UNDEFINED) didWalk = handleMoveTargetFurni(event);

                        const category = room.getRoomObjectCategoryForType(event.objectType);

                        if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
                            if (category === RoomObjectCategoryEnum.Floor) {
                                //GetCommunication().connection.send(new ClickFurniMessageComposer(event.objectId, category));
                            } else if (category === RoomObjectCategoryEnum.Wall) {
                                // This packet only sends a negative number to tell the server that its a wall item
                                //GetCommunication().connection.send(new ClickFurniMessageComposer(-Math.abs(event.objectId), category));
                            }
                        }

                        const roomCursor = room.getRoomObjectCursor();

                        if (roomCursor && roomCursor.logic) {
                            let newEvent: ObjectTileCursorUpdateMessage | undefined = undefined;

                            if (event instanceof RoomObjectTileMouseEvent) {
                                newEvent = handleMouseOverTile(event);
                            } else if (event.object && event.object.id !== -1) {
                                newEvent = handleMouseOverObject(category, event);
                            }

                            if (newEvent) roomCursor.processUpdateMessage(newEvent);
                        }

                        switch (operation) {
                            case RoomObjectOperationType.OBJECT_MOVE:
                                if (category === RoomObjectCategoryEnum.Room) {
                                    if (selectedObject) {
                                        modifyRoomObject(
                                            selectedObject.id,
                                            selectedObject.category,
                                            RoomObjectOperationType.OBJECT_MOVE_TO,
                                        );
                                    }
                                } else if (category === RoomObjectCategoryEnum.Unit) {
                                    if (selectedObject && event.objectType === RoomObjectUserType.MONSTER_PLANT) {
                                        modifyRoomObject(
                                            selectedObject.id,
                                            selectedObject.category,
                                            RoomObjectOperationType.OBJECT_MOVE_TO,
                                        );
                                    }

                                    if (event.eventId) setMouseEventId(RoomObjectCategoryEnum.Room, MouseEventType.MOUSE_CLICK, event.eventId);

                                    placeObjectOnUser(event.objectId, category);
                                }

                                didMove = true;

                                if (event.objectId !== -1) selectObject(event.objectId, category);

                                break;
                            case RoomObjectOperationType.OBJECT_PLACE:
                                if (category === RoomObjectCategoryEnum.Room) {
                                    placeObject(
                                        event instanceof RoomObjectTileMouseEvent,
                                        event instanceof RoomObjectWallMouseEvent,
                                    );
                                } else if (category === RoomObjectCategoryEnum.Unit) {
                                    switch (event.objectType) {
                                        case RoomObjectUserType.MONSTER_PLANT:
                                        case RoomObjectUserType.RENTABLE_BOT:
                                            placeObject(
                                                event instanceof RoomObjectTileMouseEvent,
                                                event instanceof RoomObjectWallMouseEvent,
                                            );
                                            break;
                                        default:
                                            if (event.eventId) {
                                                setMouseEventId(
                                                    RoomObjectCategoryEnum.Room,
                                                    MouseEventType.MOUSE_CLICK,
                                                    event.eventId,
                                                );
                                            }

                                            placeObjectOnUser(event.objectId, category);
                                            break;
                                    }
                                }
                                break;
                            case RoomObjectOperationType.OBJECT_UNDEFINED:
                                if (category === RoomObjectCategoryEnum.Room) {
                                    if (!didWalk && event instanceof RoomObjectTileMouseEvent) {
                                        if (room.isDecorating) return;

                                        // if is spectator return;

                                        //if(!GetRoomEngine().moveBlocked) GetCommunication().connection.send(new RoomUnitWalkComposer(x, y));
                                    }
                                } else {
                                    if (!room.isAreaSelectionMode || category === RoomObjectCategoryEnum.Unit) {
                                        selectObject(event.objectId, category);
                                    } else {
                                        deselectObject();

                                        room.eventDispatcher.dispatchEvent(
                                            new RoomEngineObjectEvent(
                                                RoomEngineObjectEvent.DESELECTED,
                                                room.roomId,
                                                -1,
                                                RoomObjectCategoryEnum.Minimum,
                                            ),
                                        );
                                    }

                                    didMove = false;

                                    if (category === RoomObjectCategoryEnum.Unit) {
                                        if (
                                            event.ctrlKey &&
                                            !event.altKey &&
                                            !event.shiftKey &&
                                            event.objectType === RoomObjectUserType.RENTABLE_BOT
                                        ) {
                                            modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_BOT);
                                        } else if (
                                            event.ctrlKey &&
                                            !event.altKey &&
                                            !event.shiftKey &&
                                            event.objectType === RoomObjectUserType.MONSTER_PLANT
                                        ) {
                                            modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_PET);
                                        } else if (
                                            !event.ctrlKey &&
                                            !event.altKey &&
                                            event.shiftKey &&
                                            event.objectType === RoomObjectUserType.MONSTER_PLANT
                                        ) {
                                            modifyRoomObject(
                                                event.objectId,
                                                category,
                                                RoomObjectOperationType.OBJECT_ROTATE_POSITIVE,
                                            );
                                        }

                                        if (!room.isPlayingGame()) {
                                            didWalk = true;
                                        } else {
                                            didMove = true;
                                        }
                                    } else if (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall) {
                                        if (event.altKey || event.ctrlKey || event.shiftKey) {
                                            if (!event.ctrlKey && !event.altKey && event.shiftKey) {
                                                if (category === RoomObjectCategoryEnum.Floor) {
                                                    room.eventDispatcher.dispatchEvent(
                                                        new RoomEngineObjectEvent(
                                                            RoomEngineObjectEvent.REQUEST_ROTATE,
                                                            room.roomId,
                                                            event.objectId,
                                                            category,
                                                        ),
                                                    );
                                                }
                                            } else if (event.ctrlKey && !event.altKey && !event.shiftKey) {
                                                modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
                                            }

                                            if (room.isPlayingGame()) {
                                                didWalk = true;
                                            } else {
                                                didMove = true;
                                            }
                                        }
                                    }

                                    if (event.eventId) {
                                        if (didWalk) setMouseEventId(
                                            RoomObjectCategoryEnum.Room,
                                            MouseEventType.MOUSE_CLICK,
                                            event.eventId,
                                        );

                                        if (didMove) setMouseEventId(
                                            RoomObjectCategoryEnum.Minimum,
                                            MouseEventType.MOUSE_CLICK,
                                            event.eventId,
                                        );
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

                                room.eventDispatcher.dispatchEvent(
                                    new RoomEngineObjectEvent(
                                        RoomEngineObjectEvent.DESELECTED,
                                        room.roomId,
                                        -1,
                                        RoomObjectCategoryEnum.Minimum,
                                    ),
                                );

                                selectAvatar(0, false);
                            }
                        }

                        return;
                    }
                    case RoomObjectMouseEvent.DOUBLE_CLICK: {
                        room.eventDispatcher.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.DOUBLE_CLICK, room.roomId, event.objectId, room.getRoomObjectCategoryForType(event.objectType)));

                        return;
                    }
                    case RoomObjectMouseEvent.MOUSE_MOVE: {
                        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

                        if (selectedObject && selectedObject.operation) operation = selectedObject.operation;

                        const category = room.getRoomObjectCategoryForType(event.objectType);
                        const roomCursor = room.getRoomObjectCursor();

                        if (roomCursor && roomCursor.logic) {
                            let newEvent: ObjectTileCursorUpdateMessage | undefined = undefined;

                            if (event instanceof RoomObjectTileMouseEvent) {
                                if (event.buttonDown) {
                                    const cursorLocation = roomCursor.getLocation();

                                    if (event.tileXAsInt !== cursorLocation.x || event.tileYAsInt !== cursorLocation.y) newEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);
                                } else {
                                    newEvent = handleMouseOverTile(event);
                                }
                            } else if (event.object && event.object.id !== -1) {
                                newEvent = handleMouseOverObject(category, event);
                            } else {
                                newEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);
                            }

                            if (newEvent) roomCursor.processUpdateMessage(newEvent);
                        }

                        switch (operation) {
                            case RoomObjectOperationType.OBJECT_MOVE:
                                if (category === RoomObjectCategoryEnum.Room) handleObjectMove(event);

                                return;
                            case RoomObjectOperationType.OBJECT_PLACE:
                                if (category === RoomObjectCategoryEnum.Room) void handleObjectPlace(event);

                                return;
                        }

                        return;
                    }
                    case RoomObjectMouseEvent.MOUSE_DOWN: {
                        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

                        if (selectedObject && selectedObject.operation) operation = selectedObject.operation;

                        const category = room.getRoomObjectCategoryForType(event.objectType);

                        switch (operation) {
                            case RoomObjectOperationType.OBJECT_UNDEFINED:
                                if ((category === RoomObjectCategoryEnum.Floor) || (category === RoomObjectCategoryEnum.Wall) || (event.objectType === RoomObjectUserType.MONSTER_PLANT)) {
                                    if ((event.altKey && !event.ctrlKey && !event.shiftKey) || (room.isDecorating && !(event.ctrlKey || event.shiftKey))) {
                                        room.eventDispatcher.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.REQUEST_MOVE, room.roomId, event.objectId, category));
                                    }
                                }
                                return;
                        }

                        return;
                    }
                    case RoomObjectMouseEvent.MOUSE_UP:
                        return;
                    case RoomObjectMouseEvent.MOUSE_ENTER: {
                        room.eventDispatcher.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.MOUSE_ENTER, room.roomId, event.objectId, room.getRoomObjectCategoryForType(event.objectType)));

                        return;
                    }
                    case RoomObjectMouseEvent.MOUSE_LEAVE: {
                        room.eventDispatcher.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.MOUSE_LEAVE, room.roomId, event.objectId, room.getRoomObjectCategoryForType(event.objectType)));

                        return;
                    }
                }

                return;
            }
        }

        room.eventHandler.setRoomObjectEventHandler(handleRoomObjectEvent);

        return () => {
            room.eventHandler.setRoomObjectEventHandler(undefined);
        }
    }, [room]);

    useEffect(() => {
        if (!room) return;

        const handleRoomCanvasMouseEvent = (event: RoomSpriteMouseEvent, object: IRoomObject) => {
            if (!room || !object) return;

            let category = room.getRoomObjectCategoryForType(object.type);

            if (
                category !== RoomObjectCategoryEnum.Room &&
                (!room.isPlayingGame() || category !== RoomObjectCategoryEnum.Unit)
            )
                category = RoomObjectCategoryEnum.Minimum;

            const eventId = getMouseEventId(category, event.type);

            if (eventId === event.eventId) {
                if (
                    event.type === MouseEventType.MOUSE_CLICK ||
                    event.type === MouseEventType.DOUBLE_CLICK ||
                    event.type === MouseEventType.MOUSE_DOWN ||
                    event.type === MouseEventType.MOUSE_UP ||
                    event.type === MouseEventType.MOUSE_MOVE
                )
                    return;
            } else if (event.eventId) {
                setMouseEventId(category, event.type, event.eventId);
            }

            if (object.mouseHandler) object.mouseHandler.mouseEvent(event, room.getGeometry());
        }

        room.eventHandler.setRoomCanvasMouseHandler(handleRoomCanvasMouseEvent);

        return () => {
            room.eventHandler.setRoomCanvasMouseHandler(undefined);
        }
    }, [room]);
};
