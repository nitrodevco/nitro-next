import type {
    IFurnitureStackingHeightMap,
    IObjectData,
    IRoomObject,
    IRoomObjectController,
    IVector3D,
} from '@nitrodevco/nitro-api';
import {
    type IRoom,
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
import type { RoomObjectEvent } from '@nitrodevco/nitro-shared';
import {
    RoomObjectBadgeAssetEvent,
    RoomObjectDataRequestEvent,
    RoomObjectDimmerStateUpdateEvent,
    RoomObjectFloorHoleEvent,
    RoomObjectFurnitureActionEvent,
    RoomObjectHSLColorEnableEvent,
    RoomObjectMouseEvent,
    RoomObjectMoveEvent,
    RoomObjectPlaySoundIdEvent,
    RoomObjectRoomAdEvent,
    RoomObjectSamplePlaybackEvent,
    RoomObjectStateChangedEvent,
    RoomObjectTileMouseEvent,
    RoomObjectWallMouseEvent,
    RoomObjectWidgetRequestEvent,
} from '@nitrodevco/nitro-shared';

import { GetRoomEngine } from './GetRoomEngine';
import { ObjectAvatarSelectedMessage, ObjectSelectedMessage } from './messages';
import { SelectedRoomObjectData } from './utils';

export class RoomObjectEventHandler {
    private _room: IRoom;

    private _eventIds: Map<number, Map<string, string>> = new Map();
    private _selectedAvatarId: number = -1;
    private _selectedObjectId: number = -1;
    private _selectedObjectCategory: RoomObjectCategoryEnum = RoomObjectCategoryEnum.Minimum;
    private _objectPlacementSource: string = '';

    constructor(room: IRoom) {
        this._room = room;
    }

    public handleRoomObjectEvent(event: RoomObjectEvent): void {
        if (!event) return;

        if (event instanceof RoomObjectMouseEvent) {
            this.handleRoomObjectMouseEvent(event);

            return;
        }

        switch (event.type) {
            case RoomObjectStateChangedEvent.STATE_CHANGE:
            case RoomObjectStateChangedEvent.STATE_RANDOM:
                //this.onRoomObjectStateChangedEvent(event as RoomObjectStateChangedEvent, roomId);
                return;
            case RoomObjectDimmerStateUpdateEvent.DIMMER_STATE:
                //this.onRoomObjectDimmerStateUpdateEvent(event as RoomObjectDimmerStateUpdateEvent, roomId);
                return;
            case RoomObjectMoveEvent.POSITION_CHANGED:
            case RoomObjectMoveEvent.OBJECT_REMOVED:
                //this.handleSelectedObjectRemove(event as RoomObjectMoveEvent, roomId);
                return;
            case RoomObjectWidgetRequestEvent.OPEN_WIDGET:
            case RoomObjectWidgetRequestEvent.CLOSE_WIDGET:
            case RoomObjectWidgetRequestEvent.OPEN_FURNI_CONTEXT_MENU:
            case RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU:
            case RoomObjectWidgetRequestEvent.PLACEHOLDER:
            case RoomObjectWidgetRequestEvent.CREDITFURNI:
            case RoomObjectWidgetRequestEvent.STACK_HEIGHT:
            case RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE:
            case RoomObjectWidgetRequestEvent.STICKIE:
            case RoomObjectWidgetRequestEvent.PRESENT:
            case RoomObjectWidgetRequestEvent.TROPHY:
            case RoomObjectWidgetRequestEvent.TEASER:
            case RoomObjectWidgetRequestEvent.ECOTRONBOX:
            case RoomObjectWidgetRequestEvent.DIMMER:
            case RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER:
            case RoomObjectWidgetRequestEvent.CLOTHING_CHANGE:
            case RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR:
            case RoomObjectWidgetRequestEvent.MANNEQUIN:
            case RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU:
            case RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU:
            case RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG:
            case RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG:
            case RoomObjectWidgetRequestEvent.BACKGROUND_COLOR:
            case RoomObjectWidgetRequestEvent.AREA_HIDE:
            case RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG:
            case RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG:
            case RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG:
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_OPEN:
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING:
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED:
            case RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM:
            case RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING:
            case RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING:
            case RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY:
            case RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY:
            case RoomObjectWidgetRequestEvent.INERNAL_LINK:
            case RoomObjectWidgetRequestEvent.ROOM_LINK:
            case RoomObjectWidgetRequestEvent.YOUTUBE:
                //this.onRoomObjectWidgetRequestEvent(event as RoomObjectWidgetRequestEvent, roomId);
                return;
            case RoomObjectFurnitureActionEvent.DICE_ACTIVATE:
            case RoomObjectFurnitureActionEvent.DICE_OFF:
            case RoomObjectFurnitureActionEvent.USE_HABBOWHEEL:
            case RoomObjectFurnitureActionEvent.STICKIE:
            case RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR:
                //this.onRoomObjectFurnitureActionEvent(event as RoomObjectFurnitureActionEvent, roomId);
                return;
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_START:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE:
                //this.handleObjectSoundMachineEvent(event, roomId);
                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_INIT:
            case RoomObjectFurnitureActionEvent.JUKEBOX_START:
            case RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP:
            case RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE:
                //this.handleObjectJukeboxEvent(event, roomId);
                return;
            case RoomObjectFloorHoleEvent.ADD_HOLE:
            case RoomObjectFloorHoleEvent.REMOVE_HOLE:
                //this.onRoomObjectFloorHoleEvent(event as RoomObjectFloorHoleEvent, roomId);
                return;
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK:
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_DOUBLE_CLICK:
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_SHOW:
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_HIDE:
            case RoomObjectRoomAdEvent.ROOM_AD_LOAD_IMAGE:
                //this.onRoomObjectRoomAdEvent(event as RoomObjectRoomAdEvent, roomId);
                return;
            case RoomObjectBadgeAssetEvent.LOAD_BADGE:
                //this.onRoomObjectBadgeAssetEvent(event as RoomObjectBadgeAssetEvent, roomId);
                return;
            case RoomObjectFurnitureActionEvent.MOUSE_ARROW:
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                //this.handleMousePointer(event as RoomObjectFurnitureActionEvent, roomId);
                return;
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND:
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH:
                //this.handleRoomObjectPlaySoundEvent(event as RoomObjectPlaySoundIdEvent, roomId);
                return;
            case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED:
            case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED:
            case RoomObjectSamplePlaybackEvent.PLAY_SAMPLE:
            case RoomObjectSamplePlaybackEvent.CHANGE_PITCH:
                //this.handleRoomObjectSamplePlaybackEvent(event as RoomObjectSamplePlaybackEvent, roomId);
                return;
            case RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR:
                //this.onHSLColorEnableEvent(event as RoomObjectHSLColorEnableEvent, roomId);
                return;
            case RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID:
            case RoomObjectDataRequestEvent.RODRE_URL_PREFIX:
                //this.onRoomObjectDataRequestEvent(event as RoomObjectDataRequestEvent, roomId);
                return;
            default:
                NitroLogger.warn('Unhandled Event', event.constructor.name, 'Object ID', event.object.id);
                return;
        }
    }

    private handleRoomObjectMouseEvent(event: RoomObjectMouseEvent): void {
        if (!event || !event.type) return;

        if (event instanceof RoomObjectTileMouseEvent) {
            //GetRoomEngine().areaSelectionManager.handleTileMouseEvent(event);
        }

        switch (event.type) {
            case RoomObjectMouseEvent.CLICK:
                this.handleRoomObjectMouseClickEvent(event);
                return;
            case RoomObjectMouseEvent.DOUBLE_CLICK:
                //this.handleRoomObjectMouseDoubleClickEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_MOVE:
                //this.handleRoomObjectMouseMoveEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN:
                //this.handleRoomObjectMouseDownEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN_LONG:
                //this.handleRoomObjectMouseDownLongEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_ENTER:
                //this.handleRoomObjectMouseEnterEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_LEAVE:
                //this.handleRoomObjectMouseLeaveEvent(event, roomId);
                return;
        }
    }

    private handleRoomObjectMouseClickEvent(event: RoomObjectMouseEvent): void {
        if (!event) return;

        this.clickRoomObject(event);

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this._room.instance.selectedObject;

        if (selectedData) operation = selectedData.operation;

        let didWalk = false;
        let didMove = false;

        if (GetRoomEngine().whereYouClickIsWhereYouGo()) {
            if (operation === RoomObjectOperationType.OBJECT_UNDEFINED)
                didWalk = this.handleMoveTargetFurni(roomId, event);
        }

        const category = GetRoomEngine().getRoomObjectCategoryForType(event.objectType);

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
                    if (!GetRoomEngine().isAreaSelectionMode() || category === RoomObjectCategoryEnum.Unit) {
                        this.setSelectedObject(event.objectId, category);
                    } else {
                        this.deselectObject();

                        /* EventStore.getState().emit(
                            new RoomEngineObjectEvent(
                                RoomEngineObjectEvent.DESELECTED,
                                roomId,
                                -1,
                                RoomObjectCategoryEnum.Minimum,
                            ),
                        ); */
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

                        if (!GetRoomEngine().isPlayingGame) {
                            didWalk = true;
                        } else {
                            didMove = true;
                        }
                    } else if (category === RoomObjectCategoryEnum.Floor || category === RoomObjectCategoryEnum.Wall) {
                        if (event.altKey || event.ctrlKey || event.shiftKey) {
                            if (!event.ctrlKey && !event.altKey && event.shiftKey) {
                                if (category === RoomObjectCategoryEnum.Floor) {
                                    /* EventStore.getState().emit(
                                        new RoomEngineObjectEvent(
                                            RoomEngineObjectEvent.REQUEST_ROTATE,
                                            roomId,
                                            event.objectId,
                                            category,
                                        ),
                                    ); */
                                }
                            } else if (event.ctrlKey && !event.altKey && !event.shiftKey) {
                                this.modifyRoomObject(event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
                            }

                            if (!GetRoomEngine().isPlayingGame) {
                                didWalk = true;
                            } else {
                                didMove = true;
                            }
                        }
                    }

                    if (event.eventId) {
                        if (didWalk) {
                            this.setMouseEventId(
                                RoomObjectCategoryEnum.Room,
                                MouseEventType.MOUSE_CLICK,
                                event.eventId,
                            );
                        }

                        if (didMove) {
                            this.setMouseEventId(
                                RoomObjectCategoryEnum.Minimum,
                                MouseEventType.MOUSE_CLICK,
                                event.eventId,
                            );
                        }
                    }
                }
                break;
        }

        if (category === RoomObjectCategoryEnum.Room) {
            const _local_15 = this.getMouseEventId(RoomObjectCategoryEnum.Minimum, MouseEventType.MOUSE_CLICK);
            const _local_16 = this.getMouseEventId(RoomObjectCategoryEnum.Unit, MouseEventType.MOUSE_CLICK);

            if (_local_15 !== event.eventId && _local_16 !== event.eventId && !didMove) {
                this.deselectObject();

                /* EventStore.getState().emit(
                    new RoomEngineObjectEvent(
                        RoomEngineObjectEvent.DESELECTED,
                        roomId,
                        -1,
                        RoomObjectCategoryEnum.Minimum,
                    ),
                ); */

                this.setSelectedAvatar(0, false);
            }
        }
    }

    private clickRoomObject(event: RoomObjectMouseEvent): void {
        if (!event || event.altKey || event.ctrlKey || event.shiftKey) return;

        const objectId = event.objectId;
        const objectType = event.objectType;
        const category = GetRoomEngine().getRoomObjectCategoryForType(objectType);

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

                    if (
                        this.isValidLocation(
                            roomObject,
                            new Vector3d(direction),
                            this._room.instance.furnitureStackingHeightMap,
                        )
                    ) {
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
                this.setSelectedRoomObjectData(
                    roomObject.id,
                    category,
                    operation,
                    roomObject.getLocation(),
                    roomObject.getDirection(),
                );
                //GetRoomEngine().setObjectMoverIconSprite(roomObject.id, category, true);
                //GetRoomEngine().setObjectMoverIconSpriteVisible(false);
                break;
            case RoomObjectOperationType.OBJECT_MOVE_TO: {
                const selectedData = this._room.instance.selectedObject;

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

    public getValidRoomObjectDirection(k: IRoomObjectController, _arg_2: boolean): number {
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

    private isValidLocation(
        object: IRoomObject,
        goalDirection: IVector3D,
        stackingHeightMap: IFurnitureStackingHeightMap,
    ): boolean {
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

        if (stackingHeightMap && location) {
            const alwaysStackable =
                object.model.getValue<number>(RoomObjectVariableEnum.FurnitureAlwaysStackable) === 1;

            if (
                stackingHeightMap.validateLocation(
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
        }

        return false;
    }

    private getMouseEventId(k: number, _arg_2: string): string | undefined {
        return this._eventIds.get(k)?.get(_arg_2) ?? undefined;
    }

    private setMouseEventId(k: number, _arg_2: string, _arg_3: string): void {
        let existing = this._eventIds.get(k);

        if (!existing) {
            existing = new Map();

            this._eventIds.set(k, existing);
        }

        existing.delete(_arg_2);
        existing.set(_arg_2, _arg_3);
    }

    private setFurnitureAlphaMultiplier(object: IRoomObjectController, multiplier: number): void {
        if (!object || !object.model) return;

        object.model.setValue(RoomObjectVariableEnum.FurnitureAlphaMultiplier, multiplier);
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

        //this._room.instance.setPlacedObject(new SelectedRoomObjectData(selectedData.id, selectedData.category, null, selectedData.dir, null));

        this.resetSelectedObjectData();

        const placedInRoom = roomObject && roomObject.id === selectedData.id;

        //EventStore.getState().emit(new RoomEngineObjectPlacedEvent(RoomEngineObjectEvent.PLACED, roomId, objectId, category, wallLocation, x, y, z, direction, placedInRoom, isTileEvent, isWallEvent, selectedData.instanceData));
    }

    private placeObjectOnUser(objectId: number, category: RoomObjectCategoryEnum): void {
        const roomObject = this._room.getRoomObject(objectId, category);

        //EventStore.getState().emit(new RoomEngineObjectPlacedOnUserEvent(RoomEngineObjectEvent.PLACED_ON_USER, roomId, objectId, category, objectData.id, objectData.category));
    }

    public setSelectedObject(objectId: number, category: RoomObjectCategoryEnum): void {
        switch (category) {
            case RoomObjectCategoryEnum.Unit:
            case RoomObjectCategoryEnum.Floor:
            case RoomObjectCategoryEnum.Wall:
                if (category === RoomObjectCategoryEnum.Unit) {
                    this.deselectObject();
                    this.setSelectedAvatar(objectId, true);
                } else {
                    this.setSelectedAvatar(0, false);

                    if (objectId !== this._selectedObjectId) {
                        this.deselectObject();

                        const roomObject = this._room.getRoomObject(objectId, category);

                        if (roomObject && roomObject.logic) {
                            roomObject.logic.processUpdateMessage(new ObjectSelectedMessage(true));

                            this._selectedObjectId = objectId;
                            this._selectedObjectCategory = category;
                        }
                    }
                }

                /* EventStore.getState().emit(
                    new RoomEngineObjectEvent(RoomEngineObjectEvent.SELECTED, roomId, objectId, category),
                ); */

                return;
        }
    }

    private deselectObject(): void {
        if (this._selectedObjectId === -1) return;

        const object = this._room.getRoomObject(this._selectedObjectId, this._selectedObjectCategory);

        if (object && object.logic) {
            object.logic.processUpdateMessage(new ObjectSelectedMessage(false));

            this._selectedObjectId = -1;
            this._selectedObjectCategory = RoomObjectCategoryEnum.Minimum;
        }
    }

    public setSelectedAvatar(objectId: number, _arg_3: boolean): void {
        const prevAvatar = this._room.getRoomObject(this._selectedAvatarId, RoomObjectCategoryEnum.Unit);

        if (prevAvatar && prevAvatar.logic) {
            prevAvatar.logic.processUpdateMessage(new ObjectAvatarSelectedMessage(false));

            this._selectedAvatarId = -1;
        }

        let _local_6 = false;

        const nextAvatar = this._room.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (nextAvatar && nextAvatar.logic) {
            nextAvatar.logic.processUpdateMessage(new ObjectAvatarSelectedMessage(true));

            this._selectedAvatarId = objectId;

            const location = nextAvatar.getLocation();

            if (_arg_3) {
                const location = nextAvatar.getLocation();
                //GetCommunication().connection.send(new RoomUnitLookComposer(~~(location.x), ~~(location.y)));
                _local_6 = true;
            }
        }

        /* const selectionArrow = this._roomEngine.getRoomObjectSelectionArrow(k);

        if (selectionArrow && selectionArrow.logic) {
            if (_local_6 && !this._roomEngine.isPlayingGame())
                selectionArrow.logic.processUpdateMessage(
                    new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.ENABLED),
                );
            else
                selectionArrow.logic.processUpdateMessage(
                    new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.DISABLED),
                );
        } */
    }

    private setSelectedRoomObjectData(
        id: number,
        category: RoomObjectCategoryEnum,
        operation: RoomObjectOperationType,
        location: IVector3D,
        direction: IVector3D,
        typeId: number = 0,
        instanceData: string,
        stuffData: IObjectData,
        state: number = -1,
        frameNumber: number = -1,
        posture: string,
    ): void {
        this.resetSelectedObjectData();

        const selectedData = new SelectedRoomObjectData(
            id,
            category,
            operation,
            location,
            direction,
            typeId,
            instanceData,
            stuffData,
            state,
            frameNumber,
            posture,
        );

        this._room.instance.setSelectedObject(selectedData);
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
                    //this._room.updateRoomObjectMask(selectedData.id, true);
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
                        //this._roomEngine.removeRoomObjectWall(objectId);
                        break;
                    case RoomObjectCategoryEnum.Unit:
                        //this._roomEngine.removeRoomObjectUser(objectId);
                        break;
                }
            }

            this._room.instance.setSelectedObject(null);
        }
    }

    private handleClickOnTile(event: RoomObjectTileMouseEvent): void {
        if (this._room.isDecorating) return;

        //const session = GetRoomSessionManager().getSession(roomId);

        //if (!session || session.isSpectator) return;

        //if (!this._roomEngine.moveBlocked) this.sendWalkUpdate(event.tileXAsInt, event.tileYAsInt);
    }
}
