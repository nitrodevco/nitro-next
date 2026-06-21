import type {
    IEventDispatcher,
    INitroEvent,
    IObjectData,
    IPetCustomPart,
    IRoom,
    IRoomAreaSelectionManager,
    IRoomEventHandler,
    IRoomGeometry,
    IRoomInstance,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    IRoomRenderingCanvas,
    IVector3D, RoomObjectUserType
} from '@nitrodevco/nitro-api';
import {
    RoomGeometryScaleType
} from '@nitrodevco/nitro-api';
import {
    RoomObjectUserTypeName
} from '@nitrodevco/nitro-api';
import {
    GetObjectDataForFlags,
    LegacyDataType,
    NitroLogger,
    ObjectDataFlagsEnum,
    RoomObjectCategoryEnum,
    RoomObjectUserTypeUtils,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import {
    EventDispatcher,
    GetConfigValue,
    RoomEngineObjectEvent
} from '@nitrodevco/nitro-shared';
import type { ImageLike, Rectangle } from 'pixi.js';
import { Container, Texture } from 'pixi.js';
import { type PointData, Sprite } from 'pixi.js';

import { PetFigureData } from '../session';
import { FurniId, GetTickerTime } from '../utils';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomEngine } from './GetRoomEngine';
import { GetRoomObjectLogicFactory } from './GetRoomObjectLogicFactory';
import { GetRoomObjectVisualizationFactory } from './GetRoomObjectVisualizationFactory';
import {
    ObjectAvatarFigureUpdateMessage,
    ObjectAvatarUpdateMessage,
    ObjectDataUpdateMessage,
    ObjectHeightUpdateMessage,
    ObjectRoomMaskUpdateMessage,
    ObjectRoomUpdateMessage,
    RoomObjectUpdateMessage,
} from './messages';
import { RoomLogic } from './object';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomAreaSelectionManager } from './utils';

export class Room implements IRoom {
    public static ROOM_OBJECT_ID: number = -1;
    public static ROOM_OBJECT_TYPE: string = 'room';
    public static CURSOR_OBJECT_ID: number = -2;
    public static CURSOR_OBJECT_TYPE: string = 'tile_cursor';
    public static ARROW_OBJECT_ID: number = -3;
    public static ARROW_OBJECT_TYPE: string = 'selection_arrow';
    public static OVERLAY: string = 'overlay';
    public static OVERLAY_ICON_SPRITE: string = 'overlay_icon_sprite';

    private _roomId: number;
    private _instance: IRoomInstance;
    private _eventDispatcher: IEventDispatcher;
    private _eventHandler: IRoomEventHandler;

    private _modelName: string;

    private _areaSelection: IRoomAreaSelectionManager;

    constructor(roomId: number, instance: IRoomInstance) {
        this._roomId = roomId;
        this._instance = instance;
        this._eventDispatcher = new EventDispatcher();
        this._eventHandler = new RoomEventHandler(this);
        this._areaSelection = new RoomAreaSelectionManager(this);
    }

    public prepareRoom(): boolean {
        this._instance.model.setValue(RoomObjectVariableEnum.RoomIsPublic, 0);
        this._instance.model.setValue(RoomObjectVariableEnum.RoomZScale, 1);

        this.createRoomObjectAndInitalize(
            Room.CURSOR_OBJECT_ID,
            Room.CURSOR_OBJECT_TYPE,
            RoomObjectCategoryEnum.Cursor,
        );

        if (GetConfigValue('renderer.avatarArrowEnabled', false)) this.createRoomObjectAndInitalize(
            Room.ARROW_OBJECT_ID,
            Room.ARROW_OBJECT_TYPE,
            RoomObjectCategoryEnum.Cursor,
        );

        return true;
    }

