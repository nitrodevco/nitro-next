import {
    EventDispatcher,
    FurnitureLabelData,
    FurnitureRegionData,
    FurnitureUsagePolicyEnum,
    GetConfigValue,
    GetObjectDataForFlags,
    IEventDispatcher,
    IGraphicAssetCollection,
    ILegacyWallGeometry,
    INitroEvent,
    IObjectData,
    IPetCustomPart,
    IRoom,
    IRoomAreaSelectionManager,
    IRoomEventHandler,
    IRoomFurnitureData,
    IRoomGeometry,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    IRoomObjectEventHandler,
    IRoomObjectHighLighter,
    IRoomObjectManager,
    IRoomObjectModel,
    IRoomObjectVisualization,
    IRoomRenderingCanvas,
    IStackingHeightMapReader,
    ITileObjectMap,
    IVariableFxConfigUpdateData,
    IVariableFxStatusRemoveData,
    IVariableFxStatusUpdateData,
    IVector3D, IWiredVisualizationStateEntry,
    LegacyDataType,
    MapDataType,
    ObjectDataFlagsEnum,
    RoomBackgroundColorEvent,
    RoomContentLoadedEvent,
    RoomEngineEvent,
    RoomEngineFurnitureLabelEvent,
    RoomEngineObjectEvent,
    RoomGeometryScaleType,
    RoomObjectCategoryEnum,
    RoomObjectFurnitureActionEvent,
    RoomObjectLogicType,
    RoomObjectUserType,
    RoomObjectUserTypeName,
    RoomObjectUserTypeUtils,
    RoomObjectVariableEnum,
    RoomThicknessType,
    RoomToObjectOwnAvatarMoveEvent,
    Vector3d,
    WiredFurnitureHighlightData,
    WiredFurnitureTransparencyData,
} from '@nitrodevco/nitro-api';
import { Container, ImageLike, PointData, Rectangle, Sprite, Texture } from 'pixi.js';

import { PetFigureData } from '../session';
import { GetTickerTime, TextureUtils } from '../utils';
import { GetRoomObjectLogicFactory, GetRoomObjectVisualizationFactory } from './factories';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomEngine } from './GetRoomEngine';
import {
    ObjectAvatarBlockedUpdateMessage,
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
    ObjectAvatarHabbiconUpdateMessage,
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
    ObjectFurnitureLabelUpdateMessage,
    ObjectFurnitureRegionUpdateMessage,
    ObjectHeightUpdateMessage,
    ObjectItemDataUpdateMessage,
    ObjectMoveUpdateMessage,
    ObjectRoomColorUpdateMessage,
    ObjectRoomFloorHoleUpdateMessage,
    ObjectRoomMaskUpdateMessage,
    ObjectRoomPlanePropertyUpdateMessage,
    ObjectRoomPlaneVisibilityUpdateMessage,
    ObjectRoomUpdateMessage,
    ObjectStateUpdateMessage,
    RoomObjectFurnitureHighlightUpdateMessage,
    RoomObjectFurnitureTransparencyUpdateMessage,
    RoomObjectUpdateMessage,
    RoomObjectVariableFxStatusRemoveMessage,
    RoomObjectVariableFxStatusUpdateMessage } from './messages';
import { FurnitureVisualization, MovingObjectLogic, RoomLogic, RoomObjectManager, RoomObjectModel } from './object';
import { VariableFxRoomData } from './object/variablefx/VariableFxRoomData';
import { isVariableFxVisualizationHost } from './object/visualization/variablefx/IVariableFxVisualizationRoomData';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomSpriteCanvas } from './RoomSpriteCanvas';
import { petImageValue, RoomAreaSelectionManager, RoomObjectHighLighter, TileObjectMap } from './utils';

