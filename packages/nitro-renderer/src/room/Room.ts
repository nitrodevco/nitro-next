
import type {
    IEventDispatcher,
    IGraphicAssetCollection,
    ILegacyWallGeometry,
    INitroEvent,
    IObjectData,
    IPetCustomPart,
    IRoom,
    IRoomAreaSelectionManager,
    IRoomEventHandler,
    IRoomGeometry,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    IRoomObjectManager,
    IRoomObjectModel,
    IRoomRenderingCanvas,
    IVector3D, RoomObjectUserType,
    RoomThicknessType
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
    ObjectDataFlagsEnum,
    RoomObjectCategoryEnum,
    RoomObjectUserTypeUtils,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import {
    EventDispatcher,
    GetConfigValue,
    RoomContentLoadedEvent,
    RoomEngineEvent,
    RoomEngineObjectEvent,
    RoomToObjectOwnAvatarMoveEvent
} from '@nitrodevco/nitro-shared';
import type { ImageLike, Rectangle } from 'pixi.js';
import { Container, Texture } from 'pixi.js';
import { type PointData, Sprite } from 'pixi.js';

import { PetFigureData } from '../session';
import { FurniId, GetTickerTime } from '../utils';
import { GetRoomObjectLogicFactory, GetRoomObjectVisualizationFactory } from './factories';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomEngine } from './GetRoomEngine';
import type {
    ObjectStateUpdateMessage
} from './messages';
import {
    ObjectAvatarCarryObjectUpdateMessage,
    ObjectAvatarChatUpdateMessage,
    ObjectAvatarDanceUpdateMessage,
    ObjectAvatarDirectionUpdateMessage,
    ObjectAvatarEffectUpdateMessage,
    ObjectAvatarExperienceUpdateMessage,
    ObjectAvatarExpressionUpdateMessage,
    ObjectAvatarFigureUpdateMessage,
    ObjectAvatarFlatControlUpdateMessage,
    ObjectAvatarGestureUpdateMessage,
    ObjectAvatarGuideStatusUpdateMessage,
    ObjectAvatarMutedUpdateMessage,
    ObjectAvatarOwnMessage,
    ObjectAvatarPetGestureUpdateMessage,
    ObjectAvatarPlayerValueUpdateMessage,
    ObjectAvatarPlayingGameUpdateMessage,
    ObjectAvatarPostureUpdateMessage,
    ObjectAvatarSignUpdateMessage,
    ObjectAvatarSleepUpdateMessage,
    ObjectAvatarTypingUpdateMessage,
    ObjectAvatarUpdateMessage,
    ObjectAvatarUseObjectUpdateMessage,
    ObjectDataUpdateMessage,
    ObjectHeightUpdateMessage,
    ObjectItemDataUpdateMessage,
    ObjectRoomMaskUpdateMessage,
    ObjectRoomPlanePropertyUpdateMessage,
    ObjectRoomPlaneVisibilityUpdateMessage,
    ObjectRoomUpdateMessage,
    RoomObjectUpdateMessage,
} from './messages';
import { RoomLogic, RoomObjectManager, RoomObjectModel } from './object';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomSpriteCanvas } from './RoomSpriteCanvas';
import { RoomAreaSelectionManager } from './utils';

export class Room implements IRoom {
    public static ROOM_OBJECT_ID: number = -1;
    public static ROOM_OBJECT_TYPE: string = 'room' as const;
    public static CURSOR_OBJECT_ID: number = -2;
    public static CURSOR_OBJECT_TYPE: string = 'tile_cursor' as const;
    public static ARROW_OBJECT_ID: number = -3;
    public static ARROW_OBJECT_TYPE: string = 'selection_arrow' as const;
    public static OVERLAY: string = 'overlay' as const;
    public static OVERLAY_ICON_SPRITE: string = 'overlay_icon_sprite' as const;