    public getRoomCanvas(width: number, height: number, scale: number): IRoomRenderingCanvas {
        if (!this._instance.canvas) {
            this._instance.roomObjectVariableAccurateZ = RoomObjectVariableEnum.ObjectAccurateZValue;
        }

        this._instance.roomObjectVariableAccurateZ = RoomObjectVariableEnum.ObjectAccurateZValue;

        const canvas = this._instance.createCanvas(width, height, scale);

        canvas.setEventHandler(this._eventHandler);

        if (canvas.geometry) {
            canvas.geometry.zScale = this.getRoomValue(RoomObjectVariableEnum.RoomZScale);

            const doorX = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorX);
            const doorY = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorY);
            const doorZ = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorZ);
            const doorDirection = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorDir);
            const vector = new Vector3d(doorX, doorY, doorZ);

            let direction: IVector3D | undefined = undefined;

            if (doorDirection === 90) direction = new Vector3d(-2000, 0, 0);

            if (doorDirection === 180) direction = new Vector3d(0, -2000, 0);

            if (direction) canvas.geometry.setDisplacement(vector, direction);
        }

        const overlay = new Container();

        overlay.label = Room.OVERLAY;
        overlay.interactive = false;

        canvas.master?.addChild(overlay);

        return canvas;
    }

    public applyRoomMap(roomMap: IRoomMapData): void {
        if (!roomMap) return;

        let roomObject = this._instance.getRoomObject(
            Room.ROOM_OBJECT_ID,
            RoomObjectCategoryEnum.Room,
        ) as IRoomObjectController;

        if (roomObject) this._instance.removeRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);

        if (!roomObject)
            roomObject = (this.createRoomObjectAndInitalize(
                Room.ROOM_OBJECT_ID,
                Room.ROOM_OBJECT_TYPE,
                RoomObjectCategoryEnum.Room,
            )) as IRoomObjectController;

        if (!roomObject || !(roomObject.logic instanceof RoomLogic)) return;

        const dimensions = roomMap.dimensions;

        if (dimensions) {
            const minX = roomMap.dimensions.minX;
            const maxX = roomMap.dimensions.maxX;
            const minY = roomMap.dimensions.minY;
            const maxY = roomMap.dimensions.maxY;

            this._instance.model.setValue(RoomObjectVariableEnum.RoomMinX, minX);
            this._instance.model.setValue(RoomObjectVariableEnum.RoomMaxX, maxX);
            this._instance.model.setValue(RoomObjectVariableEnum.RoomMinY, minY);
            this._instance.model.setValue(RoomObjectVariableEnum.RoomMaxY, maxY);

            const seed = Math.trunc(minX * 423 + maxX * 671 + minY * 913 + maxY * 7509);

            roomObject.model.setValue(RoomObjectVariableEnum.RoomRandomSeed, seed);
        }

        roomObject.logic.initialize(roomMap);

        if (roomMap.doors.length) {
            let doorIndex = 0;

            while (doorIndex < roomMap.doors.length) {
                const door = roomMap.doors[doorIndex];

                if (door) {
                    const doorX = door.x;
                    const doorY = door.y;
                    const doorZ = door.z;
                    const doorDir = door.dir;
                    const maskType = ObjectRoomMaskUpdateMessage.DOOR;
                    const maskId = 'door_' + doorIndex;
                    const maskLocation = new Vector3d(doorX, doorY, doorZ);

                    roomObject.processUpdateMessage(
                        new ObjectRoomMaskUpdateMessage(
                            ObjectRoomMaskUpdateMessage.ADD_MASK,
                            maskId,
                            maskType,
                            maskLocation,
                            ObjectRoomMaskUpdateMessage.HOLE,
                        ),
                    );

                    if (doorDir === 90 || doorDir === 180) {
                        if (doorDir === 90) {
                            this._instance.model.setValue(RoomObjectVariableEnum.RoomDoorX, doorX - 0.5);
                            this._instance.model.setValue(RoomObjectVariableEnum.RoomDoorY, doorY);
                        }

                        if (doorDir === 180) {
                            this._instance.model.setValue(RoomObjectVariableEnum.RoomDoorX, doorX);
                            this._instance.model.setValue(RoomObjectVariableEnum.RoomDoorY, doorY - 0.5);
                        }

                        this._instance.model.setValue(RoomObjectVariableEnum.RoomDoorZ, doorZ);
                        this._instance.model.setValue(RoomObjectVariableEnum.RoomDoorDir, doorDir);
                    }
                }

                doorIndex++;
            }
        }

        const floorType = '111';
        const wallType = '201';
        const landscapeType = 'default';

        if (floorType) {
            roomObject.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE, floorType),
            );
            this._instance.model.setValue(RoomObjectVariableEnum.RoomFloorType, floorType);
        }

        if (wallType) {
            roomObject.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_WALL_UPDATE, wallType),
            );
            this._instance.model.setValue(RoomObjectVariableEnum.RoomWallType, wallType);
        }

        if (landscapeType) {
            roomObject.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE, landscapeType),
            );
            this._instance.model.setValue(RoomObjectVariableEnum.RoomLandscapeType, landscapeType);
        }
    }

    public getRoomObjectBoundingRectangle(objectId: number, category: RoomObjectCategoryEnum): Rectangle | undefined {
        const roomObject = this.getRoomObject(objectId, category);
        const rectangle = roomObject?.visualization?.getBoundingRectangle();

        if (!roomObject || !rectangle) return undefined;

        const canvas = this._instance.canvas;
        const screenPoint = canvas?.geometry?.getScreenPoint(roomObject.getLocation());

        if (!canvas || !screenPoint) return undefined;

        screenPoint.x = Math.round(screenPoint.x);
        screenPoint.y = Math.round(screenPoint.y);

        rectangle.x = (rectangle.x * canvas.scale);
        rectangle.y = (rectangle.y * canvas.scale);
        rectangle.width = (rectangle.width * canvas.scale);
        rectangle.height = (rectangle.height * canvas.scale);

        screenPoint.x = (screenPoint.x * canvas.scale);
        screenPoint.y = (screenPoint.y * canvas.scale);

        rectangle.x += screenPoint.x;
        rectangle.y += screenPoint.y;

        rectangle.x += (Math.round(canvas.width / 2) + canvas.screenOffsetX);
        rectangle.y += (Math.round(canvas.height / 2) + canvas.screenOffsetY);

        return rectangle;
    }

    public setRoomInstanceRenderingCanvasOffset(point: PointData): boolean {
        if (!this._instance.canvas || !point) return false;

        const x = ~~(point.x);
        const y = ~~(point.y);

        if ((this._instance.canvas.screenOffsetX === x) && (this._instance.canvas.screenOffsetY === y)) return false;

        this._instance.canvas.screenOffsetX = x;
        this._instance.canvas.screenOffsetY = y;

        return true;
    }

    public getGeometry(): IRoomGeometry | undefined {
        return this._instance?.canvas?.geometry;
    }

    public getRoomObject(objectId: number, category: RoomObjectCategoryEnum): IRoomObjectController {
        const roomObject = this._instance.getRoomObject(objectId, category) as IRoomObjectController;

        if (!roomObject) {
            switch (category) {
                case RoomObjectCategoryEnum.Floor: {
                    //this.addObjectFurnitureFromData(this.getRoomIdFromString(roomId), objectId, null);
                    break;
                }
                case RoomObjectCategoryEnum.Wall: {
                    //this.addObjectWallItemFromData(this.getRoomIdFromString(roomId), objectId, null);
                    break;
                }
            }
        }

        return roomObject;
    }

    public getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[] {
        return this._instance.getRoomObjectsForCategory(category);
    }

    public getRoomObjectCategoryForType(type: string): RoomObjectCategoryEnum {
        return GetRoomContentLoader().getCategoryForType(type);
    }

    public removeRoomObject(objectId: number, category: RoomObjectCategoryEnum): void {
        this._instance.removeRoomObject(objectId, category);

        this.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.REMOVED, this._roomId, objectId, category),
        );
    }

    public createRoomObjectAndInitalize(
        objectId: number,
        type: string,
        category: RoomObjectCategoryEnum,
    ): IRoomObject | undefined {
        let assetName = type;
        let asset = GetRoomContentLoader().getCollection(assetName);
        let isLoading = false;

        if (!asset) {
            if (GetRoomContentLoader().isLoaderType(type)) {
                isLoading = true;

                GetRoomContentLoader().downloadAsset(type)
                    .then(flag => {
                        if (!flag) return;

                        this.reinitializeRoomObjectsByType(type);
                    })
                    .catch(err => NitroLogger.error(err));

                assetName = GetRoomContentLoader().getPlaceholderName(type);
            }
        }

        asset = GetRoomContentLoader().getCollection(assetName);

        if (!asset) return undefined;

        const visualization = GetRoomObjectVisualizationFactory().getVisualization(asset.data.visualizationType);
        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
            assetName,
            asset.data.visualizationType,
            asset.data,
        );

        if (visualization) {
            visualization.asset = asset;

            if (!visualizationData || !visualization.initialize(visualizationData)) return undefined;

            const object = this._instance.createRoomObject(objectId, 1, type, category) as IRoomObjectController;

            if (object) {
                object.setVisualization(visualization);

                const logic = GetRoomObjectLogicFactory().getLogic(asset.data.logicType);

                if (logic) {
                    logic.eventHandler = this._eventHandler;

                    object.setLogic(logic);
                    object.logic.initialize(asset.data);
                }

                object.model.setValue(RoomObjectVariableEnum.ObjectRoomId, this._roomId);

                if (!isLoading) {
                    this.objectInitialized(object.id, category);

                    object.isReady = true;
                }

                return object;
            }
        }

        return undefined;
    }

    public objectInitialized(objectId: number, category: RoomObjectCategoryEnum): void {
        if (category === RoomObjectCategoryEnum.Wall) this.updateRoomObjectMask(objectId);

        const object = this.getRoomObject(objectId, category);

        if (!object) return;

        const dataFormat = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureDataFormat);

        if (!isNaN(dataFormat)) {
            const data = GetObjectDataForFlags(dataFormat);

            if (data) {
                data.initializeFromRoomObjectModel(object.model);

                object.processUpdateMessage(new ObjectDataUpdateMessage(object.getState(0), data));
            }
        }

        //EventStore.getState().emit(new RoomEngineObjectEvent(RoomEngineObjectEvent.CONTENT_UPDATED, id, objectId, category));

        //this.addObjectToTileMap(id, object);
    }

    public reinitializeRoomObjectsByType(type: string): void {
        if (!type) return;

        const asset = GetRoomContentLoader().getCollection(type);

        if (!asset) return;

        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
            type,
            asset.data.visualizationType,
            asset.data
        );

        for (const [category, manager] of this._instance.managers.entries()) {
            for (const object of manager.objects.getValues()) {
                if (!object || object.type !== type) continue;

                const visualization = GetRoomObjectVisualizationFactory().getVisualization(asset.data.visualizationType)

                if (visualization) {
                    visualization.asset = asset;

                    if (visualizationData && visualization.initialize(visualizationData)) {
                        object.setVisualization(visualization);

                        const logic = GetRoomObjectLogicFactory().getLogic(asset.data.logicType);

                        if (logic) {
                            logic.eventHandler = this._eventHandler;

                            object.setLogic(logic);
                            logic.initialize(asset.data);
                        }

                        this.objectInitialized(object.id, category);

                        object.isReady = true;

                        continue;
                    }
                }

                manager.removeObject(object.id);
            }
        }
    }

    public createRoomObjectFloor(id: number, type: string): IRoomObject | undefined {
        return this.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Floor);
    }

    public createRoomObjectWall(id: number, type: string): IRoomObject | undefined {
        return this.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Wall);
    }

    public createRoomObjectUser(id: number, type: string): IRoomObject | undefined {
        return this.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Unit);
    }

    public updateRoomObjectFloor(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        data?: IObjectData,
        extra?: number,
    ): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

        if (!object) return false;

        object.processUpdateMessage(new RoomObjectUpdateMessage(location, direction));
        object.processUpdateMessage(new ObjectDataUpdateMessage(state, data, extra));

        return true;
    }

    public updateRoomObjectWall(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        data?: IObjectData,
        extra?: number,
    ): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        if (!object || !object.logic) return false;

        object.processUpdateMessage(new RoomObjectUpdateMessage(location, direction));
        object.processUpdateMessage(new ObjectDataUpdateMessage(state, data, extra));

        this.updateRoomObjectMask(objectId);

        return true;
    }

    public updateRoomObjectFloorHeight(objectId: number, height: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

        if (!object) return false;

        object.processUpdateMessage(new ObjectHeightUpdateMessage(undefined, undefined, height));

        return true;
    }

    public updateRoomObjectMask(objectId: number, add: boolean = true): void {
        const maskName = RoomObjectCategoryEnum.Wall + '_' + objectId;
        const roomObject = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        let maskUpdate: ObjectRoomMaskUpdateMessage | undefined = undefined;

        if (roomObject && roomObject.model) {
            if (roomObject.model.getValue<boolean>(RoomObjectVariableEnum.FurnitureUsesPlaneMask)) {
                const maskType = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurniturePlaneMaskType);
                const location = roomObject.getLocation();

                if (add)
                    maskUpdate = new ObjectRoomMaskUpdateMessage(
                        ObjectRoomMaskUpdateMessage.ADD_MASK,
                        maskName,
                        maskType,
                        location,
                    );
                else maskUpdate = new ObjectRoomMaskUpdateMessage(ObjectRoomMaskUpdateMessage.REMOVE_MASK, maskName);
            }
        } else {
            maskUpdate = new ObjectRoomMaskUpdateMessage(ObjectRoomMaskUpdateMessage.REMOVE_MASK, maskName);
        }

        const roomObjectRoom = this.getRoomObjectRoom();

        if (roomObjectRoom && maskUpdate) roomObjectRoom.logic.processUpdateMessage(maskUpdate);
    }

    public addFurnitureFloorByTypeId(
        objectId: number,
        typeId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData?: IObjectData,
        extra: number = NaN,
        expires: number = -1,
        usagePolicy: number = 0,
        ownerId: number = 0,
        ownerName: string = '',
        synchronized: boolean = true,
        realRoomObject: boolean = true,
        sizeZ: number = -1,
    ): boolean {
        return this.addFurnitureFloorByTypeName(
            objectId,
            GetRoomContentLoader().getFurnitureFloorNameForTypeId(typeId),
            location,
            direction,
            state,
            objectData,
            extra,
            expires,
            usagePolicy,
            ownerId,
            ownerName,
            synchronized,
            realRoomObject,
            sizeZ,
            typeId,
        );
    }

    public addFurnitureFloorByTypeName(
        objectId: number,
        typeName: string,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData?: IObjectData,
        extra: number = NaN,
        expires: number = -1,
        usagePolicy: number = 0,
        ownerId: number = 0,
        ownerName: string = '',
        synchronized: boolean = true,
        realRoomObject: boolean = true,
        sizeZ: number = -1,
        typeId: number = -1,
    ): boolean {
        const roomObject = this.createRoomObjectFloor(objectId, typeName);

        if (roomObject) {
            roomObject.model.setValue(
                RoomObjectVariableEnum.FurnitureColor,
                GetRoomContentLoader().getFurnitureFloorColorIndex(typeId),
            );
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureTypeId, typeId);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAdUrl, '');
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureRealRoomObject, realRoomObject ? 1 : 0);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, expires);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpirtyTimestamp, GetTickerTime());
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureUsagePolicy, usagePolicy);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerId, ownerId);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerName, ownerName);
        }

        if (!this.updateRoomObjectFloor(objectId, location, direction, state, objectData, extra)) return false;

        if (sizeZ >= 0) {
            if (!this.updateRoomObjectFloorHeight(objectId, sizeZ)) return false;
        }

        this.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, objectId, RoomObjectCategoryEnum.Floor),
        );

        return true;
    }

    public addFurnitureWallByTypeId(
        objectId: number,
        typeId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        extra?: number,
        expires: number = -1,
        usagePolicy: number = 0,
        ownerId: number = 0,
        ownerName: string = '',
        synchronized: boolean = true,
        realRoomObject: boolean = true,
        sizeZ: number = -1,
    ): boolean {
        return this.addFurnitureWallByTypeName(
            objectId,
            GetRoomContentLoader().getFurnitureWallNameForTypeId(typeId, extra),
            location,
            direction,
            state,
            extra,
            expires,
            usagePolicy,
            ownerId,
            ownerName,
            synchronized,
            realRoomObject,
            sizeZ,
            typeId
        );
    }

    public addFurnitureWallByTypeName(
        objectId: number,
        typeName: string,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        extra?: number,
        expires: number = -1,
        usagePolicy: number = 0,
        ownerId: number = 0,
        ownerName: string = '',
        synchronized: boolean = true,
        realRoomObject: boolean = true,
        sizeZ: number = -1,
        typeId: number = -1
    ): boolean {
        const objectData = new LegacyDataType();

        objectData.setString((extra ?? 0).toString());

        if (objectData) extra = parseInt(objectData.getLegacyString());

        const roomObject = this.createRoomObjectWall(objectId, typeName);

        if (roomObject) {
            roomObject.model.setValue(
                RoomObjectVariableEnum.FurnitureColor,
                GetRoomContentLoader().getFurnitureWallColorIndex(typeId),
            );
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureTypeId, typeId);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAdUrl, '');
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureRealRoomObject, realRoomObject ? 1 : 0);
            roomObject.model.setValue(RoomObjectVariableEnum.ObjectAccurateZValue, 1);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, expires);
            roomObject.model.setValue(RoomObjectVariableEnum.FigureExperienceTimestamp, GetTickerTime());
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureUsagePolicy, usagePolicy);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerId, ownerId);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerName, ownerName);
        }

        if (!this.updateRoomObjectWall(objectId, location, direction, state, objectData, extra)) return false;

        this.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, objectId, RoomObjectCategoryEnum.Wall),
        );

        return true;
    }

    public addRoomObjectUser(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        headDirection: number,
        type: RoomObjectUserType,
        figure: string,
    ): boolean {
        const existing = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (existing) return false;

        let objectType = RoomObjectUserTypeUtils.getAvatarTypeName(type);

        if (objectType === RoomObjectUserTypeName.Pet) objectType = this.getPetType(figure);

        if (!objectType) return false;

        const roomObject = (this.createRoomObjectUser(objectId, objectType)) as IRoomObjectController;

        if (!roomObject) return false;

        roomObject.processUpdateMessage(
            new ObjectAvatarUpdateMessage(
                this.fixedUserLocation(location),
                undefined,
                direction,
                headDirection,
                false,
                0,
            ),
        );

        if (figure) roomObject.processUpdateMessage(new ObjectAvatarFigureUpdateMessage(figure));

        this.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, objectId, RoomObjectCategoryEnum.Unit),
        );

        return true;
    }

    public removeRoomObjectFloor(objectId: number, isOwner: boolean = false): void {
        if (isOwner && !FurniId.isBuilderClubId(objectId)) {
            const roomObject = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

            if (roomObject) {
                const screenLocation = this.getRoomObjectScreenLocation(objectId, RoomObjectCategoryEnum.Floor);

                if (screenLocation) {
                    const disabledPickingAnimation =
                        roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureDisablePickingAnimation) ===
                        1;

                    if (!disabledPickingAnimation) {
                        const typeId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId);
                        const extras = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureExtras);
                        const dataKey = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureDataFormat);
                        const objectData = GetObjectDataForFlags(dataKey);
                        /* const icon = this.getFurnitureFloorIcon(typeId, null, extras, objectData).data;

                        if (icon) {
                            (async () => {
                                const image = await TextureUtils.generateImage(icon);
                                const event = new NitroToolbarAnimateIconEvent(
                                    image,
                                    screenLocation.x,
                                    screenLocation.y,
                                );

                                event.iconName = ToolbarIconEnum.INVENTORY;

                                EventStore.getState().emit(event);
                            })();
                        } */
                    }
                }
            }
        }

        this.removeRoomObject(objectId, RoomObjectCategoryEnum.Floor);
    }

    public removeRoomObjectWall(objectId: number, isOwner: boolean = false): void {
        if (isOwner && !FurniId.isBuilderClubId(objectId)) {
            const roomObject = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

            if (
                roomObject &&
                roomObject.type.indexOf('post_it') === -1 &&
                roomObject.type.indexOf('external_image_wallitem') === -1
            ) {
                const screenLocation = this.getRoomObjectScreenLocation(objectId, RoomObjectCategoryEnum.Wall);

                if (screenLocation) {
                    const typeId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId);
                    const objectData = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureData);
                    /* const icon = this.getFurnitureWallIcon(typeId, null, objectData).data;

                    if (icon)
                    {
                        (async () =>
                        {
                            const image = await TextureUtils.generateImage(icon);

                            const event = new NitroToolbarAnimateIconEvent(image, screenLocation.x, screenLocation.y);

                            event.iconName = ToolbarIconEnum.INVENTORY;

                            EventStore.getState().emit(event);
                        })();
                    } */
                }
            }
        }

        this.removeRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        this.updateRoomObjectMask(objectId, false);
    }

    public getRoomObjectScreenLocation(objectId: number, category: RoomObjectCategoryEnum): PointData | undefined {
        const canvas = this._instance?.canvas;
        const roomObject = this.getRoomObject(objectId, category);

        if (!canvas || !roomObject) return undefined;

        const screenPoint = canvas.geometry.getScreenPoint(roomObject.getLocation());

        screenPoint.x = screenPoint.x * canvas.scale;
        screenPoint.y = screenPoint.y * canvas.scale;

        screenPoint.x += canvas.width / 2 + canvas.screenOffsetX;
        screenPoint.y += canvas.height / 2 + canvas.screenOffsetY;

        screenPoint.x = Math.round(screenPoint.x);
        screenPoint.y = Math.round(screenPoint.y);

        return screenPoint;
    }

    public async getRoomObjectImage(objectId: number, category: RoomObjectCategoryEnum, direction: IVector3D, scale: RoomGeometryScaleType): Promise<ImageLike | undefined> {
        let id = -1;
        let type: string = '';
        let value: string = '';
        let data: IObjectData | undefined = undefined;
        let extras: number | undefined = undefined;

        const roomObject = this.getRoomObject(objectId, category);

        if (roomObject) {
            id = roomObject.id;
            type = roomObject.type;

            switch (category) {
                case RoomObjectCategoryEnum.Floor:
                case RoomObjectCategoryEnum.Wall: {
                    value = (roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureColor).toString());
                    extras = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureExtras);

                    const dataFormat = roomObject.model.getValue<ObjectDataFlagsEnum>(RoomObjectVariableEnum.FurnitureDataFormat);

                    if (dataFormat !== ObjectDataFlagsEnum.Legacy) {
                        data = GetObjectDataForFlags(dataFormat);

                        if (data) data.initializeFromRoomObjectModel(roomObject.model);
                    }

                    break;
                }
                case RoomObjectCategoryEnum.Unit: {
                    value = roomObject.model.getValue<string>(RoomObjectVariableEnum.Figure);
                    break;
                }
            }
        }

        return await GetRoomEngine().getGenericRoomObjectImage(type, value, direction, scale, extras, data);
    }

    public async getRoomObjectPetImage(typeId: number, paletteId: number, color: number, direction: IVector3D, scale: RoomGeometryScaleType, headOnly: boolean = false, customParts: IPetCustomPart[] = [], posture: string | undefined = undefined): Promise<ImageLike | undefined> {
        const type = GetRoomContentLoader().getPetNameForType(typeId);

        if (!type) return undefined;

        let value = `${typeId} ${paletteId} ${color.toString(16)}`;

        if (headOnly) value = `${value} head`;

        if (customParts) {
            value = `${value} ${customParts.length}`;

            for (const part of customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;
        }

        return await GetRoomEngine().getGenericRoomObjectImage(type, value, direction, scale, 0, undefined, 0, 0, posture);
    }

    public async setRoomOverlayIconSprite(objectId: number, category: RoomObjectCategoryEnum, realRoomObject: boolean, extra: string = '', posture: string = ''): Promise<void> {
        const roomContentLoader = GetRoomContentLoader();
        let type: string | undefined = undefined;
        let colorIndex = 0;

        let image: ImageLike | undefined = undefined;

        if (realRoomObject) {
            image = await this.getRoomObjectImage(objectId, category, new Vector3d(), RoomGeometryScaleType.Icon);
        } else {
            if (category === RoomObjectCategoryEnum.Floor) {
                type = roomContentLoader.getFurnitureFloorNameForTypeId(objectId);
                colorIndex = roomContentLoader.getFurnitureFloorColorIndex(objectId);
            } else if (category === RoomObjectCategoryEnum.Wall) {
                type = roomContentLoader.getFurnitureWallNameForTypeId(objectId);
                colorIndex = roomContentLoader.getFurnitureWallColorIndex(objectId);
            }

            if (category === RoomObjectCategoryEnum.Unit) {
                type = RoomObjectUserTypeUtils.getAvatarTypeName(objectId);

                if (type === RoomObjectUserTypeName.Pet) {
                    type = this.getPetType(extra);

                    const petFigureData = new PetFigureData(extra);

                    image = await this.getRoomObjectPetImage(petFigureData.typeId, petFigureData.paletteId, petFigureData.color, new Vector3d(180), RoomGeometryScaleType.ZoomedIn, true, petFigureData.customParts, posture);
                } else {
                    image = await GetRoomEngine().getGenericRoomObjectImage(type!, extra, new Vector3d(180), RoomGeometryScaleType.ZoomedIn, 0, undefined, 0, 0, posture);
                }
            } else {
                image = await GetRoomEngine().getGenericRoomObjectImage(type!, colorIndex.toString(), new Vector3d(), RoomGeometryScaleType.Icon, 0, undefined, 0, 0, posture);
            }
        }

        if (!image) return;

        this.removeRoomOverlayIconSprite();
        this.addRoomOverlayIconSprite(image, Room.OVERLAY_ICON_SPRITE);
    }

    public setRoomOverlayIconSpriteVisibility(flag: boolean): void {
        const sprite = this.getRoomOverlayIconSprite();

        if (!sprite) return;

        sprite.visible = flag;
    }

    public removeRoomOverlayIconSprite(): void {
        const sprite = this.getRoomOverlayIconSprite();

        if (!sprite) return;

        sprite.parent?.removeChild(sprite);
    }

    public getRoomValue<T>(key: RoomObjectVariableEnum): T {
        return this._instance?.model.getValue(key);
    }

    public getRoomObjectRoom(): IRoomObjectController {
        return this.getRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);
    }

    public getRoomObjectCursor(): IRoomObjectController {
        return this.getRoomObject(Room.CURSOR_OBJECT_ID, RoomObjectCategoryEnum.Cursor);
    }

    public getRoomObjectSelectionArrow(): IRoomObjectController {
        return this.getRoomObject(Room.ARROW_OBJECT_ID, RoomObjectCategoryEnum.Cursor);
    }

    public getRoomOverlay(): Container | undefined {
        return this._instance.canvas?.master?.getChildByLabel(Room.OVERLAY) ?? undefined;
    }

    public getRoomOverlayIconSprite(): Container | undefined {
        return this.getRoomOverlay()?.getChildByLabel(Room.OVERLAY_ICON_SPRITE) ?? undefined;
    }

    public dispatchEvent(event: INitroEvent): void {
        this._eventDispatcher.dispatchEvent(event);
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get modelName(): string {
        return this._modelName;
    }

    public get instance(): IRoomInstance {
        return this._instance;
    }

    public get eventDispatcher(): IEventDispatcher {
        return this._eventDispatcher;
    }

    public get eventHandler(): IRoomEventHandler {
        return this._eventHandler;
    }

    public get areaSelection(): IRoomAreaSelectionManager {
        return this._areaSelection;
    }

    public get isAreaSelectionMode(): boolean {
        return this._areaSelection.areaSelectionState !== RoomAreaSelectionManager.NOT_ACTIVE;
    }

    private getPetTypeId(figure: string): number {
        let type = -1;

        if (figure) {
            const parts = figure.split(' ');

            if (parts.length > 1) type = parseInt(parts[0]);
        }

        return type;
    }

    private getPetType(type: string): string | undefined {
        if (type) {
            const parts = type.split(' ');

            if (parts.length > 1) {
                const typeId = parseInt(parts[0]);

                return GetRoomContentLoader().getPetNameForType(typeId);
            }
        }

        return undefined;
    }

    private fixedUserLocation(location: IVector3D): IVector3D | undefined {
        if (!location) return undefined;

        let z = location.z;
        const tileHeight = 0;
        // TODO FIX const tileHeight = this._instance.furnitureStackingHeightMap.getTileHeight(location.x, location.y);
        const wallHeight = this._instance.legacyGeometry.getHeight(location.x, location.y);

        if (Math.abs(z - tileHeight) < 0.1 && Math.abs(tileHeight - wallHeight) < 0.1) {
            z = this._instance.legacyGeometry.getFloorAltitude(location.x, location.y);
        }

        return new Vector3d(location.x, location.y, z);
    }

    private addRoomOverlayIconSprite(image: ImageLike | undefined, label: string): void {
        if (!image) return;

        let sprite = this.getRoomOverlayIconSprite();

        if (sprite) return;

        const texture = Texture.from(image);

        sprite = new Sprite(texture);

        sprite.label = label;

        sprite.scale.set(1);

        this.getRoomOverlay()?.addChild(sprite);
    }
}
