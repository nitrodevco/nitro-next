import type {
    IEventDispatcher,
    IGraphicAssetCollection,
    IObjectData,
    IRoom,
    IRoomEventHandler,
    IRoomGeometry,
    IRoomInstance,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    IVector3D,
} from '@nitrodevco/nitro-api';
import {
    GetObjectDataForFlags,
    MouseEventType,
    RoomControllerLevelEnum,
    RoomObjectCategoryEnum,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import {
    EventDispatcher,
    GetConfigValue,
    RoomEngineObjectEvent,
    RoomObjectMouseEvent,
    SessionStore,
} from '@nitrodevco/nitro-shared';
import type { Container, PointData } from 'pixi.js';
import { Point } from 'pixi.js';

import { FurniId, GetTickerTime } from '../utils';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomObjectLogicFactory } from './GetRoomObjectLogicFactory';
import { GetRoomObjectVisualizationFactory } from './GetRoomObjectVisualizationFactory';
import {
    ObjectDataUpdateMessage,
    ObjectHeightUpdateMessage,
    ObjectRoomMaskUpdateMessage,
    ObjectRoomUpdateMessage,
    RoomObjectUpdateMessage,
} from './messages';
import { RoomLogic } from './object';
import { RoomEventHandler } from './RoomEventHandler';
import { RoomCamera } from './utils';
import { type RoomFurnitureData } from './utils';

export class Room implements IRoom {
    public static ROOM_OBJECT_ID: number = -1;
    public static ROOM_OBJECT_TYPE: string = 'room';
    public static CURSOR_OBJECT_ID: number = -2;
    public static CURSOR_OBJECT_TYPE: string = 'tile_cursor';
    public static ARROW_OBJECT_ID: number = -3;
    public static ARROW_OBJECT_TYPE: string = 'selection_arrow';
    public static OVERLAY: string = 'overlay';
    public static OBJECT_ICON_SPRITE: string = 'object_icon_sprite';

    private static DRAG_THRESHOLD: number = 15;

    private _roomId: number;
    private _instance: IRoomInstance;
    private _eventDispatcher: IEventDispatcher;
    private _eventHandler: IRoomEventHandler;

    private _modelName: string;

    private _floorStack: Map<number, RoomFurnitureData> = new Map();
    private _wallStack: Map<number, RoomFurnitureData> = new Map();

    private _camera: RoomCamera = new RoomCamera();
    private _canvasMouseX: number = 0;
    private _canvasMouseY: number = 0;
    private _isDragged: boolean = false;
    private _wasDragged: boolean = false;
    private _dragStartX: number = 0;
    private _dragStartY: number = 0;
    private _dragX: number = 0;
    private _dragY: number = 0;
    private _canDrag: boolean = true;
    private _roomDraggingAlwaysCenters: boolean = false;
    private _mouseCursorUpdate: boolean = false;

    constructor(roomId: number, instance: IRoomInstance) {
        this._roomId = roomId;
        this._instance = instance;
        this._eventDispatcher = new EventDispatcher();
        this._eventHandler = new RoomEventHandler(this);
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

    public getRoomDisplay(width: number, height: number, scale: number): Container | undefined {
        if (!this._instance.canvas) {
            this._instance.roomObjectVariableAccurateZ = RoomObjectVariableEnum.ObjectAccurateZValue;
        }

        this._instance.roomObjectVariableAccurateZ = RoomObjectVariableEnum.ObjectAccurateZValue;

        const canvas = this._instance.createCanvas(width, height, scale);

        canvas.setEventHandler(this._eventHandler);

        if (canvas.geometry) {
            canvas.geometry.z_scale = this._instance.model.getValue(RoomObjectVariableEnum.RoomZScale);

            const doorX = this._instance.model.getValue<number>(RoomObjectVariableEnum.RoomDoorX);
            const doorY = this._instance.model.getValue<number>(RoomObjectVariableEnum.RoomDoorY);
            const doorZ = this._instance.model.getValue<number>(RoomObjectVariableEnum.RoomDoorZ);
            const doorDirection = this._instance.model.getValue<number>(RoomObjectVariableEnum.RoomDoorDir);
            const vector = new Vector3d(doorX, doorY, doorZ);

            let direction: IVector3D | undefined = undefined;

            if (doorDirection === 90) direction = new Vector3d(-2000, 0, 0);

            if (doorDirection === 180) direction = new Vector3d(0, -2000, 0);

            if (direction) canvas.geometry.setDisplacement(vector, direction);
        }

        return canvas.master;
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

                    roomObject.logic.processUpdateMessage(
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
            roomObject.logic.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE, floorType),
            );
            this._instance.model.setValue(RoomObjectVariableEnum.RoomFloorType, floorType);
        }