    private _roomId: number;
    private _disposed: boolean = false;
    private _eventDispatcher: IEventDispatcher;
    private _eventHandler: IRoomEventHandler;
    private _model: IRoomObjectModel = new RoomObjectModel();
    private _objects: Map<number, IRoomObject> = new Map();
    private _objectManagers: Map<RoomObjectCategoryEnum, IRoomObjectManager> = new Map();
    private _pendingContentTypes: string[] = [];
    private _updateCategories: RoomObjectCategoryEnum[] = [
        RoomObjectCategoryEnum.Floor,
        RoomObjectCategoryEnum.Wall,
        RoomObjectCategoryEnum.Unit,
        RoomObjectCategoryEnum.Cursor,
        RoomObjectCategoryEnum.Room,
    ];
    private _skipContentProcessingForNextFrame: boolean = false;
    private _legacyGeometry: ILegacyWallGeometry | undefined = undefined;
    private _canvas: IRoomRenderingCanvas | undefined = undefined;
    private _areaSelection: IRoomAreaSelectionManager;

    constructor(roomId: number) {
        this._roomId = roomId;
        this._eventDispatcher = new EventDispatcher();
        this._eventHandler = new RoomEventHandler(this);
        this._areaSelection = new RoomAreaSelectionManager(this);

        this._eventDispatcher.addEventListener<RoomContentLoadedEvent>(RoomContentLoadedEvent.RCLE_SUCCESS, event => this.onRoomContentLoadedEvent(event));
        this._eventDispatcher.addEventListener<RoomContentLoadedEvent>(RoomContentLoadedEvent.RCLE_FAILURE, event => this.onRoomContentLoadedEvent(event));
        this._eventDispatcher.addEventListener<RoomContentLoadedEvent>(RoomContentLoadedEvent.RCLE_CANCEL, event => this.onRoomContentLoadedEvent(event));
    }