/**
 * One room: Flash's `RoomInstance` (its object managers and model) with the per-room half of
 * `RoomEngine` - the add, update and remove calls for the room's furniture, users and planes - and
 * of `RoomInstanceData` (the tile object map and stacking heights).
 */
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

    /**
     * The objects `update` runs logic for, copied out first because a logic may add or remove
     * objects. Reused rather than `getValues()`, which allocated a copy of every category each frame.
     */
    private _updateObjects: (IRoomObjectController | undefined)[] = [];

    private _skipContentProcessingForNextFrame: boolean = false;
    private _skipFurnitureCreationForNextFrame: boolean = false;
    private _legacyGeometry: ILegacyWallGeometry | undefined = undefined;
    private _stackingHeightMap: IStackingHeightMapReader | undefined = undefined;
    private _tileObjectMap: TileObjectMap | undefined = undefined;
    private _canvas: IRoomRenderingCanvas | undefined = undefined;
    private _areaSelection: IRoomAreaSelectionManager;
    private _objectHighLighter: IRoomObjectHighLighter;
    private _isInitialized: boolean = false;
    private _isMoveBlocked: boolean = false;

    /** Flash `RoomEngine._clickThroughUsers` and its furni twin: the keys that currently ask for each. */
    private _clickThroughUsers: Set<string> = new Set();
    private _clickThroughFurni: Set<string> = new Set();

    /**
     * The area hides in force, held as the very messages that applied them. `applyRoomMap`
     * throws the room object away and builds a new one, taking the plane parser that owns the
     * holes with it, so every one still in force has to be applied to its replacement - Flash
     * replayed the server's list at the end of `initializeRoom` for the same reason.
     */
    private _areaHides: Map<number, ObjectRoomFloorHoleUpdateMessage> = new Map();

    /**
     * The room index of the user this client is logged in as, which Flash read off the room
     * session (`IRoomSession.ownUserRoomId`) in `RoomEngine.updateObjectUser`. The session lives in
     * the UI, so the engine learns it the moment the UI marks that avatar as its own
     * (`updateRoomObjectUserOwn`); -1 until then.
     */
    private _ownUserRoomIndex: number = -1;

    /**
     * The papers told before the room object exists. Habbo sends a room's `RoomProperty`
     * messages before its floor height map, so Flash's `RoomEngine.updateObjectRoom` keeps them in
     * the room's `RoomData` and `initializeRoom` builds the room with them instead of the defaults.
     */
    private _pendingPlaneTypes: { floor?: string; wall?: string; landscape?: string } = {};

    /**
     * Flash `RoomInstanceData`'s furniture and wall item queues: furniture is added as data and built
     * a few at a time by the engine's update (`createPendingFurniture`), or at once when something
     * asks for it first (`getRoomObject`). In insertion order; adding an id again moves it to the end.
     */
    private _floorStack: Map<number, IRoomFurnitureData> = new Map();
    private _wallStack: Map<number, IRoomFurnitureData> = new Map();
    private _variableFx: VariableFxRoomData = new VariableFxRoomData();

    /**
     * Flash `BufferedRoomObjectModelDataManager`'s `furniture_label` / `furniture_region` data
     * (category 10): a label or region for a furni that is not ready yet, or that the invisible furni
     * manager took away, kept until the furni is ready again (`restoreFurnitureLabelData`).
     */
    private _bufferedLabels: Map<number, FurnitureLabelData> = new Map();

    /**
     * Flash `BufferedRoomObjectModelDataManager`'s `wired_transparency` / `wired_highlight` data (furni
     * categories 10 and 20, users 100): a WIRED Set Visibility / Set Highlight for an object that is not
     * ready yet, or that the invisible furni manager took away, kept until it is ready
     * (`restoreWiredFurnitureTransparencyData` / `restoreWiredFurnitureHighlightData`). Keyed `category:id`.
     */
    private _bufferedWiredEffects: Map<string, { transparency?: WiredFurnitureTransparencyData; highlight?: WiredFurnitureHighlightData }> = new Map();

    constructor(roomId: number) {
        this._roomId = roomId;
        this._eventDispatcher = new EventDispatcher();
        this._eventHandler = new RoomEventHandler(this);
        this._areaSelection = new RoomAreaSelectionManager(this);
        this._objectHighLighter = new RoomObjectHighLighter(this);

        this._eventDispatcher.addEventListener<RoomContentLoadedEvent>(RoomContentLoadedEvent.RCLE_SUCCESS, event => this.onRoomContentLoadedEvent(event));
        this._eventDispatcher.addEventListener<RoomContentLoadedEvent>(RoomContentLoadedEvent.RCLE_FAILURE, event => this.onRoomContentLoadedEvent(event));
        this._eventDispatcher.addEventListener<RoomContentLoadedEvent>(RoomContentLoadedEvent.RCLE_CANCEL, event => this.onRoomContentLoadedEvent(event));
    }

    public dispose(): void {
        if (this._disposed) return;

        // Its furniture still waiting for a download slot is no longer wanted.
        GetRoomContentLoader().cancelDownloads(this._eventDispatcher);

        this._floorStack.clear();
        this._wallStack.clear();

        this.removeAllRoomObjectManagers();

        if (this._canvas) {
            this._canvas.dispose();

            this._canvas = undefined;
        }

        this._areaHides.clear();
        this._bufferedWiredEffects.clear();
        this._stackingHeightMap = undefined;
        this._tileObjectMap?.dispose();
        this._tileObjectMap = undefined;
        this._variableFx.dispose();
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

        // `initializeRoom`: the papers told while there was no room yet, else the defaults.
        const floorType = this._pendingPlaneTypes.floor || '111';
        const wallType = this._pendingPlaneTypes.wall || '201';
        const landscapeType = this._pendingPlaneTypes.landscape || '1';

        this._pendingPlaneTypes = {};

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

        // `RoomEngine`: the selection arrow only when the avatar widget is off - `!getBoolean("avatar.widget.enabled")`.
        if (GetConfigValue<boolean>('avatar.widget.enabled') !== true) this.createRoomObjectAndInitalize(
            Room.ARROW_OBJECT_ID,
            Room.ARROW_OBJECT_TYPE,
            RoomObjectCategoryEnum.Cursor,
        );

        // Whatever the room was already hiding, put back onto the room object just built.
        for (const areaHide of this._areaHides.values()) roomObject.processUpdateMessage(areaHide);

        this._isInitialized = true;

        this.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.INITIALIZED, this._roomId));
    }

    public update(time: number, update: boolean = false): void {
        if (this._disposed) return;

        this.processPendingContentTypes();

        for (const category of this._updateCategories) {
            const objects = this.getRoomObjectManager(category)?.objects;

            if (!objects || !objects.length) continue;

            const snapshot = this._updateObjects;
            const count = objects.length;

            for (let i = 0; i < count; i++) snapshot[i] = objects.getWithIndex(i);

            for (let i = 0; i < count; i++) snapshot[i]?.logic?.update(time);

            // Not kept alive by the snapshot once removed from the room.
            for (let i = 0; i < count; i++) snapshot[i] = undefined;
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

        // Flash `RoomEngine.getCanvasTransformScale`: flipped rectangles keep positive extents.
        const transformScale = canvas.isFlipped ? -canvas.scale : canvas.scale;

        if (canvas.isFlipped) {
            rectangle.x += rectangle.width;
            rectangle.y += rectangle.height;
        }

        rectangle.x = (rectangle.x * transformScale);
        rectangle.y = (rectangle.y * transformScale);
        rectangle.width = (rectangle.width * canvas.scale);
        rectangle.height = (rectangle.height * canvas.scale);

        screenPoint.x = (screenPoint.x * transformScale);
        screenPoint.y = (screenPoint.y * transformScale);

        rectangle.x += screenPoint.x;
        rectangle.y += screenPoint.y;

        // The sprite canvas draws at `screenOffset + (point + canvasSize / 2) * scale` - the
        // half-size centring lives inside the scaled display, so it scales too.
        rectangle.x += ((canvas.width >> 1) * transformScale) + canvas.screenOffsetX;
        rectangle.y += ((canvas.height >> 1) * transformScale) + canvas.screenOffsetY;

        return rectangle;
    }

    public getRoomInstanceRenderingCanvasOffset(): PointData {
        const offset = {
            x: 0,
            y: 0,
        };

        if (this._canvas) {
            offset.x = this._canvas.screenOffsetX;
            offset.y = this._canvas.screenOffsetY;
        }

        return offset;
    }

    /**
     * The stacking height map is the UI's - it lives in the room store, which also validates
     * placements against it - so the room only holds a reader onto it. Flash's `RoomEngine` kept
     * its own `FurniStackingHeightMap` per room; this is the same lookup with the map elsewhere.
     */
    public setStackingHeightMap(map: IStackingHeightMapReader | undefined): void {
        this._stackingHeightMap = map;
    }

    public getTileHeight(x: number, y: number): number {
        return this._stackingHeightMap?.getTileHeight(x, y) ?? -1;
    }

    /**
     * `RoomInstanceData.furniStackingHeightMap`'s setter: a new stacking height map comes with a
     * new, empty tile object map of its size.
     */
    public resetTileObjectMap(width: number, height: number): void {
        this._tileObjectMap?.dispose();
        this._tileObjectMap = ((width > 0) && (height > 0)) ? new TileObjectMap(width, height) : undefined;
    }

    /** `RoomEngine.refreshTileObjectMap`: rebuilt from every floor object. */
    public refreshTileObjectMap(): void {
        this._tileObjectMap?.populate(this.getRoomObjectsForCategory(RoomObjectCategoryEnum.Floor));
    }

    public get tileObjectMap(): ITileObjectMap | undefined {
        return this._tileObjectMap;
    }

    public setRoomInstanceRenderingCanvasOffset(point: PointData): boolean {
        if (!this._canvas || !point) return false;

        // Flash `setRoomCanvasScreenOffset` passes the point on unrounded; the camera's eased location is fractional.
        const x = point.x;
        const y = point.y;

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
        let roomObject = this.getRoomObjectManager(category).getObject(objectId);

        if (roomObject) return roomObject;

        switch (category) {
            // Flash `RoomEngine.getObject`: furniture still queued is built now.
            case RoomObjectCategoryEnum.Floor: {
                const data = this._floorStack.get(objectId);

                this._floorStack.delete(objectId);

                if (!data || !this.addFurnitureFloorFromData(data)) return undefined;

                roomObject = this.getRoomObjectManager(category).getObject(objectId);

                break;
            }
            case RoomObjectCategoryEnum.Wall: {
                const data = this._wallStack.get(objectId);

                this._wallStack.delete(objectId);

                if (!data || !this.addFurnitureWallFromData(data)) return undefined;

                roomObject = this.getRoomObjectManager(category).getObject(objectId);

                break;
            }
        }

        return roomObject;
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
        // Flash `disposeObjectFurniture` / `disposeObjectWallItem`: queued data is dropped first, so
        // furniture removed before it was built is never built.
        if (category === RoomObjectCategoryEnum.Floor) this._floorStack.delete(objectId);
        else if (category === RoomObjectCategoryEnum.Wall) this._wallStack.delete(objectId);

        const roomObject = this.getRoomObjectManager(category)?.getObject(objectId);

        if (!roomObject) return;

        roomObject.tearDown();

        this._objects.delete(roomObject.instanceId);
        this._canvas?.removeFromCache(roomObject.instanceId);

        this.getRoomObjectManager(category)?.removeObject(objectId);

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

        this.assignVariableFxRoomData(visualization, category);

        const logic = GetRoomObjectLogicFactory().getLogic(logicType);

        if (logic) {
            logic.eventHandler = this._eventHandler;

            object.setLogic(logic);
            object.logic.initialize(asset?.data ?? undefined);

            this.assignVariableFxLogicManager(logic, category);
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

        const dataFormat = object.model.getValue<ObjectDataFlagsEnum>(RoomObjectVariableEnum.FurnitureDataFormat);

        if (!isNaN(dataFormat)) {
            const data = GetObjectDataForFlags(dataFormat);

            if (data) {
                data.initializeFromRoomObjectModel(object.model);

                object.processUpdateMessage(new ObjectDataUpdateMessage(object.getState(0), data));
            }
        }

        if (category === RoomObjectCategoryEnum.Floor) this.restoreFurnitureLabelOrRegion(object);

        this.restoreWiredEffects(object, category);

        this.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.CONTENT_UPDATED, this._roomId, objectId, category));

        // Only an object that is ready goes in, so one made before it has a location does not.
        this._tileObjectMap?.addRoomObject(object);
    }

    public reinitializeRoomObjectsByType(type: string): void {
        if (!type) return;

        const asset = GetRoomContentLoader().getCollection(type);

        if (!asset) return;

        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(
            type,
            asset.data.visualizationType,
            asset.data,
        );

        for (const [ category, manager ] of this._objectManagers.entries()) {
            for (const object of manager.objects.getValues()) {
                if (!object || object.type !== type) continue;

                const visualization = GetRoomObjectVisualizationFactory().getVisualization(asset.data.visualizationType);

                if (visualization) {
                    visualization.asset = asset;

                    if (visualizationData && visualization.initialize(visualizationData)) {
                        // The placeholder's visualization is thrown away here; a wired look put on it while the furni was still loading moves over.
                        if ((object.visualization instanceof FurnitureVisualization) && (visualization instanceof FurnitureVisualization)) visualization.filters = object.visualization.filters;

                        object.setVisualization(visualization);

                        this.assignVariableFxRoomData(visualization, category);

                        const logic = GetRoomObjectLogicFactory().getLogic(asset.data.logicType);

                        if (logic) {
                            logic.eventHandler = this._eventHandler;

                            object.setLogic(logic);
                            logic.initialize(asset.data);

                            this.assignVariableFxLogicManager(logic, category);
                        }

                        // Flash's `RoomManager` marks the object initialized before `objectInitialized`.
                        object.isReady = true;

                        this.objectInitialized(object.id, category);

                        continue;
                    }
                }

                // The whole removal: torn down and out of the room's index and the canvas cache too.
                this.removeRoomObject(object.id, category);
            }
        }
    }

    /** Users (avatars, pets, bots) draw from the user Variable FX tables; floor/wall items from the furniture ones. */
    private assignVariableFxRoomData(visualization: IRoomObjectVisualization, category: RoomObjectCategoryEnum): void {
        if (!isVariableFxVisualizationHost(visualization)) return;

        visualization.variableFxRoomData = category === RoomObjectCategoryEnum.Unit ? this._variableFx.avatarVisualizationData : this._variableFx.furnitureVisualizationData;
    }

    private assignVariableFxLogicManager(logic: IRoomObjectEventHandler, category: RoomObjectCategoryEnum): void {
        if (!(logic instanceof MovingObjectLogic)) return;

        logic.variableFxLogicManager = category === RoomObjectCategoryEnum.Unit ? this._variableFx.avatarLogicManager : this._variableFx.furnitureLogicManager;
    }

    public updateVariableFxConfigs(configs: IVariableFxConfigUpdateData[]): void {
        this._variableFx.updateConfigs(configs);
    }

    public removeVariableFxConfigs(configIds: number[]): void {
        this._variableFx.removeConfigs(configIds);
    }

    public updateVariableFxStatuses(statuses: IVariableFxStatusUpdateData[]): void {
        for (const status of statuses) {
            const object = this.getVariableFxTarget(status.isUserEntity, status.entityId);

            if (!object) continue;

            object.processUpdateMessage(new RoomObjectVariableFxStatusUpdateMessage(status.configId, status.variableId, status.value, status.overrideMinValue, status.overrideMaxValue, new Map(status.extra), status.isInitialize));
        }
    }

    public removeVariableFxStatuses(statuses: IVariableFxStatusRemoveData[]): void {
        for (const status of statuses) {
            const object = this.getVariableFxTarget(status.isUserEntity, status.entityId);

            if (!object) continue;

            object.processUpdateMessage(new RoomObjectVariableFxStatusRemoveMessage(status.configId, status.variableId));
        }
    }

    private getVariableFxTarget(isUserEntity: boolean, entityId: number): IRoomObjectController | undefined {
        if (isUserEntity) return this.getRoomObjectManager(RoomObjectCategoryEnum.Unit).getObject(entityId);

        return this.getRoomObject(entityId, RoomObjectCategoryEnum.Floor) ?? this.getRoomObject(entityId, RoomObjectCategoryEnum.Wall);
    }

    public createRoomObjectFloor(id: number, type: string): IRoomObject | undefined {
        return this.applyInvisibleFurniState(this.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Floor));
    }

    public createRoomObjectWall(id: number, type: string): IRoomObject | undefined {
        return this.applyInvisibleFurniState(this.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Wall));
    }

    /**
     * Flash `RoomEngine.setInvisibleFurni`: the room's "invisible furni" configuration item hides
     * every furni layer tagged `invisible`. The flag is kept as a room value so furni placed
     * afterwards pick it up (`applyInvisibleFurniState`), and pushed onto the furni already here.
     */
    public setInvisibleFurni(flag: boolean): void {
        this.setRoomValue(RoomObjectVariableEnum.InvisibleFurni, flag ? 1 : 0);

        for (const category of [ RoomObjectCategoryEnum.Floor, RoomObjectCategoryEnum.Wall ]) {
            for (const object of this.getRoomObjectsForCategory(category)) object.model.setValue(RoomObjectVariableEnum.FurnitureInvisibleLayer, flag ? 1 : 0);
        }
    }

    /**
     * Flash `RoomEngine.setClickSettings`. The flags are read where Flash read them, at the top
     * of `processRoomCanvasMouseEvent` (`RoomEventHandler.handleRoomCanvasMouseEvent` here): a
     * click-through object never sees the mouse event and never claims its event id, so the next
     * object under the pointer - other furni, or the floor tile - handles it instead.
     *
     * A category that becomes click-through also stops getting its roll-outs, so Flash dropped
     * the button cursors its objects owned (`removeButtonMouseCursorOwners`). The cursor owners
     * are kept by the UI here, which gives one up on `RoomObjectFurnitureActionEvent.MOUSE_ARROW`,
     * so that is what each object of the category sends.
     */
    public setClickSettings(key: string, clickThroughUsers: boolean, clickThroughFurni: boolean): void {
        const wasClickThroughUsers = this.clickThroughUsers;
        const wasClickThroughFurni = this.clickThroughFurni;

        if (clickThroughUsers) this._clickThroughUsers.add(key);
        else this._clickThroughUsers.delete(key);

        if (clickThroughFurni) this._clickThroughFurni.add(key);
        else this._clickThroughFurni.delete(key);

        if (!wasClickThroughUsers && clickThroughUsers) this.removeButtonMouseCursorOwners(RoomObjectCategoryEnum.Unit);

        if (!wasClickThroughFurni && clickThroughFurni) {
            this.removeButtonMouseCursorOwners(RoomObjectCategoryEnum.Floor);
            this.removeButtonMouseCursorOwners(RoomObjectCategoryEnum.Wall);
        }
    }

    private removeButtonMouseCursorOwners(category: RoomObjectCategoryEnum): void {
        for (const object of this.getRoomObjectsForCategory(category)) this._eventHandler.handleRoomObjectEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.MOUSE_ARROW, object));
    }

    public get clickThroughUsers(): boolean {
        return this._clickThroughUsers.size > 0;
    }

    public get clickThroughFurni(): boolean {
        return this._clickThroughFurni.size > 0;
    }

    /** Flash `RoomEngine.setMoveBlocked`; its one writer is the area selection, while it is dragging. */
    public setMoveBlocked(flag: boolean): void {
        this._isMoveBlocked = flag;
    }

    public get isMoveBlocked(): boolean {
        return this._isMoveBlocked;
    }

    /** Flash `RoomEngine.isRoomVariableActive`: a room value that is set and above zero. */
    public isRoomVariableActive(key: RoomObjectVariableEnum): boolean {
        return this.getRoomValue<number>(key) > 0;
    }

    private applyInvisibleFurniState(object: IRoomObject | undefined): IRoomObject | undefined {
        object?.model.setValue(RoomObjectVariableEnum.FurnitureInvisibleLayer, this.isRoomVariableActive(RoomObjectVariableEnum.InvisibleFurni) ? 1 : 0);

        return object;
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
        usagePolicy: FurnitureUsagePolicyEnum = FurnitureUsagePolicyEnum.Nobody,
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
        usagePolicy: FurnitureUsagePolicyEnum = FurnitureUsagePolicyEnum.Nobody,
        ownerId: number = 0,
        ownerName: string = '',
        realRoomObject: boolean = true,
        sizeZ: number = -1,
        typeId: number = -1,
    ): boolean {
        // Flash `RoomEngine.addObjectFurniture`: queued (`RoomInstanceData.addFurnitureData`), not built.
        this._floorStack.delete(objectId);
        this._floorStack.set(objectId, {
            objectId,
            typeId,
            typeName,
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
        });

        return true;
    }

    public addFurnitureFloorFromData(data: IRoomFurnitureData): boolean {
        if (!data) return false;

        let typeName = data.typeName;

        if (!data.typeName.length) {
            typeName = GetRoomContentLoader().getFurnitureFloorNameForTypeId(data.typeId);
        }

        const roomObject = this.createRoomObjectFloor(data.objectId, typeName);

        // As `addFurnitureWallFromData` does: an object that could not be made is not updated, or
        // `updateRoomObjectFloor` asks `getRoomObject`, which makes it from this same data again - forever.
        if (!roomObject) return false;

        roomObject.model.setValue(
            RoomObjectVariableEnum.FurnitureColor,
            GetRoomContentLoader().getFurnitureFloorColorIndex(data.typeId),
        );
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureTypeId, data.typeId);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAdUrl, GetRoomContentLoader().getRoomObjectAdUrl(typeName));
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureRealRoomObject, data.realRoomObject ? 1 : 0);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, data.expires);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTimestamp, GetTickerTime());
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureUsagePolicy, data.usagePolicy);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerId, data.ownerId);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerName, data.ownerName);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExtra, data.extra);

        if (!this.updateRoomObjectFloor(data.objectId, data.location, data.direction, data.state, data.objectData, data.extra)) return false;

        if (data.sizeZ >= 0) {
            if (!this.updateRoomObjectFloorHeight(data.objectId, data.sizeZ)) return false;
        }

        this.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, data.objectId, RoomObjectCategoryEnum.Floor),
        );

        if (roomObject.isReady) this._tileObjectMap?.addRoomObject(roomObject);

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
        usagePolicy: FurnitureUsagePolicyEnum = FurnitureUsagePolicyEnum.Nobody,
        ownerId: number = 0,
        ownerName: string = '',
        realRoomObject: boolean = true,
    ): boolean {
        const objectData = new LegacyDataType();

        objectData.setString(data);

        // Flash `RoomEngine.addObjectWallItem`: queued (`RoomInstanceData.addWallItemData`), not built.
        this._wallStack.delete(objectId);
        this._wallStack.set(objectId, {
            objectId,
            typeId,
            typeName: GetRoomContentLoader().getFurnitureWallNameForTypeId(typeId, objectData.getLegacyString()),
            location,
            direction,
            state,
            objectData,
            // Flash's wall `FurnitureData` takes `NaN` for the extra.
            extra: NaN,
            expires,
            usagePolicy,
            ownerId,
            ownerName,
            realRoomObject,
            sizeZ: -1,
        });

        return true;
    }

    /**
     * This room's part of Flash `RoomEngine.createRoomFurniture`: its queued floor items, then its
     * wall items, built one at a time; every fourth, the frame's budget (measured from `startTime`)
     * is checked and the rest waits for the next frame. Flash skips the check in game mode, which
     * only SnowWar sets and the port does not have.
     */
    public createPendingFurniture(startTime: number, budgetMs: number): boolean {
        let built = 0;

        const outOfTime = () => ((++built % 4) === 0) && ((performance.now() - startTime) >= budgetMs);

        for (const [ objectId, data ] of this._floorStack) {
            this._floorStack.delete(objectId);
            this.addFurnitureFloorFromData(data);

            if (outOfTime()) return true;
        }

        for (const [ objectId, data ] of this._wallStack) {
            this._wallStack.delete(objectId);
            this.addFurnitureWallFromData(data);

            if (outOfTime()) return true;
        }

        return false;
    }

    public addFurnitureWallFromData(data: IRoomFurnitureData): boolean {
        if (!data) return false;

        const roomObject = this.createRoomObjectWall(data.objectId, data.typeName);

        if (!roomObject) return false;

        roomObject.model.setValue(
            RoomObjectVariableEnum.FurnitureColor,
            GetRoomContentLoader().getFurnitureWallColorIndex(data.typeId),
        );
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureTypeId, data.typeId);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAdUrl, GetRoomContentLoader().getRoomObjectAdUrl(data.typeName));
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureRealRoomObject, data.realRoomObject ? 1 : 0);
        // `addObjectWallItem`: a wall item sorts by its own depth, not the tile it hangs over.
        roomObject.model.setValue(RoomObjectVariableEnum.ObjectAccurateZValue, 1);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, data.expires);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTimestamp, GetTickerTime());
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureUsagePolicy, data.usagePolicy);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerId, data.ownerId);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureOwnerName, data.ownerName);
        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureExtra, data.extra);

        if (!this.updateRoomObjectWall(data.objectId, data.location, data.direction, data.state, data.objectData?.getLegacyString() ?? '')) return false;

        this.dispatchEvent(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, this._roomId, data.objectId, RoomObjectCategoryEnum.Wall),
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

    /**
     * `RoomEngine.updateFurnitureColor` (`FurniRecolorUpdate`): writes the channels into each
     * furni's map data, as strings, and hands the map back to the furni with its state and its
     * unique serial, as a recolorable's logic reads them.
     */
    public updateFurnitureColor(objectIds: number[], red: number, green: number, blue: number): void {
        for (const objectId of objectIds) {
            const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

            if (!object) continue;

            const stuffData = new MapDataType();

            stuffData.initializeFromRoomObjectModel(object.model);
            stuffData.data['r'] = String(red);
            stuffData.data['g'] = String(green);
            stuffData.data['b'] = String(blue);

            this.updateRoomObjectFloor(objectId, undefined, undefined, object.getState(0), stuffData);
        }
    }

    /**
     * `RoomEngine.replaceFurnitureLabelsAndRegions` (`FurnitureLabelsAndRegions`, every room
     * entry): every buffered label goes, every ready furni loses its label or region, then each
     * entry is applied or buffered. A widget hears of each furni whose label changed.
     */
    public replaceFurnitureLabelsAndRegions(entries: FurnitureLabelData[]): void {
        this._bufferedLabels.clear();

        for (const object of this.getRoomObjectsForCategory(RoomObjectCategoryEnum.Floor)) {
            if (object.isReady && (this.applyFurnitureLabelOrRegion(object as IRoomObjectController, undefined) === 2)) this.dispatchFurnitureLabelUpdated(object.id);
        }

        for (const entry of entries) {
            if (this.applyOrBufferFurnitureLabelOrRegion(entry) === 2) this.dispatchFurnitureLabelUpdated(entry.furnitureId);
        }
    }

    /**
     * `RoomEngine.updateFurnitureLabelsAndRegions` (`FurnitureLabelsAndRegionsUpdate`): each entry
     * applied or buffered, then each removed furni loses its label or region, buffered or not.
     */
    public updateFurnitureLabelsAndRegions(addedOrUpdated: FurnitureLabelData[], removedIds: number[]): void {
        for (const entry of addedOrUpdated) {
            if (this.applyOrBufferFurnitureLabelOrRegion(entry) !== 0) this.dispatchFurnitureLabelUpdated(entry.furnitureId);
        }

        for (const objectId of removedIds) {
            this._bufferedLabels.delete(objectId);

            const object = this.getReadyFloorObject(objectId);

            if (object && (this.applyFurnitureLabelOrRegion(object, undefined) === 2)) this.dispatchFurnitureLabelUpdated(objectId);
        }
    }

    /** `applyOrBufferFurnitureLabelOrRegion`: a furni that is not ready keeps the entry until it is (0). */
    private applyOrBufferFurnitureLabelOrRegion(entry: FurnitureLabelData): number {
        const object = this.getReadyFloorObject(entry.furnitureId);

        if (!object) {
            this._bufferedLabels.set(entry.furnitureId, entry);

            return 0;
        }

        this._bufferedLabels.delete(entry.furnitureId);

        return this.applyFurnitureLabelOrRegion(object, entry);
    }

    /**
     * `applyFurnitureLabelOrRegion`: only a furni whose asset has the `furniture_label` logic takes a
     * label, and only one with `furniture_region` a region; the other kind is taken off. 2 when the
     * furni's label changed (the widget reads it again), 1 when a label entry changed nothing it shows,
     * 0 otherwise. Without an entry the furni loses whatever it had.
     */
    private applyFurnitureLabelOrRegion(object: IRoomObjectController, entry: FurnitureLabelData | undefined): number {
        const logicType = GetRoomContentLoader().getCollection(object.type)?.data?.logicType;
        const label = object.model.getValue<FurnitureLabelData | undefined>(RoomObjectVariableEnum.FurnitureLabelData);
        const region = object.model.getValue<FurnitureRegionData | undefined>(RoomObjectVariableEnum.FurnitureRegionData);

        if (entry instanceof FurnitureRegionData) {
            if (logicType !== RoomObjectLogicType.FURNITURE_REGION) {
                if ((logicType === RoomObjectLogicType.FURNITURE_LABEL) && label) {
                    object.processUpdateMessage(new ObjectFurnitureLabelUpdateMessage(undefined));

                    return 2;
                }

                return 0;
            }

            if (!region || !region.equals(entry)) object.processUpdateMessage(new ObjectFurnitureRegionUpdateMessage(entry));

            return 0;
        }

        if (entry) {
            if (logicType !== RoomObjectLogicType.FURNITURE_LABEL) {
                if ((logicType === RoomObjectLogicType.FURNITURE_REGION) && region) object.processUpdateMessage(new ObjectFurnitureRegionUpdateMessage(undefined));

                return 1;
            }

            if (!label || !label.equals(entry)) {
                object.processUpdateMessage(new ObjectFurnitureLabelUpdateMessage(entry.text, entry.bubbleColor, entry.visibility, entry.alwaysOpen));

                return 2;
            }

            return 1;
        }

        if (logicType === RoomObjectLogicType.FURNITURE_LABEL) {
            if (label) {
                object.processUpdateMessage(new ObjectFurnitureLabelUpdateMessage(undefined));

                return 2;
            }
        } else if ((logicType === RoomObjectLogicType.FURNITURE_REGION) && region) {
            object.processUpdateMessage(new ObjectFurnitureRegionUpdateMessage(undefined));
        }

        return 0;
    }

    /** `restoreFurnitureLabelData` / `restoreFurnitureRegionData`: a furni just ready takes what was kept for it. */
    private restoreFurnitureLabelOrRegion(object: IRoomObjectController): void {
        const entry = this._bufferedLabels.get(object.id);

        if (!entry) return;

        this._bufferedLabels.delete(object.id);

        if (this.applyFurnitureLabelOrRegion(object, entry) === 2) this.dispatchFurnitureLabelUpdated(object.id);
    }

    /** `getReadyRoomObject`: a floor furni already built and ready, without building a queued one. */
    private getReadyFloorObject(objectId: number): IRoomObjectController | undefined {
        const object = this.getRoomObjectManager(RoomObjectCategoryEnum.Floor)?.getObject(objectId);

        return object?.isReady ? object : undefined;
    }

    private dispatchFurnitureLabelUpdated(furnitureId: number): void {
        this.dispatchEvent(new RoomEngineFurnitureLabelEvent(RoomEngineFurnitureLabelEvent.UPDATED, this._roomId, furnitureId));
    }

    public updateRoomObjectWall(
        objectId: number,
        location: IVector3D | undefined,
        direction: IVector3D | undefined,
        state: number,
        data: string,
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

    public updateRoomObjectWallLocation(
        objectId: number,
        location: IVector3D | undefined,
    ): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        if (!object || !object.logic) return false;

        object.logic.processUpdateMessage(new ObjectMoveUpdateMessage(location, undefined, undefined));

        this.updateRoomObjectMask(objectId);

        return true;
    }

    public updateRoomObjectWallState(
        objectId: number,
        state: number,
        data: string,
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
        data: string,
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

    public updateRoomObjectState(objectId: number, category: RoomObjectCategoryEnum): boolean {
        const roomObject = this.getRoomObject(objectId, category);

        if (!roomObject?.model) return false;

        let stateIndex = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAutomaticStateIndex);

        if (isNaN(stateIndex)) stateIndex = 1;
        else stateIndex = (stateIndex + 1);

        roomObject.model.setValue(RoomObjectVariableEnum.FurnitureAutomaticStateIndex, stateIndex);

        const dataKey = roomObject.model.getValue<ObjectDataFlagsEnum>(RoomObjectVariableEnum.FurnitureDataFormat);
        const data = GetObjectDataForFlags(dataKey);

        data.initializeFromRoomObjectModel(roomObject.model);

        roomObject.logic.processUpdateMessage(new ObjectDataUpdateMessage(stateIndex, data));

        return true;
    }

    public updateRoomObjectRoomColor(color: number, light: number, backgroundOnly: boolean): boolean {
        const room = this.getRoomObjectRoom();

        if (!room) return false;

        room.processUpdateMessage(new ObjectRoomColorUpdateMessage(ObjectRoomColorUpdateMessage.BACKGROUND_COLOR, color, light, backgroundOnly));

        // `RoomEngine.updateObjectRoomColor`: the room view tints itself from this (`RoomUI`'s `REE_ROOM_COLOR`).
        this.dispatchEvent(new RoomBackgroundColorEvent(this._roomId, color, light, backgroundOnly));

        return true;
    }

    /**
     * A furni hiding - or revealing - the area it covers. The area is a hole in the room's floor
     * plane, so the work lands on the room object rather than on the furni that asked for it,
     * exactly as `RoomEngine.updateAreaHide` did.
     *
     * An inverted area hides everything *outside* itself, which the plane parser keeps as a
     * separate set of holes; that is the only thing `invert` decides here.
     */
    public updateAreaHide(furniId: number, on: boolean, rootX: number, rootY: number, width: number, length: number, invert: boolean): boolean {
        const message = on
            ? new ObjectRoomFloorHoleUpdateMessage(ObjectRoomFloorHoleUpdateMessage.ADD, furniId, rootX, rootY, width, length, invert)
            : new ObjectRoomFloorHoleUpdateMessage(ObjectRoomFloorHoleUpdateMessage.REMOVE, furniId);

        if (on) this._areaHides.set(furniId, message);
        else this._areaHides.delete(furniId);

        const room = this.getRoomObjectRoom();

        if (!room) return false;

        room.processUpdateMessage(message);

        return true;
    }

    /**
     * `RoomEngine.addFloorHole`: a floor hole furni opening the tiles it stands on. Unlike an area
     * hide the hole is the furni's own footprint - its location and `furniture_size_x` /
     * `_size_y` as they are now - and a negative id (a previewed or carried object) opens nothing.
     */
    public addFloorHole(objectId: number): void {
        if (objectId < 0) return;

        const room = this.getRoomObjectRoom();
        const furni = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

        if (!room || !furni) return;

        const location = furni.getLocation();

        room.processUpdateMessage(new ObjectRoomFloorHoleUpdateMessage(
            ObjectRoomFloorHoleUpdateMessage.ADD,
            objectId,
            Math.trunc(location.x),
            Math.trunc(location.y),
            Math.trunc(furni.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX)),
            Math.trunc(furni.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY)),
        ));
    }

    /** `RoomEngine.removeFloorHole`. */
    public removeFloorHole(objectId: number): void {
        if (objectId < 0) return;

        this.getRoomObjectRoom()?.processUpdateMessage(new ObjectRoomFloorHoleUpdateMessage(ObjectRoomFloorHoleUpdateMessage.REMOVE, objectId));
    }

    public updateRoomPlaneType(floorType: string | undefined, wallType: string | undefined, landscapeType: string | undefined): boolean {
        const room = this.getRoomObjectRoom();

        // `RoomEngine.updateObjectRoom`: no room object yet, so the room keeps them for `applyRoomMap`.
        if (!room) {
            if (floorType) this._pendingPlaneTypes.floor = floorType;
            if (wallType) this._pendingPlaneTypes.wall = wallType;
            if (landscapeType) this._pendingPlaneTypes.landscape = landscapeType;

            return true;
        }

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
        object.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTimestamp, GetTickerTime());

        return true;
    }

    public updateRoomObjectWallExpiration(objectId: number, expires: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        if (!object) return false;

        object.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTime, expires);
        object.model.setValue(RoomObjectVariableEnum.FurnitureExpiryTimestamp, GetTickerTime());

        return true;
    }

    public updateRoomObjectUser(objectId: number, location: IVector3D, target: IVector3D | undefined = undefined, canStandUp: boolean = false, baseY: number = 0, direction: IVector3D | undefined = undefined, headDirection: number = NaN, animationTime: number = NaN, skipPositionUpdate: boolean = false, jumpingPower: number = NaN): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        if (!location) location = object.getLocation();
        if (!direction) direction = object.getDirection();

        if (isNaN(headDirection)) headDirection = object.model.getValue<number>(RoomObjectVariableEnum.HeadDirection);

        // `RoomEngine.updateObjectUser`: both ends of the walk sit on the real floor, not the stacking map.
        object.processUpdateMessage(new ObjectAvatarUpdateMessage(this.fixedUserLocation(location), this.fixedUserLocation(target), direction, headDirection, canStandUp, baseY, jumpingPower, false, animationTime, skipPositionUpdate));

        // `RoomEngine.updateObjectUser`: where the own avatar is heading goes out to every furni
        // logic, unfixed - `FurnitureChangeStateWhenStepOnLogic` lights up under it.
        if (objectId === this._ownUserRoomIndex) this.dispatchEvent(new RoomToObjectOwnAvatarMoveEvent(RoomToObjectOwnAvatarMoveEvent.ROAME_MOVE_TO, target));

        return true;
    }

    public updateRoomObjectUserDirection(objectId: number, direction: IVector3D, headDirection: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarDirectionUpdateMessage(undefined, direction, headDirection));

        return true;
    }

    /**
     * Marks the avatar at `objectId` as the user's own (`RoomEngine.updateObjectUserOwnUserAvatar`)
     * and records its index, as `RoomEngine.setOwnUserId` put it on the session, for
     * `updateRoomObjectUser` to tell the furniture about.
     */
    public updateRoomObjectUserOwn(objectId: number): boolean {
        this._ownUserRoomIndex = objectId;

        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarOwnMessage());

        return true;
    }

    /** Flash `RoomEngine.updateObjectUserBlocked`: swaps the avatar to or from the generic blocked figure. */
    public updateRoomObjectUserBlocked(objectId: number, isBlocked: boolean): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        object.processUpdateMessage(new ObjectAvatarBlockedUpdateMessage(isBlocked));

        return true;
    }

    public updateRoomObjectUserAction(objectId: number, action: RoomObjectVariableEnum, value: number, parameter: string = ''): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Unit);

        if (!object) return false;

        // Flash `userIsBlocked`: a blocked user's dances, signs and hand items are not shown.
        if (object.model.getValue<number>(RoomObjectVariableEnum.Blocked) > 0) return false;

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
            // Flash's case is `figure_is_playing_game`, the key the message writes; `is_playing_game` is the room's own
            case RoomObjectVariableEnum.FigureIsPlayingGame:
                message = new ObjectAvatarPlayingGameUpdateMessage(value === 1);
                break;
            case RoomObjectVariableEnum.FigureGuideStatus:
                message = new ObjectAvatarGuideStatusUpdateMessage(value);
                break;
            // Flash `RoomUI.onRoomUseHabbicon`; no packet here plays one yet (see AvatarLogic)
            case RoomObjectVariableEnum.FigureHabbicon:
                message = new ObjectAvatarHabbiconUpdateMessage(value);
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

    /**
     * `RoomEngine.disposeObjectFurniture`; the flight of a picked up item to the toolbar is the client's (`createPickupTransition`).
     * Taken away by the invisible furni manager, a ready furni's label or region is kept for when it
     * comes back (`BufferedRoomObjectModelDataManager.captureObject`); otherwise it goes with it (`clearObject`).
     */
    public removeRoomObjectFloor(objectId: number, byInvisibleFurniManager: boolean = false): void {
        const object = this.getRoomObjectManager(RoomObjectCategoryEnum.Floor)?.getObject(objectId);
        const captured = (byInvisibleFurniManager && object?.isReady) ? (object.model.getValue<FurnitureLabelData | undefined>(RoomObjectVariableEnum.FurnitureLabelData) ?? object.model.getValue<FurnitureRegionData | undefined>(RoomObjectVariableEnum.FurnitureRegionData)) : undefined;

        if (captured) this._bufferedLabels.set(objectId, captured);
        else if (!byInvisibleFurniManager) this._bufferedLabels.delete(objectId);

        this.captureOrClearWiredEffects(objectId, RoomObjectCategoryEnum.Floor, byInvisibleFurniManager, object);

        this.removeRoomObject(objectId, RoomObjectCategoryEnum.Floor);
    }

    /** `RoomEngine.disposeObjectWallItem`; the flight of a picked up item to the toolbar is the client's (`createPickupTransition`). */
    public removeRoomObjectWall(objectId: number): void {
        this.captureOrClearWiredEffects(objectId, RoomObjectCategoryEnum.Wall, false, undefined);

        this.removeRoomObject(objectId, RoomObjectCategoryEnum.Wall);

        this.updateRoomObjectMask(objectId, false);
    }

    public removeRoomObjectUser(objectId: number): void {
        this.captureOrClearWiredEffects(objectId, RoomObjectCategoryEnum.Unit, false, undefined);

        this.removeRoomObject(objectId, RoomObjectCategoryEnum.Unit);
    }

    /** `RoomEngine.updateWiredFurniTransparency`: a negative id is a wall item. */
    public updateWiredFurniTransparency(furniIds: number[], transparency: number, allowClickThrough: boolean, easingMode: number): void {
        for (const furniId of furniIds) this.applyOrBufferWiredEffect(Room.getWiredFurniCategory(furniId), Math.abs(furniId), new WiredFurnitureTransparencyData(transparency, allowClickThrough, easingMode), false);
    }

    /** `RoomEngine.updateWiredFurniHighlight`: a negative id is a wall item. */
    public updateWiredFurniHighlight(furniIds: number[], highlightType: number, strength: number, color: number, animationMode: number, easingMode: number): void {
        for (const furniId of furniIds) this.applyOrBufferWiredEffect(Room.getWiredFurniCategory(furniId), Math.abs(furniId), new WiredFurnitureHighlightData(highlightType, strength, color, animationMode, easingMode), false);
    }

    /** `RoomEngine.initializeWiredFurniVisualizationStates`: the room's states on entry, applied without easing. */
    public initializeWiredFurniVisualizationStates(transparencies: IWiredVisualizationStateEntry<WiredFurnitureTransparencyData>[], highlights: IWiredVisualizationStateEntry<WiredFurnitureHighlightData>[]): void {
        for (const entry of transparencies) this.applyOrBufferWiredEffect(Room.getWiredFurniCategory(entry.id), Math.abs(entry.id), entry.data, true);
        for (const entry of highlights) this.applyOrBufferWiredEffect(Room.getWiredFurniCategory(entry.id), Math.abs(entry.id), entry.data, true);
    }

    /** `RoomEngine.updateWiredUserTransparency`, by room index (users, pets and bots). */
    public updateWiredUserTransparency(roomIndices: number[], transparency: number, allowClickThrough: boolean, easingMode: number): void {
        for (const roomIndex of roomIndices) this.applyOrBufferWiredEffect(RoomObjectCategoryEnum.Unit, roomIndex, new WiredFurnitureTransparencyData(transparency, allowClickThrough, easingMode), false);
    }

    /** `RoomEngine.updateWiredUserHighlight`, by room index (users, pets and bots). */
    public updateWiredUserHighlight(roomIndices: number[], highlightType: number, strength: number, color: number, animationMode: number, easingMode: number): void {
        for (const roomIndex of roomIndices) this.applyOrBufferWiredEffect(RoomObjectCategoryEnum.Unit, roomIndex, new WiredFurnitureHighlightData(highlightType, strength, color, animationMode, easingMode), false);
    }

    /** `RoomEngine.initializeWiredUserVisualizationStates`. */
    public initializeWiredUserVisualizationStates(transparencies: IWiredVisualizationStateEntry<WiredFurnitureTransparencyData>[], highlights: IWiredVisualizationStateEntry<WiredFurnitureHighlightData>[]): void {
        for (const entry of transparencies) this.applyOrBufferWiredEffect(RoomObjectCategoryEnum.Unit, entry.id, entry.data, true);
        for (const entry of highlights) this.applyOrBufferWiredEffect(RoomObjectCategoryEnum.Unit, entry.id, entry.data, true);
    }

    /** `getWiredFurniCategory`: WIRED sends wall items with a negative id. */
    private static getWiredFurniCategory(furniId: number): RoomObjectCategoryEnum {
        return (furniId < 0) ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor;
    }

    /** `applyOrBufferWiredFurniTransparency` / `applyOrBufferWiredFurniHighlight` and their user twins. */
    private applyOrBufferWiredEffect(category: RoomObjectCategoryEnum, objectId: number, data: WiredFurnitureTransparencyData | WiredFurnitureHighlightData, initialize: boolean): void {
        const key = `${category}:${objectId}`;
        const object = this.getRoomObjectManager(category)?.getObject(objectId);

        if (!object?.isReady) {
            const buffered = this._bufferedWiredEffects.get(key) ?? {};

            if (data instanceof WiredFurnitureTransparencyData) buffered.transparency = data;
            else buffered.highlight = data;

            this._bufferedWiredEffects.set(key, buffered);

            return;
        }

        const buffered = this._bufferedWiredEffects.get(key);

        if (buffered) {
            if (data instanceof WiredFurnitureTransparencyData) buffered.transparency = undefined;
            else buffered.highlight = undefined;

            if (!buffered.transparency && !buffered.highlight) this._bufferedWiredEffects.delete(key);
        }

        Room.applyWiredEffect(object, data, initialize);
    }

    private static applyWiredEffect(object: IRoomObjectController, data: WiredFurnitureTransparencyData | WiredFurnitureHighlightData, initialize: boolean): void {
        if (data instanceof WiredFurnitureTransparencyData) object.processUpdateMessage(new RoomObjectFurnitureTransparencyUpdateMessage(data.transparency, data.allowClickThrough, data.easingMode, initialize));
        else object.processUpdateMessage(new RoomObjectFurnitureHighlightUpdateMessage(data.highlightType, data.strength, data.color, data.animationMode, data.easingMode, initialize));
    }

    /** `restoreWiredFurnitureTransparencyData` / `restoreWiredFurnitureHighlightData`: applied without easing. */
    private restoreWiredEffects(object: IRoomObjectController, category: RoomObjectCategoryEnum): void {
        const key = `${category}:${object.id}`;
        const buffered = this._bufferedWiredEffects.get(key);

        if (!buffered) return;

        this._bufferedWiredEffects.delete(key);

        if (buffered.transparency) Room.applyWiredEffect(object, buffered.transparency, true);
        if (buffered.highlight) Room.applyWiredEffect(object, buffered.highlight, true);
    }

    /**
     * `captureWiredFurnitureTransparencyData` / `captureWiredFurnitureHighlightData`: a furni the invisible furni
     * manager takes away keeps its state; any other removal forgets it (`BufferedRoomObjectModelDataManager.clearObject`).
     */
    private captureOrClearWiredEffects(objectId: number, category: RoomObjectCategoryEnum, capture: boolean, capturedFrom: IRoomObjectController | undefined): void {
        const key = `${category}:${objectId}`;

        if (!capture) {
            this._bufferedWiredEffects.delete(key);

            return;
        }

        if (!capturedFrom?.isReady) return;

        const transparency = capturedFrom.model.getValue<WiredFurnitureTransparencyData | undefined>(RoomObjectVariableEnum.FurnitureWiredTransparencyData);
        const highlight = capturedFrom.model.getValue<WiredFurnitureHighlightData | undefined>(RoomObjectVariableEnum.FurnitureWiredHighlightData);

        if (transparency || highlight) this._bufferedWiredEffects.set(key, { transparency, highlight });
        else this._bufferedWiredEffects.delete(key);
    }

    public getRoomObjectScreenLocation(objectId: number, category: RoomObjectCategoryEnum): PointData | undefined {
        const roomObject = this.getRoomObject(objectId, category);

        if (!this._canvas || !roomObject) return undefined;

        const screenPoint = this._canvas.geometry.getScreenPoint(roomObject.getLocation());

        const transformScale = this._canvas.isFlipped ? -this._canvas.scale : this._canvas.scale;

        screenPoint.x = screenPoint.x * transformScale;
        screenPoint.y = screenPoint.y * transformScale;

        screenPoint.x += ((this._canvas.width >> 1) * transformScale) + this._canvas.screenOffsetX;
        screenPoint.y += ((this._canvas.height >> 1) * transformScale) + this._canvas.screenOffsetY;

        screenPoint.x = Math.round(screenPoint.x);
        screenPoint.y = Math.round(screenPoint.y);

        return screenPoint;
    }

    public async getRoomObjectImage(objectId: number, category: RoomObjectCategoryEnum, direction: IVector3D, scale: RoomGeometryScaleType): Promise<ImageLike | undefined> {
        const args = this.getRoomObjectImageArgs(objectId, category);

        if (!args) return undefined;

        return await GetRoomEngine().getGenericRoomObjectImage(args.type, args.value, direction, scale, undefined, args.extras, args.data);
    }

    private getRoomObjectImageArgs(objectId: number, category: RoomObjectCategoryEnum): { type: string; value: string; extras: number | undefined; data: IObjectData | undefined } | undefined {
        const roomObject = this.getRoomObject(objectId, category);

        if (!roomObject) return undefined;

        const type: string = roomObject.type;

        let value: string = '';
        let data: IObjectData | undefined = undefined;
        let extras: number | undefined = undefined;

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

        return { type, value, extras, data };
    }

    public async getRoomObjectPetImage(typeId: number, paletteId: number, color: number, direction: IVector3D, scale: RoomGeometryScaleType, headOnly: boolean = false, customParts: IPetCustomPart[] = [], posture: string | undefined = undefined): Promise<ImageLike | undefined> {
        const args = this.getRoomObjectPetImageArgs(typeId, paletteId, color, headOnly, customParts);

        if (!args) return undefined;

        return await GetRoomEngine().getGenericRoomObjectImage(args.type, args.value, direction, scale, undefined, 0, undefined, 0, 0, posture);
    }

    private getRoomObjectPetImageArgs(typeId: number, paletteId: number, color: number, headOnly: boolean, customParts: IPetCustomPart[]): { type: string; value: string } | undefined {
        const type = GetRoomContentLoader().getPetNameForType(typeId);

        if (!type) return undefined;

        return { type, value: petImageValue(typeId, paletteId, color, headOnly, customParts) };
    }

    public async setRoomOverlayIconSprite(objectId: number, category: RoomObjectCategoryEnum, realRoomObject: boolean, extra: string = '', posture: string = ''): Promise<void> {
        const roomContentLoader = GetRoomContentLoader();
        let type: string | undefined = undefined;
        let colorIndex = 0;

        // The overlay icon is a sprite in this canvas: render straight to a texture, never through a base64 `<img>`.
        const engine = GetRoomEngine();
        let texture: Texture | undefined = undefined;

        if (realRoomObject) {
            const args = this.getRoomObjectImageArgs(objectId, category);

            if (args) texture = await engine.getGenericRoomObjectTexture(args.type, args.value, new Vector3d(), RoomGeometryScaleType.Icon, undefined, args.extras, args.data);
        } else {
            if (category === RoomObjectCategoryEnum.Floor) {
                type = roomContentLoader.getFurnitureFloorNameForTypeId(objectId);
                colorIndex = roomContentLoader.getFurnitureFloorColorIndex(objectId);
            } else if (category === RoomObjectCategoryEnum.Wall) {
                type = roomContentLoader.getFurnitureWallNameForTypeId(objectId, extra);
                colorIndex = roomContentLoader.getFurnitureWallColorIndex(objectId);
            }

            if (category === RoomObjectCategoryEnum.Unit) {
                type = RoomObjectUserTypeUtils.getAvatarTypeName(objectId);

                if (type === RoomObjectUserTypeName.Pet) {
                    const petFigureData = new PetFigureData(extra);
                    const args = this.getRoomObjectPetImageArgs(petFigureData.typeId, petFigureData.paletteId, petFigureData.color, true, petFigureData.customParts);

                    if (args) texture = await engine.getGenericRoomObjectTexture(args.type, args.value, new Vector3d(180), RoomGeometryScaleType.ZoomedIn, undefined, 0, undefined, 0, 0, posture);
                } else {
                    texture = await engine.getGenericRoomObjectTexture(type!, extra, new Vector3d(180), RoomGeometryScaleType.ZoomedIn, undefined, 0, undefined, 0, 0, posture);
                }
            } else {
                texture = await engine.getGenericRoomObjectTexture(type!, colorIndex.toString(), new Vector3d(), RoomGeometryScaleType.Icon, undefined, 0, undefined, 0, 0, posture);
            }
        }

        if (!texture) return;

        this.removeRoomOverlayIconSprite();
        this.addRoomOverlayIconSprite(texture, Room.OVERLAY_ICON_SPRITE);
    }

    public setRoomOverlayIconSpriteVisibility(flag: boolean): void {
        const sprite = this.getRoomOverlayIconSprite();

        if (!sprite) return;

        sprite.visible = flag;
    }

    public removeRoomOverlayIconSprite(): void {
        const sprite = this.getRoomOverlayIconSprite();

        if (!sprite) return;

        const texture = (sprite instanceof Sprite) ? sprite.texture : undefined;

        sprite.parent?.removeChild(sprite);
        sprite.destroy();
        // The icon's render texture belongs to this sprite alone; one drawn this frame is still in the room's batch.
        if (texture) TextureUtils.destroyTexture(texture);
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

    public get objectHighLighter(): IRoomObjectHighLighter {
        return this._objectHighLighter;
    }

    public get isAreaSelectionMode(): boolean {
        return this._areaSelection.areaSelectionState !== RoomAreaSelectionManager.NOT_ACTIVE;
    }

    public get legacyGeometry(): ILegacyWallGeometry | undefined {
        return this._legacyGeometry;
    }

    public get isInitialized(): boolean {
        return this._isInitialized;
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

    /**
     * `RoomEngine.fixedUserLocation`: a user standing on bare floor is lifted onto the floor's
     * drawn altitude (half a tile up next to a raised neighbour) rather than the stacking height
     * the server sent. The stacking height is read off the map the UI lent this room; until it
     * has, or off the map, the location stays as given.
     */
    private fixedUserLocation(location: IVector3D): IVector3D;
    private fixedUserLocation(location: IVector3D | undefined): IVector3D | undefined;
    private fixedUserLocation(location: IVector3D | undefined): IVector3D | undefined {
        if (!location) return undefined;

        if (!this._legacyGeometry) return location;

        let z = location.z;
        const tileHeight = this.getTileHeight(location.x, location.y);
        const wallHeight = this._legacyGeometry.getHeight(location.x, location.y);

        if ((Math.abs(z - tileHeight) < 0.02) && (Math.abs(tileHeight - wallHeight) < 0.02)) {
            z = this._legacyGeometry.getFloorAltitude(location.x, location.y);
        }

        return new Vector3d(location.x, location.y, z);
    }

    private addRoomOverlayIconSprite(texture: Texture | undefined, label: string): void {
        if (!texture) return;

        let sprite = this.getRoomOverlayIconSprite();

        if (sprite) {
            texture.destroy(true);

            return;
        }

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