        if (wallType) {
            roomObject.logic.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_WALL_UPDATE, wallType),
            );
            this._instance.model.setValue(RoomObjectVariableEnum.RoomWallType, wallType);
        }

        if (landscapeType) {
            roomObject.logic.processUpdateMessage(
                new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE, landscapeType),
            );
            this._instance.model.setValue(RoomObjectVariableEnum.RoomLandscapeType, landscapeType);
        }
    }

    public dispatchMouseEvent(
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        buttonDown: boolean,
    ): void {
        /*  const overlay = this.getRenderingCanvasOverlay(canvas);
        const sprite = this.getOverlayIconSprite(overlay, RoomEngine.OBJECT_ICON_SPRITE);

        if (sprite) {
            const rectangle = sprite.getLocalBounds();

            sprite.x = x - rectangle.width / 2;
            sprite.y = y - rectangle.height / 2;
        } */

        if (
            !this.handleRoomDragging(x, y, type, altKey, ctrlKey, shiftKey) &&
            !this._instance.canvas?.handleMouseEvent(x, y, type, altKey, ctrlKey, shiftKey, buttonDown)
        ) {
            let eventType: string = '';

            if (type === MouseEventType.MOUSE_CLICK) {
                this._eventDispatcher.dispatchEvent(
                    new RoomEngineObjectEvent(
                        RoomEngineObjectEvent.DESELECTED,
                        this._roomId,
                        -1,
                        RoomObjectCategoryEnum.Minimum,
                    ),
                );

                eventType = RoomObjectMouseEvent.CLICK;
            } else if (type === MouseEventType.MOUSE_MOVE) eventType = RoomObjectMouseEvent.MOUSE_MOVE;
            else if (type === MouseEventType.MOUSE_DOWN) eventType = RoomObjectMouseEvent.MOUSE_DOWN;
            else if (type === MouseEventType.MOUSE_DOWN_LONG) eventType = RoomObjectMouseEvent.MOUSE_DOWN_LONG;
            else if (type === MouseEventType.MOUSE_UP) eventType = RoomObjectMouseEvent.MOUSE_UP;

            this._eventHandler.handleRoomObjectEvent(
                new RoomObjectMouseEvent(
                    eventType,
                    this.getRoomObject(Room.ROOM_OBJECT_ID, RoomObjectCategoryEnum.Room),
                    -1,
                    altKey,
                    ctrlKey,
                    shiftKey,
                    buttonDown,
                ),
            );
        }

        this._canvasMouseX = x;
        this._canvasMouseY = y;
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

    public removeRoomObject(objectId: number, category: RoomObjectCategoryEnum): void {
        this._instance.removeRoomObject(objectId, category);

        this._eventDispatcher.dispatchEvent(
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

                    const logic = GetRoomObjectLogicFactory().getLogic(logicType);

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

    public updateRoomObjectFloor(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        data: IObjectData,
        extra: number = NaN,
    ): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

        if (!object) return false;

        object.processUpdateMessage(new RoomObjectUpdateMessage(location, direction));
        object.processUpdateMessage(new ObjectDataUpdateMessage(state, data, extra));

        return true;
    }

    public updateRoomObjectFloorHeight(objectId: number, height: number): boolean {
        const object = this.getRoomObject(objectId, RoomObjectCategoryEnum.Floor);

        if (!object) return false;

        object.processUpdateMessage(new ObjectHeightUpdateMessage(undefined, undefined, height));

        return true;
    }

    public async addFurnitureByTypeId(
        id: number,
        typeId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData: IObjectData,
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
        objectData: IObjectData,
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

        //EventStore.getState().emit(new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, roomId, id, RoomObjectCategory.FLOOR));

        const selectedRoomObjectData = this._instance.placedObject;

        if (
            selectedRoomObjectData &&
            selectedRoomObjectData.id === id &&
            selectedRoomObjectData.category === RoomObjectCategoryEnum.Floor
        ) {
            //this.selectRoomObject(roomId, id, RoomObjectCategory.FLOOR);
        }

        if (roomObject?.isReady && synchronized) this._instance.tileObjectMap.addRoomObject(roomObject);

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
        this.setMouseDefault(objectId, RoomObjectCategoryEnum.Floor);

        if (_arg_4)
            this._instance.tileObjectMap?.populate(
                this._instance.getRoomObjectsForCategory(RoomObjectCategoryEnum.Floor),
            );
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

    public update(time: number, update: boolean = false): void {
        this._instance.update(time, update);

        if (this._wasDragged) {
            const canvas = this._instance.canvas;

            if (!canvas) return;

            const point = new Point(canvas.screenOffsetX + this._dragX, canvas.screenOffsetY + this._dragY);

            const x = ~~point.x;
            const y = ~~point.y;

            canvas.screenOffsetX = x;
            canvas.screenOffsetY = y;

            this._dragX = 0;
            this._dragY = 0;
        }
    }

    public getRoomObjectCursor(): IRoomObjectController {
        return this.getRoomObject(Room.CURSOR_OBJECT_ID, RoomObjectCategoryEnum.Cursor);
    }

    private setPointer(): void {
        this._mouseCursorUpdate = false;

        document.body.style.cursor = this._instance.hasButtonMouseCursorOwners() ? 'pointer' : 'auto';
    }

    public updateMousePointer(type: string, objectId: number, objectType: string): void {
        /* const category = this.getRoomObjectCategoryForType(objectType);

        switch (type) {
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                this.setMouseButton(category, objectId);
                return;
            default:
                this.setMouseDefault(this._activeRoomId, category, objectId);
                return;
        } */
    }

    private setMouseButton(objectId: number, category: RoomObjectCategoryEnum): void {
        const sessionControllerLevel = RoomControllerLevelEnum.Guest;

        if (
            (category !== RoomObjectCategoryEnum.Floor && category !== RoomObjectCategoryEnum.Wall) ||
            sessionControllerLevel >= RoomControllerLevelEnum.Guest
        ) {
            this._instance.addButtonMouseCursorOwner(`${category}_${objectId}`);

            this._mouseCursorUpdate = true;
        }
    }

    private setMouseDefault(objectId: number, category: RoomObjectCategoryEnum): void {
        this._instance.removeButtonMouseCursorOwner(`${category}_${objectId}`);

        this._mouseCursorUpdate = true;
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

    public get isDecorating(): boolean {
        return false;
    }

    private handleRoomDragging(
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
    ): boolean {
        //if (this.isPlayingGame()) return false;

        /* if (this._areaSelectionManager.areaSelectionState === RoomAreaSelectionManager.SELECTING) {
            this._isDragged = false;
            this._wasDragged = false;

            return false;
        } */

        const canvas = this._instance?.canvas;

        if (!canvas) return false;

        let offsetX = x - this._canvasMouseX;
        let offsetY = y - this._canvasMouseY;

        if (type === MouseEventType.MOUSE_DOWN) {
            if (!altKey && !ctrlKey && !shiftKey && !this.isDecorating) {
                if (this._canDrag) {
                    this._isDragged = true;
                    this._wasDragged = false;
                    this._dragStartX = this._canvasMouseX;
                    this._dragStartY = this._canvasMouseY;
                }
            }
        } else if (type === MouseEventType.MOUSE_UP) {
            if (this._isDragged) {
                this._isDragged = false;

                if (this._wasDragged) {
                    if (!this._camera.isMoving) {
                        this._camera.centeredLocX = false;
                        this._camera.centeredLocY = false;
                    }

                    this._camera.resetLocation(new Vector3d(-canvas.screenOffsetX, -canvas.screenOffsetY));

                    if (this._roomDraggingAlwaysCenters) this._camera.reset();

                    /* const instanceData = this.getRoomInstanceData(this._activeRoomId);

                    if (instanceData) {
                        const camera = instanceData.roomCamera;

                        if (camera) {
                            if (this.useOffsetScrolling) {
                                if (!camera.isMoving) {
                                    camera.centeredLocX = false;
                                    camera.centeredLocY = false;
                                }

                                camera.resetLocation(new Vector3d(-canvas.screenOffsetX, -canvas.screenOffsetY));
                            }

                            if (this._roomDraggingAlwaysCenters) camera.reset();
                        }
                    } */
                }
            }
        } else if (type === MouseEventType.MOUSE_MOVE) {
            if (this._isDragged) {
                if (!this._wasDragged) {
                    offsetX = x - this._dragStartX;
                    offsetY = y - this._dragStartY;

                    if (
                        offsetX <= -Room.DRAG_THRESHOLD ||
                        offsetX >= Room.DRAG_THRESHOLD ||
                        offsetY <= -Room.DRAG_THRESHOLD ||
                        offsetY >= Room.DRAG_THRESHOLD
                    ) {
                        this._wasDragged = true;
                    }

                    offsetX = 0;
                    offsetY = 0;
                }

                if (!(offsetX == 0) || !(offsetY == 0)) {
                    this._dragX += offsetX;
                    this._dragY += offsetY;

                    this._wasDragged = true;
                }
            }
        } else if (type === MouseEventType.MOUSE_CLICK || type === MouseEventType.DOUBLE_CLICK) {
            this._isDragged = false;

            if (this._wasDragged) {
                this._wasDragged = false;

                return true;
            }
        }

        return false;
    }
}