    public dispose(): void {
        this.removeAllRoomObjectManagers();

        if (this._canvas) {
            this._canvas.dispose();

            this._canvas = undefined;
        }

        this._model.dispose();

        this._disposed = true;

        this.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.DISPOSED, this._roomId));
    }

    public getRoomCanvas(width: number, height: number, scale: RoomGeometryScaleType): IRoomRenderingCanvas {
        if (this._canvas) {
            this._canvas.initialize(width, height);

            if (this._canvas.geometry) this._canvas.geometry.scale = scale;
        } else {
            this._canvas = new RoomSpriteCanvas(this, width, height, scale);
        }

        if (this._canvas.geometry) {
            this._canvas.geometry.zScale = this.getRoomValue(RoomObjectVariableEnum.RoomZScale);

            const doorX = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorX);
            const doorY = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorY);
            const doorZ = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorZ);
            const doorDirection = this.getRoomValue<number>(RoomObjectVariableEnum.RoomDoorDir);
            const vector = new Vector3d(doorX, doorY, doorZ);

            let direction: IVector3D | undefined = undefined;

            if (doorDirection === 90) direction = new Vector3d(-2000, 0, 0);

            if (doorDirection === 180) direction = new Vector3d(0, -2000, 0);

            if (direction) this._canvas.geometry.setDisplacement(vector, direction);
        }

        let overlay = this.getRoomOverlay();

        if (!overlay) {
            overlay = new Container();

            overlay.label = Room.OVERLAY;
            overlay.interactive = false;

            this._canvas.master?.addChild(overlay);
        }

        return this._canvas;
    }

    public resizeRoomCanvas(width: number, height: number, scale: RoomGeometryScaleType): void {
        if (!this._canvas) return;

        this._canvas.initialize(width, height);

        if (this._canvas.geometry) this._canvas.geometry.scale = scale;
    }

    public applyRoomMap(roomMap: IRoomMapData): void {
        if (!roomMap) return;

        const floorType = '111';
        const wallType = '201';
        const landscapeType = '1';

        this.removeRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);

        const roomObject = (this.createRoomObjectAndInitalize(
            Room.ROOM_OBJECT_ID,
            Room.ROOM_OBJECT_TYPE,
            RoomObjectCategoryEnum.Room,
        )) as IRoomObjectController;

        if (!roomObject || !(roomObject.logic instanceof RoomLogic)) return;

        this.setRoomValue(RoomObjectVariableEnum.RoomIsPublic, 0);
        this.setRoomValue(RoomObjectVariableEnum.RoomZScale, 1);

        const dimensions = roomMap.dimensions;

        if (dimensions) {
            const minX = roomMap.dimensions.minX;
            const maxX = roomMap.dimensions.maxX;
            const minY = roomMap.dimensions.minY;
            const maxY = roomMap.dimensions.maxY;

            this.setRoomValue(RoomObjectVariableEnum.RoomMinX, minX);
            this.setRoomValue(RoomObjectVariableEnum.RoomMaxX, maxX);
            this.setRoomValue(RoomObjectVariableEnum.RoomMinY, minY);
            this.setRoomValue(RoomObjectVariableEnum.RoomMaxY, maxY);

            const seed = Math.trunc(minX * 423 + maxX * 671 + minY * 913 + maxY * 7509);

            roomObject.model.setValue(RoomObjectVariableEnum.RoomRandomSeed, seed);
        }

        roomObject.logic.initialize(roomMap);

        if (floorType) {
            roomObject.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE, floorType),
            );
            this.setRoomValue(RoomObjectVariableEnum.RoomFloorType, floorType);
        }

        if (wallType) {
            roomObject.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_WALL_UPDATE, wallType),
            );
            this.setRoomValue(RoomObjectVariableEnum.RoomWallType, wallType);
        }

        if (landscapeType) {
            roomObject.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE, landscapeType),
            );
            this.setRoomValue(RoomObjectVariableEnum.RoomLandscapeType, landscapeType);
        }

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
                            this.setRoomValue(RoomObjectVariableEnum.RoomDoorX, doorX - 0.5);
                            this.setRoomValue(RoomObjectVariableEnum.RoomDoorY, doorY);
                        }

                        if (doorDir === 180) {
                            this.setRoomValue(RoomObjectVariableEnum.RoomDoorX, doorX);
                            this.setRoomValue(RoomObjectVariableEnum.RoomDoorY, doorY - 0.5);
                        }

                        this.setRoomValue(RoomObjectVariableEnum.RoomDoorZ, doorZ);
                        this.setRoomValue(RoomObjectVariableEnum.RoomDoorDir, doorDir);
                    }
                }

                doorIndex++;
            }
        }

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

        // TODO update area hide

        this.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.INITIALIZED, this._roomId));
    }

    public update(time: number, update: boolean = false): void {
        if (this._disposed) return;

        this.processPendingContentTypes();

        for (const category of this._updateCategories) {
            const objects = this.getRoomObjectManager(category)?.objects;

            if (!objects || !objects.length) continue;

            for (const object of objects.getValues()) object?.logic?.update(time);
        }

        this._canvas?.render(time, update);
        this._canvas?.update();
    }

    public getRoomObjectBoundingRectangle(objectId: number, category: RoomObjectCategoryEnum): Rectangle | undefined {
        const roomObject = this.getRoomObject(objectId, category);
        const rectangle = roomObject?.visualization?.getBoundingRectangle();

        if (!roomObject || !rectangle) return undefined;

        const canvas = this._canvas;
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
        if (!this._canvas || !point) return false;

        const x = ~~(point.x);
        const y = ~~(point.y);

        if ((this._canvas.screenOffsetX === x) && (this._canvas.screenOffsetY === y)) return false;

        this._canvas.screenOffsetX = x;
        this._canvas.screenOffsetY = y;

        return true;
    }

    public getRoomObjectManager(category: RoomObjectCategoryEnum): IRoomObjectManager {
        let manager = this._objectManagers.get(category);

        if (!manager) {
            manager = new RoomObjectManager();

            this._objectManagers.set(category, manager);
        }

        return manager;
    }

    public getTotalObjectsForManager(category: RoomObjectCategoryEnum): number {
        return this.getRoomObjectManager(category).totalObjects;
    }

    public getObjectInstanceId(object: IRoomObject): number {
        return object?.instanceId ?? -1;
    }

    public getRoomObject(objectId: number, category: RoomObjectCategoryEnum): IRoomObjectController | undefined {
        return this.getRoomObjectManager(category).getObject(objectId);
    }

    public getRoomObjectByIndex(index: number, category: RoomObjectCategoryEnum): IRoomObjectController | undefined {
        return this.getRoomObjectManager(category)?.getObjectByIndex(index);
    }

    public getRoomObjectByInstanceId(instanceId: number): IRoomObject | undefined {
        return this._objects.get(instanceId);
    }

    public getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[] {
        return this.getRoomObjectManager(category).objects.getValues() ?? [];
    }

    public getRoomObjectCategoryForType(type: string): RoomObjectCategoryEnum {
        return GetRoomContentLoader().getCategoryForType(type);
    }

    public hasUninitializedRoomObjects(): boolean {
        for (const manager of this._objectManagers.values()) {
            if (!manager) continue;

            for (const object of manager.objects.getValues()) {
                if (!object) continue;

                if (!object.isReady) return true;
            }
        }

        return false;
    }

    public removeAllRoomObjectManagers(): void {
        for (const manager of this._objectManagers.values()) {
            if (!manager) continue;

            for (const object of manager.objects.getValues()) {
                if (!object) continue;

                object.tearDown();

                this._objects.delete(object.instanceId);
                this._canvas?.removeFromCache(object.instanceId);
            }

            manager.dispose();
        }

        this._objectManagers.clear();
    }

    public removeRoomObject(objectId: number, category: RoomObjectCategoryEnum): void {
        const manager = this.getRoomObjectManager(category);

        if (!manager) return;

        const object = manager.getObject(objectId);

        if (!object) return;

        object.tearDown();

        this._objects.delete(object.instanceId);
        this._canvas?.removeFromCache(object.instanceId);

        manager.removeObject(objectId);

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
        let asset: IGraphicAssetCollection | undefined = undefined;
        let visualizationType = type;
        let logicType = type;
        let isLoading = false;

        if (GetRoomContentLoader().isLoaderType(type)) {
            asset = GetRoomContentLoader().getCollection(assetName);

            if (!asset) {
                isLoading = true;

                GetRoomContentLoader().downloadAsset(type, this._eventDispatcher);

                assetName = GetRoomContentLoader().getPlaceholderName(type);
                asset = GetRoomContentLoader().getCollection(assetName);

                if (!asset) return undefined;
            }

            if (asset.data.visualizationType) visualizationType = asset.data.visualizationType;
            if (asset.data.logicType) logicType = asset.data.logicType;
        }

        const visualization = GetRoomObjectVisualizationFactory().getVisualization(visualizationType);

        if (!visualization) return undefined;

        visualization.asset = asset;

        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
            assetName,
            visualizationType,
            asset?.data ?? undefined,
        );

        if (!visualizationData || !visualization.initialize(visualizationData)) return undefined;

        const object = this.getRoomObjectManager(category).createObject(objectId, 1, type);

        if (!object) return undefined;

        this._objects.set(this.getObjectInstanceId(object), object);

        object.setVisualization(visualization);

        const logic = GetRoomObjectLogicFactory().getLogic(logicType);

        if (logic) {
            logic.eventHandler = this._eventHandler;

            object.setLogic(logic);
            object.logic.initialize(asset?.data ?? undefined);
        }

        if (!isLoading) {
            this.objectInitialized(object.id, category);

            object.isReady = true;
        }

        return object;
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

        for (const [category, manager] of this._objectManagers.entries()) {
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
        data: string,
        expires: number = -1,
        usagePolicy: number = 0,
        ownerId: number = 0,
        ownerName: string = '',
        realRoomObject: boolean = true,
    ): boolean {
        const stuffData = new LegacyDataType();

        stuffData.setString(data);

        const typeName = GetRoomContentLoader().getFurnitureWallNameForTypeId(typeId, stuffData.getLegacyString());
        const roomObject = this.createRoomObjectWall(objectId, typeName);

        if (roomObject) {
            roomObject.model.setValue(
                RoomObjectVariableEnum.FurnitureColor,
                GetRoomContentLoader().getFurnitureWallColorIndex(typeId),
            );
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureTypeId, typeId);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAdUrl, '');
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureRealRoomObject, realRoomObject ? 1 : 0);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, expires);
            roomObject.model.setValue(RoomObjectVariableEnum.FigureExperienceTimestamp, GetTickerTime());
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureUsagePolicy, usagePolicy);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerId, ownerId);
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerName, ownerName);
        }

        if (!this.updateRoomObjectWall(objectId, location, direction, state, stuffData.getLegacyString())) return false;

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

    public updateRoomObjectFloor(
        objectId: number,
        location: IVector3D | undefined,
        direction: IVector3D | undefined,
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
        location: IVector3D | undefined,
        direction: IVector3D | undefined,
        state: number,
        data: string
    ): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        if (!object || !object.logic) return false;

        const stuffData = new LegacyDataType();

        stuffData.setString(data);

        object.processUpdateMessage(new RoomObjectUpdateMessage(location, direction));
        object.processUpdateMessage(new ObjectDataUpdateMessage(state, stuffData));

        this.updateRoomObjectMask(objectId);

        return true;
    }

    public updateRoomObjectWallState(
        objectId: number,
        state: number,
        data: string
    ): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        if (!object || !object.logic) return false;

        const stuffData = new LegacyDataType();

        stuffData.setString(data);

        object.processUpdateMessage(new ObjectDataUpdateMessage(state, stuffData));

        return true;
    }

    public updateRoomObjectWallItemData(
        objectId: number,
        data: string
    ): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        if (!object || !object.logic) return false;

        object.processUpdateMessage(new ObjectItemDataUpdateMessage(data));

        return true;
    }

    public updateRoomObjectFloorHeight(objectId: number, height: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

        if (!object) return false;

        object.processUpdateMessage(new ObjectHeightUpdateMessage(undefined, undefined, height));

        return true;
    }

    public updateRoomObjectMask(objectId: number, add: boolean = true): boolean {
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

        return true;
    }

    public updateRoomPlaneType(floorType: string | undefined, wallType: string | undefined, landscapeType: string | undefined): boolean {
        const room = this.getRoomObjectRoom();

        if (!room) return false;

        if (floorType && floorType.length) room.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE, floorType));

        if (wallType && wallType.length) room.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_WALL_UPDATE, wallType));

        if (landscapeType && landscapeType.length) room.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE, landscapeType));

        return true;
    }

    public updateRoomPlaneVisibilities(wallVisible: boolean, floorVisible: boolean = true): boolean {
        const room = this.getRoomObjectRoom();

        if (!room) return false;

        room.processUpdateMessage(new ObjectRoomPlaneVisibilityUpdateMessage(ObjectRoomPlaneVisibilityUpdateMessage.WALL_VISIBILITY, wallVisible));
        room.processUpdateMessage(new ObjectRoomPlaneVisibilityUpdateMessage(ObjectRoomPlaneVisibilityUpdateMessage.FLOOR_VISIBILITY, floorVisible));

        return true;
    }

    public updateRoomPlaneThickness(wallThickness: RoomThicknessType, floorThickness: RoomThicknessType): boolean {
        const room = this.getRoomObjectRoom();

        if (!room) return false;

        room.processUpdateMessage(new ObjectRoomPlanePropertyUpdateMessage(ObjectRoomPlanePropertyUpdateMessage.WALL_THICKNESS, wallThickness));
        room.processUpdateMessage(new ObjectRoomPlanePropertyUpdateMessage(ObjectRoomPlanePropertyUpdateMessage.FLOOR_THICKNESS, floorThickness));

        return true;
    }

    public updateRoomObjectFloorExpiration(objectId: number, expires: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

        if (!object) return false;

        object.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, expires);
        object.model.setValue(RoomObjectVariableEnum.FurnitureExpirtyTimestamp, GetTickerTime());

        return true;
    }

    public updateRoomObjectWallExpiration(objectId: number, expires: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        if (!object) return false;

        object.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, expires);
        object.model.setValue(RoomObjectVariableEnum.FurnitureExpirtyTimestamp, GetTickerTime());

        return true;
    }

    public updateRoomObjectUser(objectId: number, location: IVector3D, target: IVector3D | undefined = undefined, canStandUp: boolean = false, baseY: number = 0, direction: IVector3D | undefined = undefined, headDirection: number = NaN, animationTime: number = NaN): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        if (!location) location = object.getLocation();
        if (!direction) direction = object.getDirection();

        if (isNaN(headDirection)) headDirection = object.model.getValue<number>(RoomObjectVariableEnum.HeadDirection);

        // TODO fixedUserLocation

        object.processUpdateMessage(new ObjectAvatarUpdateMessage(location, target, direction, headDirection, canStandUp, baseY, false, animationTime));

        const ownRoomIndex = false;

        if (ownRoomIndex) {
            // TODO
            this.dispatchEvent(new RoomToObjectOwnAvatarMoveEvent(RoomToObjectOwnAvatarMoveEvent.ROAME_MOVE_TO, target));
        }

        return true;
    }

    public updateRoomObjectUserDirection(objectId: number, direction: IVector3D, headDirection: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarDirectionUpdateMessage(undefined, direction, headDirection));

        return true;
    }

    public updateRoomObjectUserOwn(objectId: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarOwnMessage());

        return true;
    }

    public updateRoomObjectUserAction(objectId: number, action: RoomObjectVariableEnum, value: number, parameter: string = ''): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        let message: ObjectStateUpdateMessage | undefined = undefined;

        switch (action) {
            case RoomObjectVariableEnum.FigureTalk:
                message = new ObjectAvatarChatUpdateMessage(value);
                break;
            case RoomObjectVariableEnum.FigureSleep:
                message = new ObjectAvatarSleepUpdateMessage(value === 1);
                break;
            case RoomObjectVariableEnum.FigureIsTyping:
                message = new ObjectAvatarTypingUpdateMessage(value === 1);
                break;
            case RoomObjectVariableEnum.FigureIsMuted:
                message = new ObjectAvatarMutedUpdateMessage(value === 1);
                break;
            case RoomObjectVariableEnum.FigureCarryObject:
                message = new ObjectAvatarCarryObjectUpdateMessage(value, parameter);
                break;
            case RoomObjectVariableEnum.FigureUseObject:
                message = new ObjectAvatarUseObjectUpdateMessage(value);
                break;
            case RoomObjectVariableEnum.FigureDance:
                message = new ObjectAvatarDanceUpdateMessage(value);
                break;
            case RoomObjectVariableEnum.FigureGainedExperience:
                message = new ObjectAvatarExperienceUpdateMessage(value);
                break;
            case RoomObjectVariableEnum.FigureNumberValue:
                message = new ObjectAvatarPlayerValueUpdateMessage(value);
                break;
            case RoomObjectVariableEnum.FigureSign:
                message = new ObjectAvatarSignUpdateMessage(value);
                break;
            case RoomObjectVariableEnum.FigureExpression:
                message = new ObjectAvatarExpressionUpdateMessage(value);
                break;
            case RoomObjectVariableEnum.IsPlayingGame:
                message = new ObjectAvatarPlayingGameUpdateMessage(value === 1);
                break;
            case RoomObjectVariableEnum.FigureGuideStatus:
                message = new ObjectAvatarGuideStatusUpdateMessage(value);
                break;
        }

        if (!message) return false;

        object.processUpdateMessage(message);

        return true;
    }

    public updateRoomObjectUserFigure(objectId: number, figure: string, gender: string = '', subType: string = '', isRiding: boolean = false): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarFigureUpdateMessage(figure, gender, subType, isRiding));

        return true;
    }

    public updateRoomObjectUserFlatControl(objectId: number, level: string): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarFlatControlUpdateMessage(parseInt(level)));

        return true;
    }

    public updateRoomObjectUserEffect(objectId: number, effectId: number, delay: number = 0): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarEffectUpdateMessage(effectId, delay));

        return true;
    }

    public updateRoomObjectUserGesture(objectId: number, gestureId: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarGestureUpdateMessage(gestureId));

        return true;
    }

    public updateRoomObjectUserPetGesture(objectId: number, gesture: string): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarPetGestureUpdateMessage(gesture));

        return true;
    }

    public updateRoomObjectUserPosture(objectId: number, type: string, parameter: string = ''): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarPostureUpdateMessage(type, parameter));

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
        const roomObject = this.getRoomObject(objectId, category);

        if (!this._canvas || !roomObject) return undefined;

        const screenPoint = this._canvas.geometry.getScreenPoint(roomObject.getLocation());

        screenPoint.x = screenPoint.x * this._canvas.scale;
        screenPoint.y = screenPoint.y * this._canvas.scale;

        screenPoint.x += this._canvas.width / 2 + this._canvas.screenOffsetX;
        screenPoint.y += this._canvas.height / 2 + this._canvas.screenOffsetY;

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

        // eslint-disable-next-line no-useless-assignment
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

    public getGeometry(): IRoomGeometry | undefined {
        return this._canvas?.geometry;
    }

    public setLegacyGeometry(geometry: ILegacyWallGeometry) {
        if (this._legacyGeometry) {
            this._legacyGeometry.dispose();
        }

        this._legacyGeometry = geometry;
    }

    public getRoomValue<T>(key: RoomObjectVariableEnum): T {
        return this._model.getValue(key);
    }

    public setRoomValue<T>(key: RoomObjectVariableEnum, value: T): void {
        this._model.setValue(key, value);
    }

    public getRoomObjectRoom(): IRoomObjectController | undefined {
        return this.getRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room);
    }

    public getRoomObjectCursor(): IRoomObjectController | undefined {
        return this.getRoomObject(Room.CURSOR_OBJECT_ID, RoomObjectCategoryEnum.Cursor);
    }

    public getRoomObjectSelectionArrow(): IRoomObjectController | undefined {
        return this.getRoomObject(Room.ARROW_OBJECT_ID, RoomObjectCategoryEnum.Cursor);
    }

    public getRoomOverlay(): Container | undefined {
        return this._canvas?.master?.getChildByLabel(Room.OVERLAY) ?? undefined;
    }

    public getRoomOverlayIconSprite(): Container | undefined {
        return this.getRoomOverlay()?.getChildByLabel(Room.OVERLAY_ICON_SPRITE) ?? undefined;
    }

    public getPetTypeId(figure: string): number {
        let type = -1;

        if (figure) {
            const parts = figure.split(' ');

            if (parts.length > 1) type = parseInt(parts[0]);
        }

        return type;
    }

    public dispatchEvent(event: INitroEvent): void {
        this._eventDispatcher.dispatchEvent(event);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get eventDispatcher(): IEventDispatcher {
        return this._eventDispatcher;
    }

    public get eventHandler(): IRoomEventHandler {
        return this._eventHandler;
    }

    public get objects(): Map<number, IRoomObject> {
        return this._objects;
    }

    public get managers(): Map<RoomObjectCategoryEnum, IRoomObjectManager> {
        return this._objectManagers;
    }

    public get canvas(): IRoomRenderingCanvas | undefined {
        return this._canvas;
    }

    public get areaSelection(): IRoomAreaSelectionManager {
        return this._areaSelection;
    }

    public get isAreaSelectionMode(): boolean {
        return this._areaSelection.areaSelectionState !== RoomAreaSelectionManager.NOT_ACTIVE;
    }

    public get legacyGeometry(): ILegacyWallGeometry | undefined {
        return this._legacyGeometry;
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
        if (!this._legacyGeometry || !location) return undefined;

        let z = location.z;
        const tileHeight = 0;
        // TODO FIX const tileHeight = this._instance.furnitureStackingHeightMap.getTileHeight(location.x, location.y);
        const wallHeight = this._legacyGeometry.getHeight(location.x, location.y);

        if (Math.abs(z - tileHeight) < 0.1 && Math.abs(tileHeight - wallHeight) < 0.1) {
            z = this._legacyGeometry.getFloorAltitude(location.x, location.y);
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

    private onRoomContentLoadedEvent(event: RoomContentLoadedEvent): void {
        const contentType = event.contentType;

        if (this._pendingContentTypes.indexOf(contentType) >= 0) return;

        this._pendingContentTypes.push(contentType);
    }

    private processPendingContentTypes(): void {
        if (this._skipContentProcessingForNextFrame) {
            this._skipContentProcessingForNextFrame = false;

            return;
        }

        const now = performance.now();

        while (this._pendingContentTypes.length) {
            const type = this._pendingContentTypes.shift();

            if (!type) continue;

            const collection = GetRoomContentLoader().getCollection(type);

            if (!collection) continue;

            this.reinitializeRoomObjectsByType(type);

            if ((performance.now() - now) >= 40) {
                this._skipContentProcessingForNextFrame = true;

                break;
            }
        }
    }
}
