import type {
    IGraphicAssetCollection,
    IObjectData,
    IRoom,
    IRoomAreaSelectionManager,
    IRoomEventHandler,
    IRoomGeometry,
    IRoomInstance,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    IRoomObjectEvent,
    IRoomObjectLogicFactory,
    IRoomRenderingCanvas,
    IRoomSpriteMouseEvent,
    IVector3D
} from '@nitrodevco/nitro-api';
import {
    GetObjectDataForFlags,
    LegacyDataType,
    RoomObjectCategoryEnum,
    RoomObjectUserType,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import {
    GetConfigValue,
    RoomEngineObjectEvent,
    RoomObjectEvent,
    RoomSpriteMouseEvent,
    SessionStore
} from '@nitrodevco/nitro-shared';
import type { PointData } from 'pixi.js';
import { Rectangle } from 'pixi.js';

import { FurniId, GetTickerTime } from '../utils';
import { GetRoomContentLoader } from './GetRoomContentLoader';
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
import { RoomObjectLogicFactory } from './RoomObjectLogicFactory';
import { RoomAreaSelectionManager, RoomEnterEffect, type RoomFurnitureData } from './utils';

export class Room implements IRoom {
    public static ROOM_OBJECT_ID: number = -1;
    public static ROOM_OBJECT_TYPE: string = 'room';
    public static CURSOR_OBJECT_ID: number = -2;
    public static CURSOR_OBJECT_TYPE: string = 'tile_cursor';
    public static ARROW_OBJECT_ID: number = -3;
    public static ARROW_OBJECT_TYPE: string = 'selection_arrow';
    public static OVERLAY: string = 'overlay';
    public static OBJECT_ICON_SPRITE: string = 'object_icon_sprite';

    private _roomId: number;
    private _instance: IRoomInstance;
    private _eventHandler: IRoomEventHandler;
    private _logicFactory: IRoomObjectLogicFactory;

    private _modelName: string;

    private _floorStack: Map<number, RoomFurnitureData> = new Map();
    private _wallStack: Map<number, RoomFurnitureData> = new Map();

    private _areaSelection: IRoomAreaSelectionManager;
    private _roomObjectEventHandler: ((event: RoomObjectEvent) => void) | undefined = undefined;
    private _roomCanvasMouseHandler: ((event: RoomSpriteMouseEvent, object: IRoomObject) => void) | undefined = undefined;

    constructor(roomId: number, instance: IRoomInstance) {
        this._roomId = roomId;
        this._instance = instance;
        this._eventHandler = new RoomEventHandler(this);
        this._logicFactory = new RoomObjectLogicFactory(this);
        this._areaSelection = new RoomAreaSelectionManager(this);
    }

    public async prepareRoom(): Promise<boolean> {
        this._instance.model.setValue(RoomObjectVariableEnum.RoomIsPublic, 0);
        this._instance.model.setValue(RoomObjectVariableEnum.RoomZScale, 1);

        await this.createRoomObjectAndInitalize(
            Room.CURSOR_OBJECT_ID,
            Room.CURSOR_OBJECT_TYPE,
            RoomObjectCategoryEnum.Cursor,
        );

        if (GetConfigValue('renderer.avatarArrowEnabled', false))
            await this.createRoomObjectAndInitalize(
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
            canvas.geometry.z_scale = this.getRoomValue(RoomObjectVariableEnum.RoomZScale);

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

        return canvas;
    }

    public async applyRoomMap(roomMap: IRoomMapData): Promise<void> {
        if (!roomMap) return;

        let roomObject = this._instance.getRoomObject(
            Room.ROOM_OBJECT_ID,
            RoomObjectCategoryEnum.Room,
        ) as IRoomObjectController;

        if (roomObject) this._instance.removeRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);

        if (!roomObject)
            roomObject = (await this.createRoomObjectAndInitalize(
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
        const landscapeType = '1';

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

        //EventStore.getState().emit(new RoomDragEvent(roomId, -(this._instance.canvas.screenOffsetX - x), -(this._instance.canvas.screenOffsetY - y)));

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

        this._eventHandler.eventDispatcher.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.REMOVED, this._roomId, objectId, category),
        );
    }

    public async createRoomObjectAndInitalize(
        objectId: number,
        type: string,
        category: RoomObjectCategoryEnum,
    ): Promise<IRoomObject | undefined> {
        let visualizationType = type;
        let logicType = type;
        let assetName = type;
        let asset: IGraphicAssetCollection | undefined = undefined;
        let isLoading = false;

        if (GetRoomContentLoader().isLoaderType(type)) {
            asset = GetRoomContentLoader().getCollection(type);

            if (!asset) {
                isLoading = true;

                if (!(await GetRoomContentLoader().downloadAsset(type)))
                    assetName = GetRoomContentLoader().getPlaceholderName(type);

                isLoading = false;
            }

            asset = GetRoomContentLoader().getCollection(assetName);

            if (asset) {
                visualizationType = asset.data.visualizationType;
                logicType = asset.data.logicType;
            }
        }

        if (asset) {
            const visualization = GetRoomObjectVisualizationFactory().getVisualization(visualizationType);
            const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
                assetName,
                visualizationType,
                asset.data,
            );

            if (visualization) {
                visualization.asset = asset;

                if (!visualizationData || !visualization.initialize(visualizationData)) return undefined;

                const object = this._instance.createRoomObject(objectId, 1, type, category) as IRoomObjectController;

                if (object) {
                    object.setVisualization(visualization);

                    const logic = this._logicFactory.getLogic(logicType);

                    if (logic) {
                        logic.eventHandler = this._eventHandler;

                        object.setLogic(logic);
                        object.logic.initialize(asset.data);
                    }

                    if (!isLoading) object.isReady = true;

                    object.model.setValue(RoomObjectVariableEnum.ObjectRoomId, this._roomId);

                    return object;
                }
            }
        }

        return undefined;
    }

    public async createRoomObjectFloor(id: number, type: string): Promise<IRoomObject | undefined> {
        return this.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Floor);
    }

    public async createRoomObjectWall(id: number, type: string): Promise<IRoomObject | undefined> {
        return this.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Wall);
    }

    public async createRoomObjectUser(id: number, type: string): Promise<IRoomObject | undefined> {
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
            if (roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureUsesPlaneMask) > 0) {
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

    public async addFurnitureByTypeId(
        id: number,
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
    ): Promise<boolean> {
        return this.addFurnitureFloorByTypeName(
            id,
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

    public async addFurnitureFloorByTypeName(
        id: number,
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
    ): Promise<boolean> {
        const roomObject = await this.createRoomObjectFloor(id, typeName);

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

        if (!this.updateRoomObjectFloor(id, location, direction, state, objectData, extra)) return false;

        if (sizeZ >= 0) {
            if (!this.updateRoomObjectFloorHeight(id, sizeZ)) return false;
        }

        this._eventHandler.eventDispatcher.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, id, RoomObjectCategoryEnum.Floor),
        );

        const selectedRoomObjectData = this._instance.placedObject;

        if (
            selectedRoomObjectData &&
            selectedRoomObjectData.id === id &&
            selectedRoomObjectData.category === RoomObjectCategoryEnum.Floor
        ) {
            // TODO this._eventHandler.setSelectedObject(id, RoomObjectCategoryEnum.Floor);
        }

        if (roomObject?.isReady && synchronized) this._instance.tileObjectMap.addRoomObject(roomObject);

        return true;
    }

    public async addFurnitureWallByTypeId(
        id: number,
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
    ): Promise<boolean> {
        const objectData = new LegacyDataType();

        objectData.setString((extra ?? 0).toString());

        if (objectData) extra = parseInt(objectData.getLegacyString());

        const type = GetRoomContentLoader().getFurnitureWallNameForTypeId(typeId, extra);

        const roomObject = await this.createRoomObjectWall(id, type);

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

        if (!this.updateRoomObjectWall(id, location, direction, state, objectData, extra)) return false;

        this._eventHandler.eventDispatcher.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, id, RoomObjectCategoryEnum.Wall),
        );

        const selectedRoomObjectData = this._instance.placedObject;

        if (
            selectedRoomObjectData &&
            Math.abs(selectedRoomObjectData.id) === id &&
            selectedRoomObjectData.category === RoomObjectCategoryEnum.Wall
        ) {
            // TODO this._eventHandler.setSelectedObject(id, RoomObjectCategoryEnum.Wall);
        }

        return true;
    }

    public async addRoomObjectUser(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        headDirection: number,
        type: number,
        figure: string,
    ): Promise<boolean> {
        const existing = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (existing) return false;

        let objectType = RoomObjectUserType.getTypeString(type);

        if (objectType === RoomObjectUserType.PET) objectType = this.getPetType(figure) ?? '';

        const roomObject = (await this.createRoomObjectUser(objectId, objectType)) as IRoomObjectController;

        if (!roomObject || !roomObject.logic) return false;

        //object.model.setValue(RoomObjectVariable.FIGURE_HIGHLIGHT_ENABLE, 1);

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

        this._eventHandler.eventDispatcher.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, objectId, RoomObjectCategoryEnum.Unit),
        );

        return true;
    }

    public removeRoomObjectFloor(objectId: number, userId: number = -1, _arg_4: boolean = false): void {
        if (SessionStore.getState().userId === userId && !FurniId.isBuilderClubId(objectId)) {
            const roomObject = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

            if (roomObject) {
                const screenLocation = this.getRoomObjectScreenLocation(objectId, RoomObjectCategoryEnum.Floor);

                if (screenLocation) {
                    const disabledPickingAnimation =
                        roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureDisablePickingAnimation) ===
                        1;

                    if (!disabledPickingAnimation) {
                        const typeId = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId);
                        const extras = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureExtras);
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

        if (_arg_4)
            this._instance.tileObjectMap?.populate(
                this._instance.getRoomObjectsForCategory(RoomObjectCategoryEnum.Floor),
            );
    }

    public removeRoomObjectWall(objectId: number, userId: number = -1): void {
        if (SessionStore.getState().userId === userId && !FurniId.isBuilderClubId(objectId)) {
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

    public setRoomObjectEventHandler(handler: ((event: IRoomObjectEvent) => void) | undefined): void {
        this._roomObjectEventHandler = handler;
    }

    public setRoomCanvasMouseHandler(handler: ((event: IRoomSpriteMouseEvent, object: IRoomObject) => void) | undefined): void {
        this._roomCanvasMouseHandler = handler;
    }

    public handleRoomObjectEvent(event: RoomObjectEvent): void {
        if (!event || !this._roomObjectEventHandler) return;

        this._roomObjectEventHandler(event);
    }

    public handleRoomCanvasMouseEvent(event: RoomSpriteMouseEvent, object: IRoomObject): void {
        if (!event || !object || RoomEnterEffect.isRunning() || !this._roomCanvasMouseHandler) return;

        this._roomCanvasMouseHandler(event, object);
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

    public isPlayingGame(): boolean {
        return this.getRoomValue<number>(RoomObjectVariableEnum.IsPlayingGame) > 0;
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

    public get eventHandler(): IRoomEventHandler {
        return this._eventHandler;
    }

    public get logicFactory(): IRoomObjectLogicFactory {
        return this._logicFactory;
    }

    public get areaSelection(): IRoomAreaSelectionManager {
        return this._areaSelection;
    }

    public get isAreaSelectionMode(): boolean {
        return this._areaSelection.areaSelectionState !== RoomAreaSelectionManager.NOT_ACTIVE;
    }

    public get isDecorating(): boolean {
        return false;
    }

    public get useOffsetScrolling(): boolean {
        return true;
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
        const tileHeight = this._instance.furnitureStackingHeightMap.getTileHeight(location.x, location.y);
        const wallHeight = this._instance.legacyGeometry.getHeight(location.x, location.y);

        if (Math.abs(z - tileHeight) < 0.1 && Math.abs(tileHeight - wallHeight) < 0.1) {
            z = this._instance.legacyGeometry.getFloorAltitude(location.x, location.y);
        }

        return new Vector3d(location.x, location.y, z);
    }
}
