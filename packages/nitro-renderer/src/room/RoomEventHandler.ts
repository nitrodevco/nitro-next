import type {
    IEventDispatcher,
    IRoom,
    IRoomEventHandler,
    IRoomGeometry,
    IRoomObject,
    IRoomObjectController,
    ISelectedRoomObjectData,
    IVector3D,
} from '@nitrodevco/nitro-api';
import {
    MouseEventType,
    NitroLogger,
    RoomObjectCategoryEnum,
    RoomObjectOperationType,
    RoomObjectPlacementSource,
    RoomObjectType,
    RoomObjectUserType,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import type { RoomObjectEvent, RoomSpriteMouseEvent } from '@nitrodevco/nitro-shared';
import {
    FurnitureDataStore,
    RoomEngineObjectEvent,
    RoomEngineObjectPlacedEvent,
    RoomEngineObjectPlacedOnUserEvent,
    RoomObjectFurnitureActionEvent,
    RoomObjectMouseEvent,
    RoomObjectTileMouseEvent,
    RoomObjectWallMouseEvent,
} from '@nitrodevco/nitro-shared';

import { GetRoomEngine } from './GetRoomEngine';
import {
    ObjectAvatarSelectedMessage,
    ObjectSelectedMessage,
    ObjectTileCursorUpdateMessage,
    ObjectVisibilityUpdateMessage,
} from './messages';
import { RoomEnterEffect, RoomGeometry, SelectedRoomObjectData } from './utils';

export class RoomEventHandler implements IRoomEventHandler {
    private _eventIds: Map<RoomObjectCategoryEnum, Map<string, number>> = new Map();
    private _selectedAvatarId: number = -1;
    private _selectedObjectId: number = -1;
    private _selectedObjectCategory: RoomObjectCategoryEnum = RoomObjectCategoryEnum.Minimum;
    private _objectPlacementSource: string = '';

    constructor(private _room: IRoom) { }

    public async handleRoomObjectEvent(event: RoomObjectEvent): Promise<void> {
        if (!event) return;

        if (event instanceof RoomObjectMouseEvent) {
            await this.handleRoomObjectMouseEvent(event);

            return;
        }

        switch (event.type) {
            case RoomObjectFurnitureActionEvent.MOUSE_ARROW:
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                this._room.updateMousePointer(event.type, event.objectId, event.objectType);
                return;
            default:
                NitroLogger.warn('Unhandled Event', event.constructor.name, 'Object ID', event.object.id);
                return;
        }
    }

    public handleRoomCanvasMouseEvent(event: RoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void {
        if (!event || !object || RoomEnterEffect.isRunning()) return;

        const type = object.type;

        let category = this._room.getRoomObjectCategoryForType(type);

        if (
            category !== RoomObjectCategoryEnum.Room &&
            (!this._room.isPlayingGame() || category !== RoomObjectCategoryEnum.Unit)
        )
            category = RoomObjectCategoryEnum.Minimum;

        const eventId = this.getMouseEventId(category, event.type);

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
            this.setMouseEventId(category, event.type, event.eventId);
        }

        if (object.mouseHandler) object.mouseHandler.mouseEvent(event, geometry);
    }

    public get eventDispatcher(): IEventDispatcher {
        return this._room.eventDispatcher;
    }

    private async handleRoomObjectMouseEvent(event: RoomObjectMouseEvent): Promise<void> {
        if (!event || !event.type) return;

        if (event instanceof RoomObjectTileMouseEvent) this._room.areaSelection.handleTileMouseEvent(event);

        switch (event.type) {
            case RoomObjectMouseEvent.CLICK:
                this.handleRoomObjectMouseClickEvent(event);
                return;
            case RoomObjectMouseEvent.DOUBLE_CLICK:
                this.handleRoomObjectMouseDoubleClickEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_MOVE:
                await this.handleRoomObjectMouseMoveEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN:
                this.handleRoomObjectMouseDownEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN_LONG:
                this.handleRoomObjectMouseDownLongEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_ENTER:
                this.handleRoomObjectMouseEnterEvent(event);
                return;
            case RoomObjectMouseEvent.MOUSE_LEAVE:
                this.handleRoomObjectMouseLeaveEvent(event);
                return;
        }
    }

    private handleRoomObjectMouseClickEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;

        this.clickRoomObject(event);

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this._room.instance.selectedObject;

        if (selectedData && selectedData.operation) operation = selectedData.operation;

        let didWalk = false;
        let didMove = false;

        if (GetRoomEngine().whereYouClickIsWhereYouGo()) {
            if (operation === RoomObjectOperationType.OBJECT_UNDEFINED) didWalk = this.handleMoveTargetFurni(event);
        }

        const category = this._room.getRoomObjectCategoryForType(event.objectType);

        const roomCursor = this._room.getRoomObjectCursor();

        if (roomCursor && roomCursor.logic) {
            let newEvent: ObjectTileCursorUpdateMessage | undefined = undefined;

            if (event instanceof RoomObjectTileMouseEvent) {
                newEvent = this.handleMouseOverTile(event);
            } else if (event.object && event.object.id !== -1) {
                if (GetRoomEngine().whereYouClickIsWhereYouGo()) newEvent = this.handleMouseOverObject(category, event);
            }

            if (newEvent) roomCursor.processUpdateMessage(newEvent);
        }

        switch (operation) {
            case RoomObjectOperationType.OBJECT_MOVE:
                if (category === RoomObjectCategoryEnum.Room) {
                    if (selectedData) {
                        this.modifyRoomObject(
                            selectedData.id,
                            selectedData.category,
                            RoomObjectOperationType.OBJECT_MOVE_TO,
                        );
                    }
                } else if (category === RoomObjectCategoryEnum.Unit) {
                    if (selectedData && event.objectType === RoomObjectUserType.MONSTER_PLANT) {
                        this.modifyRoomObject(
                            selectedData.id,
                            selectedData.category,
                            RoomObjectOperationType.OBJECT_MOVE_TO,
                        );
                    }

                    if (event.eventId)
                        this.setMouseEventId(RoomObjectCategoryEnum.Room, MouseEventType.MOUSE_CLICK, event.eventId);

                    this.placeObjectOnUser(event.objectId, category);
                }

                didMove = true;

                if (event.objectId !== -1) this.setSelectedObject(event.objectId, category);

                break;
            case RoomObjectOperationType.OBJECT_PLACE:
                if (category === RoomObjectCategoryEnum.Room) {
                    this.placeObject(
                        event instanceof RoomObjectTileMouseEvent,
                        event instanceof RoomObjectWallMouseEvent,
                    );
                } else if (category === RoomObjectCategoryEnum.Unit) {
                    switch (event.objectType) {
                        case RoomObjectUserType.MONSTER_PLANT:
                        case RoomObjectUserType.RENTABLE_BOT:
                            this.placeObject(
                                event instanceof RoomObjectTileMouseEvent,
                                event instanceof RoomObjectWallMouseEvent,
                            );
                            break;
                        default:
                            if (event.eventId) {
                                this.setMouseEventId(
                                    RoomObjectCategoryEnum.Room,
                                    MouseEventType.MOUSE_CLICK,
                                    event.eventId,
                                );
                            }

                            this.placeObjectOnUser(event.objectId, category);
                            break;
                    }
                }
                break;
            case RoomObjectOperationType.OBJECT_UNDEFINED:
                if (category === RoomObjectCategoryEnum.Room) {
                    if (!didWalk && event instanceof RoomObjectTileMouseEvent) this.handleClickOnTile(event);
                } else {
                    if (!this._room.isAreaSelectionMode || category === RoomObjectCategoryEnum.Unit) {
                        this.setSelectedObject(event.objectId, category);
                    } else {
                        this.deselectObject();

                        this._room.eventDispatcher.dispatchEvent(
                            new RoomEngineObjectEvent(
                                RoomEngineObjectEvent.DESELECTED,
                                this._room.roomId,
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
                            this.modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_BOT);
                        } else if (
                            event.ctrlKey &&
                            !event.altKey &&
                            !event.shiftKey &&
                            event.objectType === RoomObjectUserType.MONSTER_PLANT
                        ) {
                            this.modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_PET);
                        } else if (
                            !event.ctrlKey &&
                            !event.altKey &&
                            event.shiftKey &&
                            event.objectType === RoomObjectUserType.MONSTER_PLANT
                        ) {
                            this.modifyRoomObject(
                                event.objectId,
                                category,
                                RoomObjectOperationType.OBJECT_ROTATE_POSITIVE,
                            );
                        }

                        if (!this._room.isPlayingGame()) {
                            didWalk = true;
                        } else {
                            didMove = true;
                        }
                    } else if (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall) {
                        if (event.altKey || event.ctrlKey || event.shiftKey) {
                            if (!event.ctrlKey && !event.altKey && event.shiftKey) {
                                if (category === RoomObjectCategoryEnum.Floor) {
                                    this._room.eventDispatcher.dispatchEvent(
                                        new RoomEngineObjectEvent(
                                            RoomEngineObjectEvent.REQUEST_ROTATE,
                                            this._room.roomId,
                                            event.objectId,
                                            category,
                                        ),
                                    );
                                }
                            } else if (event.ctrlKey && !event.altKey && !event.shiftKey) {
                                this.modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
                            }

                            if (this._room.isPlayingGame()) {
                                didWalk = true;
                            } else {
                                didMove = true;
                            }
                        }
                    }

                    if (event.eventId) {
                        if (didWalk)
                            this.setMouseEventId(
                                RoomObjectCategoryEnum.Room,
                                MouseEventType.MOUSE_CLICK,
                                event.eventId,
                            );

                        if (didMove)
                            this.setMouseEventId(
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
                this.getMouseEventId(RoomObjectCategoryEnum.Minimum, MouseEventType.MOUSE_CLICK) !== event.eventId &&
                this.getMouseEventId(RoomObjectCategoryEnum.Unit, MouseEventType.MOUSE_CLICK) !== event.eventId &&
                !didMove
            ) {
                this.deselectObject();

                this._room.eventDispatcher.dispatchEvent(
                    new RoomEngineObjectEvent(
                        RoomEngineObjectEvent.DESELECTED,
                        this._room.roomId,
                        -1,
                        RoomObjectCategoryEnum.Minimum,
                    ),
                );

                this.setSelectedAvatar(0, false);
            }
        }
    }

    private handleRoomObjectMouseDoubleClickEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private async handleRoomObjectMouseMoveEvent(event: RoomObjectMouseEvent): Promise<void> {
        if (!event) return;

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this._room.instance.selectedObject;

        if (selectedData && selectedData.operation) operation = selectedData.operation;

        const category = this._room.getRoomObjectCategoryForType(event.objectType);

        const roomCursor = this._room.getRoomObjectCursor();

        if (roomCursor && roomCursor.logic) {
            let newEvent: ObjectTileCursorUpdateMessage | undefined = undefined;

            if (event instanceof RoomObjectTileMouseEvent) {
                if (event.buttonDown) {
                    const cursorLocation = roomCursor.getLocation();

                    if (event.tileXAsInt !== cursorLocation.x || event.tileYAsInt !== cursorLocation.y) newEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);
                } else {
                    newEvent = this.handleMouseOverTile(event);
                }
            } else if (event.object && event.object.id !== -1) {
                if (GetRoomEngine().whereYouClickIsWhereYouGo()) newEvent = this.handleMouseOverObject(category, event);
            } else {
                newEvent = new ObjectTileCursorUpdateMessage(undefined, 0, false, event.eventId);
            }

            if (newEvent) roomCursor.processUpdateMessage(newEvent);
        }

        switch (operation) {
            case RoomObjectOperationType.OBJECT_MOVE:
                if (category === RoomObjectCategoryEnum.Room) this.handleObjectMove(event);

                return;
            case RoomObjectOperationType.OBJECT_PLACE:
                if (category === RoomObjectCategoryEnum.Room) await this.handleObjectPlace(event);

                return;
        }
    }

    private handleRoomObjectMouseDownEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private handleRoomObjectMouseDownLongEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private handleRoomObjectMouseEnterEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private handleRoomObjectMouseLeaveEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;
    }

    private getMouseEventId(category: RoomObjectCategoryEnum, type: string): number | undefined {
        return this._eventIds.get(category)?.get(type);
    }

    private setMouseEventId(category: RoomObjectCategoryEnum, type: string, eventId: number): void {
        let existing = this._eventIds.get(category);

        if (!existing) {
            existing = new Map();

            this._eventIds.set(category, existing);
        }

        existing.delete(type);
        existing.set(type, eventId);
    }

    private handleMouseOverTile(event: RoomObjectTileMouseEvent): ObjectTileCursorUpdateMessage | undefined {
        if (GetRoomEngine().whereYouClickIsWhereYouGo()) {
            return new ObjectTileCursorUpdateMessage(
                new Vector3d(event.tileXAsInt, event.tileYAsInt, event.tileZAsInt),
                0,
                true,
                event.eventId,
            );
        }

        const cursor = this._room.getRoomObjectCursor();

        if (cursor && cursor.visualization) {
            const tileX = event.tileXAsInt;
            const tileY = event.tileYAsInt;
            const tileZ = event.tileZAsInt;
            const tileObjects = this._room.instance.tileObjectMap;

            const tileObject = tileObjects.getObjectIntTile(tileX, tileY);
            const heightMap = this._room.instance.furnitureStackingHeightMap;

            if (tileObject && tileObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureIsVariableHeight) > 0) {
                const tileHeight = heightMap.getTileHeight(tileX, tileY);
                const wallOffset = this._room.instance.legacyGeometry.getHeight(tileX, tileY);

                return new ObjectTileCursorUpdateMessage(
                    new Vector3d(tileX, tileY, tileZ),
                    tileHeight - wallOffset,
                    true,
                    event.eventId,
                );
            }

            return new ObjectTileCursorUpdateMessage(new Vector3d(tileX, tileY, tileZ), 0, true, event.eventId);
        }

        return undefined;
    }

    private clickRoomObject(event: RoomObjectMouseEvent): void {
        if (!event || event.altKey || event.ctrlKey || event.shiftKey) return;

        const objectId = event.objectId;
        const objectType = event.objectType;
        const category = this._room.getRoomObjectCategoryForType(objectType);

        if (category === RoomObjectCategoryEnum.Floor) {
            //GetCommunication().connection.send(new ClickFurniMessageComposer(objectId, category));

            return;
        }

        if (category === RoomObjectCategoryEnum.Wall) {
            // This packet only sends a negative number to tell the server that its a wall item
            //GetCommunication().connection.send(new ClickFurniMessageComposer(-Math.abs(objectId), category));

            return;
        }
    }

    private handleMoveTargetFurni(event: RoomObjectMouseEvent): boolean {
        const roomObject = this._room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);
        const point = this.getActiveSurfaceLocation(roomObject, event);

        if (point && !GetRoomEngine().moveBlocked) {
            //GetCommunication().connection.send(new RoomUnitWalkComposer(point.x, point.y));

            return true;
        }

        return false;
    }

    private getActiveSurfaceLocation(roomObject: IRoomObject, event: RoomObjectMouseEvent): IVector3D | undefined {
        if (!roomObject || !event) return undefined;

        const furniData = FurnitureDataStore.getState().floorItems?.get(roomObject.type);

        if (!furniData || (!furniData.canStandOn && !furniData.canSitOn && !furniData.canLayOn)) return undefined;

        const location = roomObject.getLocation();
        const direction = roomObject.getDirection();

        let sizeX = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX);
        let sizeY = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY);
        const sizeZ = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeZ);

        if (direction.x === 90 || direction.x === 270) [sizeX, sizeY] = [sizeY, sizeX];

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        const scale = this._room.getGeometry()?.scale ?? RoomGeometry.SCALE_ZOOMED_IN;
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

    public modifyRoomObject(
        objectId: number,
        category: RoomObjectCategoryEnum,
        operation: RoomObjectOperationType,
    ): boolean {
        const roomObject = this._room.getRoomObject(objectId, category);

        if (!roomObject) return false;

        let _local_9 = true;

        switch (operation) {
            case RoomObjectOperationType.OBJECT_ROTATE_POSITIVE:
            case RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE:
                {
                    let direction = 0;

                    if (operation == RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE) {
                        direction = this.getValidRoomObjectDirection(roomObject, false);
                    } else {
                        direction = this.getValidRoomObjectDirection(roomObject, true);
                    }

                    const x = roomObject.getLocation().x;
                    const y = roomObject.getLocation().y;

                    if (this.isValidLocation(roomObject, new Vector3d(direction))) {
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
                this.setFurnitureAlphaMultiplier(roomObject, 0.5);
                this.resetSelectedObjectData();

                this._room.instance.setSelectedObject(
                    new SelectedRoomObjectData(
                        roomObject.id,
                        category,
                        operation,
                        roomObject.getLocation(),
                        roomObject.getDirection(),
                    ),
                );

                //GetRoomEngine().setObjectMoverIconSprite(roomObject.id, category, true);
                //GetRoomEngine().setObjectMoverIconSpriteVisible(false);
                break;
            case RoomObjectOperationType.OBJECT_MOVE_TO: {
                const selectedData = this._room.instance.selectedObject;

                if (selectedData)
                    this._room.instance.setSelectedObject(
                        new SelectedRoomObjectData(
                            selectedData.id,
                            selectedData.category,
                            RoomObjectOperationType.OBJECT_MOVE_TO,
                            selectedData.loc,
                            selectedData.dir,
                            selectedData.typeId,
                            selectedData.instanceData,
                            selectedData.stuffData,
                            selectedData.state,
                            selectedData.animFrame,
                            selectedData.posture,
                        ),
                    );

                this.setFurnitureAlphaMultiplier(roomObject, 1);

                //GetRoomEngine().removeObjectMoverIconSprite();

                if (category === RoomObjectCategoryEnum.Floor) {
                    const angle = roomObject.getDirection().x % 360;
                    const location = roomObject.getLocation();
                    const direction = angle / 45;

                    //new FurnitureFloorUpdateComposer(objectId, location.x, location.y, direction);
                } else if (category === RoomObjectCategoryEnum.Wall) {
                    const angle = roomObject.getDirection().x % 360;
                    const wallGeometry = this._room.instance.legacyGeometry;

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

        if (_local_9) this.resetSelectedObjectData();

        return true;
    }

    private getValidRoomObjectDirection(k: IRoomObjectController, _arg_2: boolean): number {
        if (!k || !k.model) return 0;

        let _local_6 = 0;
        let _local_7 = 0;
        let allowedDirections: number[] = [];

        if (k.type === RoomObjectUserType.MONSTER_PLANT) {
            allowedDirections = k.model.getValue<number[]>(RoomObjectVariableEnum.PetAllowedDirections);
        } else {
            allowedDirections = k.model.getValue<number[]>(RoomObjectVariableEnum.FurnitureAllowedDirections);
        }

        let direction = k.getDirection().x;

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

    private isValidLocation(object: IRoomObject, goalDirection: IVector3D): boolean {
        if (!object || !object.model || !goalDirection) return false;

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
            this._room.instance.furnitureStackingHeightMap.validateLocation(
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

    private setFurnitureAlphaMultiplier(object: IRoomObjectController, multiplier: number): void {
        if (!object || !object.model) return;

        object.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, multiplier);
    }

    private placeObjectOnUser(objectId: number, category: RoomObjectCategoryEnum): void {
        this._room.eventDispatcher.dispatchEvent(
            new RoomEngineObjectPlacedOnUserEvent(
                RoomEngineObjectEvent.PLACED_ON_USER,
                this._room.roomId,
                objectId,
                category,
                objectId,
                category,
            ),
        );
    }

    private placeObject(isTileEvent: boolean, isWallEvent: boolean): void {
        const selectedData = this._room.instance.selectedObject;

        if (!selectedData) return;

        let objectId = selectedData.id;
        const category = selectedData.category;

        let x = 0;
        let y = 0;
        let z = 0;
        let direction = 0;
        let wallLocation = '';

        const roomObject = this._room.getRoomObject(objectId, category);

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

                const wallGeometry = this._room.instance.legacyGeometry;

                if (wallGeometry) wallLocation = wallGeometry.getOldLocationString(location, direction);
            }

            direction = (((direction / 45) % 8) + 8) % 8;

            if (objectId < 0 && category === RoomObjectCategoryEnum.Unit) objectId = objectId * -1;

            if (this._objectPlacementSource !== RoomObjectPlacementSource.CATALOG) {
                if (category === RoomObjectCategoryEnum.Unit) {
                    if (selectedData.typeId === RoomObjectType.PET) {
                        //GetCommunication().connection.send(new PetPlaceComposer(objectId, Math.trunc(x), Math.trunc(y)));
                    } else if (selectedData.typeId === RoomObjectType.RENTABLE_BOT) {
                        //GetCommunication().connection.send(new BotPlaceComposer(objectId, Math.trunc(x), Math.trunc(y)));
                    }
                } else if (roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureIsStickie) !== undefined) {
                    //GetCommunication().connection.send(new FurniturePostItPlaceComposer(objectId, wallLocation));
                } else {
                    //GetCommunication().connection.send(new FurniturePlaceComposer(objectId, category, wallLocation, Math.trunc(x), Math.trunc(y), direction));
                }
            }
        }

        this._room.instance.setPlacedObject(new SelectedRoomObjectData(selectedData.id, selectedData.category));

        this.resetSelectedObjectData();

        const placedInRoom = roomObject && roomObject.id === selectedData.id;

        this._room.eventDispatcher.dispatchEvent(
            new RoomEngineObjectPlacedEvent(
                RoomEngineObjectEvent.PLACED,
                this._room.roomId,
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
                selectedData.instanceData,
            ),
        );
    }

    public setSelectedAvatar(objectId: number, lookAt: boolean): void {
        const prevAvatar = this._room.getRoomObject(this._selectedAvatarId, RoomObjectCategoryEnum.Unit);

        if (prevAvatar && prevAvatar.logic) {
            prevAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(false));

            this._selectedAvatarId = -1;
        }

        let _local_6 = false;

        const nextAvatar = this._room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (nextAvatar && nextAvatar.logic) {
            nextAvatar.processUpdateMessage(new ObjectAvatarSelectedMessage(true));

            this._selectedAvatarId = objectId;

            const location = nextAvatar.getLocation();

            if (lookAt) {
                const location = nextAvatar.getLocation();
                //GetCommunication().connection.send(new RoomUnitLookComposer(~~(location.x), ~~(location.y)));
                _local_6 = true;
            }
        }

        const selectionArrow = this._room.getRoomObjectSelectionArrow();

        if (selectionArrow && selectionArrow.logic) {
            if (_local_6 && !this._room.isPlayingGame())
                selectionArrow.processUpdateMessage(
                    new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.ENABLED),
                );
            else
                selectionArrow.processUpdateMessage(
                    new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.DISABLED),
                );
        }
    }

    public setSelectedObject(objectId: number, category: RoomObjectCategoryEnum): void {
        switch (category) {
            case RoomObjectCategoryEnum.Unit:
            case RoomObjectCategoryEnum.Floor:
            case RoomObjectCategoryEnum.Wall: {
                if (category === RoomObjectCategoryEnum.Unit) {
                    this.deselectObject();
                    this.setSelectedAvatar(objectId, true);
                } else {
                    this.setSelectedAvatar(0, false);

                    if (objectId !== this._selectedObjectId) {
                        this.deselectObject();

                        const roomObject = this._room.getRoomObject(objectId, category);

                        if (roomObject && roomObject.logic) {
                            roomObject.processUpdateMessage(new ObjectSelectedMessage(true));

                            this._selectedObjectId = objectId;
                            this._selectedObjectCategory = category;
                        }
                    }
                }

                this._room.eventDispatcher.dispatchEvent(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.SELECTED, this._room.roomId, objectId, category),
                );
            }
        }
    }

    private resetSelectedObjectData(): void {
        //this._roomEngine.removeObjectMoverIconSprite();

        const selectedData = this._room.instance.selectedObject;

        if (selectedData) {
            if (
                selectedData.operation === RoomObjectOperationType.OBJECT_MOVE ||
                selectedData.operation === RoomObjectOperationType.OBJECT_MOVE_TO
            ) {
                const roomObject = this._room.getRoomObject(selectedData.id, selectedData.category);

                if (roomObject && selectedData.operation !== RoomObjectOperationType.OBJECT_MOVE_TO) {
                    roomObject.setLocation(selectedData.loc);
                    roomObject.setDirection(selectedData.dir);
                }

                this.setFurnitureAlphaMultiplier(roomObject, 1);

                if (selectedData.category === RoomObjectCategoryEnum.Wall) {
                    this._room.updateRoomObjectMask(selectedData.id, true);
                }

                this._room.instance.setSelectedObject(
                    new SelectedRoomObjectData(
                        selectedData.id,
                        selectedData.category,
                        RoomObjectOperationType.OBJECT_MOVE,
                        selectedData.loc,
                        selectedData.dir,
                        selectedData.typeId,
                        selectedData.instanceData,
                        selectedData.stuffData,
                        selectedData.state,
                        selectedData.animFrame,
                        selectedData.posture,
                    ),
                );
            } else if (selectedData.operation === RoomObjectOperationType.OBJECT_PLACE) {
                const objectId = selectedData.id;
                const category = selectedData.category;

                switch (category) {
                    case RoomObjectCategoryEnum.Floor:
                        this._room.removeRoomObjectFloor(objectId);
                        break;
                    case RoomObjectCategoryEnum.Wall:
                        this._room.removeRoomObjectWall(objectId);
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        this._room.removeRoomObject(objectId, RoomObjectCategoryEnum.Unit);
                        break;
                }
            }

            this._room.instance.setSelectedObject(undefined);
        }
    }

    private deselectObject(): void {
        if (this._selectedObjectId === -1) return;

        const object = this._room.getRoomObject(this._selectedObjectId, this._selectedObjectCategory);

        if (object && object.logic) {
            object.processUpdateMessage(new ObjectSelectedMessage(false));

            this._selectedObjectId = -1;
            this._selectedObjectCategory = RoomObjectCategoryEnum.Minimum;
        }
    }

    private handleClickOnTile(event: RoomObjectTileMouseEvent): void {
        if (this._room.isDecorating) return;

        // if is spectator return;

        //if(!GetRoomEngine().moveBlocked) GetCommunication().connection.send(new RoomUnitWalkComposer(x, y));
    }

    private handleMouseOverObject(
        category: RoomObjectCategoryEnum,
        event: RoomObjectMouseEvent,
    ): ObjectTileCursorUpdateMessage | undefined {
        if (category !== RoomObjectCategoryEnum.Floor) return undefined;

        const roomObject = this._room.getRoomObject(event.objectId, RoomObjectCategoryEnum.Floor);

        if (!roomObject) return undefined;

        const location = this.getActiveSurfaceLocation(roomObject, event);

        if (!location) return undefined;

        const furnitureHeightMap = this._room.instance.furnitureStackingHeightMap;

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

    private handleObjectMove(event: RoomObjectMouseEvent): void {
        if (!event) return;

        const selectedData = this._room.instance.selectedObject;

        if (!selectedData) return;

        const roomObject = this._room.getRoomObject(selectedData.id, selectedData.category);

        if (!roomObject) return;

        let added = true;

        if (
            selectedData.category === RoomObjectCategoryEnum.Floor ||
            selectedData.category === RoomObjectCategoryEnum.Unit
        ) {
            if (
                !(
                    event instanceof RoomObjectTileMouseEvent &&
                    this.handleFurnitureMove(
                        roomObject,
                        selectedData,
                        Math.trunc(event.tileX + 0.5),
                        Math.trunc(event.tileY + 0.5),
                    )
                )
            ) {
                this.handleFurnitureMove(roomObject, selectedData, selectedData.loc.x, selectedData.loc.y);

                added = false;
            }
        } else if (selectedData.category === RoomObjectCategoryEnum.Wall) {
            added = false;

            if (event instanceof RoomObjectWallMouseEvent) {
                const _local_10 = event.wallLocation;
                const _local_11 = event.wallWidth;
                const _local_12 = event.wallHeight;
                const _local_13 = event.x;
                const _local_14 = event.y;
                const _local_15 = event.direction;

                if (
                    this.handleWallItemMove(
                        roomObject,
                        selectedData,
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
                roomObject.setLocation(selectedData.loc);
                roomObject.setDirection(selectedData.dir);
            }

            this._room.updateRoomObjectMask(selectedData.id, added);
        }

        if (added) {
            this.setFurnitureAlphaMultiplier(roomObject, 0.5);

            //this._roomEngine.setObjectMoverIconSpriteVisible(false);
        } else {
            this.setFurnitureAlphaMultiplier(roomObject, 0);

            //this._roomEngine.setObjectMoverIconSpriteVisible(true);
        }
    }

    private async handleObjectPlace(event: RoomObjectMouseEvent): Promise<void> {
        if (!event) return;

        let selectedData = this._room.instance.selectedObject;

        if (!selectedData) return;

        let roomObject = this._room.getRoomObject(selectedData.id, selectedData.category);

        if (!roomObject) {
            if (event instanceof RoomObjectTileMouseEvent) {
                if (selectedData.category === RoomObjectCategoryEnum.Floor) {
                    await this._room.addFurnitureByTypeId(
                        selectedData.id,
                        selectedData.typeId,
                        selectedData.loc,
                        selectedData.dir,
                        0,
                        selectedData.stuffData,
                        parseFloat(selectedData.instanceData),
                        -1,
                        0,
                        0,
                        '',
                        false,
                    );
                } else if (selectedData.category === RoomObjectCategoryEnum.Unit) {
                    await this._room.addRoomObjectUser(
                        selectedData.id,
                        new Vector3d(),
                        new Vector3d(180),
                        180,
                        selectedData.typeId,
                        selectedData.instanceData,
                    );

                    const roomObject = this._room.getRoomObject(selectedData.id, selectedData.category);

                    if (roomObject && selectedData.posture)
                        roomObject.model.setValue(RoomObjectVariableEnum.FigurePosture, selectedData.posture);
                }
            } else if (event instanceof RoomObjectWallMouseEvent) {
                if (selectedData.category === RoomObjectCategoryEnum.Wall) {
                    await this._room.addFurnitureWallByTypeId(
                        selectedData.id,
                        selectedData.typeId,
                        selectedData.loc,
                        selectedData.dir,
                        0,
                        parseInt(selectedData.instanceData),
                        0,
                    );
                }
            }

            roomObject = this._room.getRoomObject(selectedData.id, selectedData.category);

            if (roomObject) {
                if (selectedData.category === RoomObjectCategoryEnum.Floor) {
                    const allowedDirections = roomObject.model.getValue<number[]>(
                        RoomObjectVariableEnum.FurnitureAllowedDirections,
                    );

                    if (allowedDirections && allowedDirections.length) {
                        const direction = new Vector3d(allowedDirections[0]);

                        roomObject.setDirection(direction);

                        this._room.instance.setSelectedObject(
                            new SelectedRoomObjectData(
                                selectedData.id,
                                selectedData.category,
                                selectedData.operation,
                                selectedData.loc,
                                selectedData.dir,
                                selectedData.typeId,
                                selectedData.instanceData,
                                selectedData.stuffData,
                                selectedData.state,
                                selectedData.animFrame,
                                selectedData.posture,
                            ),
                        );

                        selectedData = this._room.instance.selectedObject;

                        if (!selectedData) return;
                    }
                }
            }

            this.setFurnitureAlphaMultiplier(roomObject, 0.5);
            //this._roomEngine.setObjectMoverIconSpriteVisible(true);
        }

        if (roomObject) {
            let added = true;

            if (selectedData.category === RoomObjectCategoryEnum.Floor) {
                if (
                    !(
                        event instanceof RoomObjectTileMouseEvent &&
                        this.handleFurnitureMove(
                            roomObject,
                            selectedData,
                            Math.trunc(event.tileX + 0.5),
                            Math.trunc(event.tileY + 0.5),
                        )
                    )
                ) {
                    this._room.removeRoomObjectFloor(selectedData.id);

                    added = false;
                }
            } else if (selectedData.category === RoomObjectCategoryEnum.Wall) {
                added = false;

                if (
                    event instanceof RoomObjectWallMouseEvent &&
                    this.handleWallItemMove(
                        roomObject,
                        selectedData,
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
                    this._room.removeRoomObjectWall(selectedData.id);
                }

                this._room.updateRoomObjectMask(selectedData.id, added);
            } else if (selectedData.category === RoomObjectCategoryEnum.Unit) {
                if (
                    !(
                        event instanceof RoomObjectTileMouseEvent &&
                        this.handleUserPlace(roomObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5))
                    )
                ) {
                    this._room.removeRoomObject(selectedData.id, RoomObjectCategoryEnum.Unit);

                    added = false;
                }
            }

            //this._roomEngine.setObjectMoverIconSpriteVisible(!_local_12);
        }
    }

    private handleUserPlace(roomObject: IRoomObjectController, x: number, y: number): boolean {
        if (!this._room.instance.legacyGeometry.isRoomTile(x, y)) return false;

        roomObject.setLocation(new Vector3d(x, y, this._room.instance.legacyGeometry.getHeight(x, y)));

        return true;
    }

    private handleFurnitureMove(
        roomObject: IRoomObjectController,
        selectedObjectData: ISelectedRoomObjectData,
        x: number,
        y: number,
    ): boolean {
        if (!roomObject || !selectedObjectData) return false;

        const realDir = new Vector3d();

        realDir.assign(roomObject.getDirection());

        roomObject.setDirection(selectedObjectData.dir);

        const newLoc = new Vector3d(x, y, 0);
        const newDir = new Vector3d();

        newDir.assign(roomObject.getDirection());

        let loc = this.validateFurnitureLocation(roomObject, newLoc, selectedObjectData.loc, selectedObjectData.dir);

        if (!loc) {
            newDir.x = this.getValidRoomObjectDirection(roomObject, true);

            roomObject.setDirection(newDir);

            loc = this.validateFurnitureLocation(roomObject, newLoc, selectedObjectData.loc, selectedObjectData.dir);
        }

        if (!loc) {
            roomObject.setDirection(realDir);

            return false;
        }

        roomObject.setLocation(loc);

        if (newDir) roomObject.setDirection(newDir);

        return true;
    }

    private handleWallItemMove(
        k: IRoomObjectController,
        _arg_2: ISelectedRoomObjectData,
        _arg_3: IVector3D,
        _arg_4: IVector3D,
        _arg_5: IVector3D,
        _arg_6: number,
        _arg_7: number,
        _arg_8: number,
    ): boolean {
        if (!k || !_arg_2) return false;

        const _local_9 = new Vector3d(_arg_8);
        const _local_10 = this.validateWallItemLocation(k, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7, _arg_2);

        if (!_local_10) return false;

        k.setLocation(_local_10);
        k.setDirection(_local_9);

        return true;
    }

    private validateFurnitureLocation(
        roomObject: IRoomObject,
        loc: IVector3D,
        prevLoc: IVector3D,
        prevDir: IVector3D,
    ): IVector3D | undefined {
        if (!roomObject || !roomObject.model || !loc || !prevLoc || !prevDir) return undefined;

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
            this._room.instance.furnitureStackingHeightMap.validateLocation(
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
                this._room.instance.furnitureStackingHeightMap.getTileHeight(loc.x, loc.y),
            );

        return undefined;
    }

    private validateWallItemLocation(
        k: IRoomObject,
        _arg_2: IVector3D,
        _arg_3: IVector3D,
        _arg_4: IVector3D,
        _arg_5: number,
        _arg_6: number,
        _arg_7: ISelectedRoomObjectData,
    ): IVector3D | undefined {
        if (k == null || k.model == null || _arg_2 == null || _arg_3 == null || _arg_4 == null || _arg_7 == null)
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
}
