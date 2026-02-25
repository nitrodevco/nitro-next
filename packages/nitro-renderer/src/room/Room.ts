import type {
    IFurnitureStackingHeightMap,
    ILegacyWallGeometry,
    IObjectData,
    IRoom,
    IRoomGeometry,
    IRoomInstance,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    ISelectedRoomObjectData,
    ITileObjectMap,
    IVector3D,
} from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectCategoryEnum, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetConfigValue } from '@nitrodevco/nitro-shared';
import type { Container } from 'pixi.js';
import { Point } from 'pixi.js';

import { GetTickerTime } from '../utils';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import {
    ObjectDataUpdateMessage,
    ObjectHeightUpdateMessage,
    ObjectRoomMaskUpdateMessage,
    ObjectRoomUpdateMessage,
    RoomObjectUpdateMessage,
} from './messages';
import { RoomLogic } from './object';
import { RoomRenderer } from './renderer';
import { RoomCamera } from './utils';
import { type RoomFurnitureData, TileObjectMap } from './utils';

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

    private _modelName: string;
    private _legacyGeometry: ILegacyWallGeometry;
    private _tileObjectMap: ITileObjectMap;
    private _selectedObject: ISelectedRoomObjectData;
    private _placedObject: ISelectedRoomObjectData;
    private _furnitureStackingHeightMap: IFurnitureStackingHeightMap;

    private _floorStack: Map<number, RoomFurnitureData> = new Map();
    private _wallStack: Map<number, RoomFurnitureData> = new Map();
    private _mouseButtonCursorOwners: string[] = [];

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

    constructor(roomId: number, instance: IRoomInstance) {
        this._roomId = roomId;
        this._instance = instance;
    }

    public async prepareRoom(): Promise<boolean> {
        this._instance.model.setValue(RoomObjectVariableEnum.RoomIsPublic, 0);
        this._instance.model.setValue(RoomObjectVariableEnum.RoomZScale, 1);

        await this._instance.createRoomObjectAndInitalize(
            Room.CURSOR_OBJECT_ID,
            Room.CURSOR_OBJECT_TYPE,
            RoomObjectCategoryEnum.Cursor,
        );

        if (GetConfigValue('renderer.avatarArrowEnabled', false))
            await this._instance.createRoomObjectAndInitalize(
                Room.ARROW_OBJECT_ID,
                Room.ARROW_OBJECT_TYPE,
                RoomObjectCategoryEnum.Cursor,
            );

        return true;
    }

    public getRoomDisplay(canvasId: number, width: number, height: number, scale: number): Container | undefined {
        let renderer = this._instance.renderer;

        if (!renderer) {
            renderer = new RoomRenderer();

            renderer.roomObjectVariableAccurateZ = RoomObjectVariableEnum.ObjectAccurateZValue;

            this._instance.setRenderer(renderer);
        }

        const canvas = renderer.createCanvas(canvasId, width, height, scale);
        //canvas.setMouseListener(this._room); TODO MOUSE

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
            roomObject = (await this._instance.createRoomObjectAndInitalize(
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
        const canvas = this._instance.renderer.getCanvas(1);

        if (!canvas) return;

        /*  const overlay = this.getRenderingCanvasOverlay(canvas);
        const sprite = this.getOverlayIconSprite(overlay, RoomEngine.OBJECT_ICON_SPRITE);

        if (sprite) {
            const rectangle = sprite.getLocalBounds();

            sprite.x = x - rectangle.width / 2;
            sprite.y = y - rectangle.height / 2;
        } */

        if (
            !this.handleRoomDragging(x, y, type, altKey, ctrlKey, shiftKey) &&
            !canvas.handleMouseEvent(x, y, type, altKey, ctrlKey, shiftKey, buttonDown)
        ) {
            /* let eventType: string = null;

            if (type === MouseEventType.MOUSE_CLICK) {
                EventStore.getState().emit(
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
            else if (type === MouseEventType.MOUSE_UP) eventType = RoomObjectMouseEvent.MOUSE_UP; */
            /* this._roomObjectEventHandler.handleRoomObjectEvent(
                new RoomObjectMouseEvent(
                    eventType,
                    this.getRoomObject(this._activeRoomId, RoomEngine.ROOM_OBJECT_ID, RoomObjectCategory.ROOM),
                    null,
                    altKey,
                ),
                this._activeRoomId,
            ); */
        }

        this._canvasMouseX = x;
        this._canvasMouseY = y;
    }

    public getGeometry(canvasId: number = -1): IRoomGeometry | undefined {
        return this._instance?.renderer?.getCanvas(canvasId)?.geometry;
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

        return this._instance.getRoomObject(objectId, category) as IRoomObjectController;
    }

    public removeRoomObject(objectId: number, category: number): void {
        this._instance.removeRoomObject(objectId, category);

        /* EventStore.getState().emit(
            new RoomEngineObjectEvent(RoomEngineObjectEvent.REMOVED, roomId, objectId, category),
        ); */
    }

    public async createRoomObjectFloor(id: number, type: string): Promise<IRoomObject | undefined> {
        return this._instance.createRoomObjectAndInitalize(id, type, RoomObjectCategoryEnum.Floor);
    }

    public updateRoomObjectFloor(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        data: IObjectData,
        extra: number = -1,
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
            this.getFurnitureFloorName(typeId),
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
            roomObject.model.setValue(RoomObjectVariableEnum.FurnitureColor, this.getFurnitureFloorColorIndex(typeId));
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

        const selectedRoomObjectData = this._placedObject;

        if (
            selectedRoomObjectData &&
            selectedRoomObjectData.id === id &&
            selectedRoomObjectData.category === RoomObjectCategoryEnum.Floor
        ) {
            //this.selectRoomObject(roomId, id, RoomObjectCategory.FLOOR);
        }

        //if (roomObject.isReady && data.synchronized) this.addObjectToTileMap(roomId, object);

        return true;
    }

    public setSelectedObject(data: ISelectedRoomObjectData): void {
        if (this._selectedObject) {
            this._selectedObject.dispose();
        }

        this._selectedObject = data;
    }

    public setPlacedObject(data: ISelectedRoomObjectData): void {
        if (this._placedObject) {
            this._placedObject.dispose();
        }

        this._placedObject = data;
    }

    public setFurnitureStackingHeightMap(heightMap: IFurnitureStackingHeightMap): void {
        if (this._furnitureStackingHeightMap) this._furnitureStackingHeightMap.dispose();

        this._furnitureStackingHeightMap = heightMap;

        if (this._tileObjectMap) this._tileObjectMap.dispose();

        if (this._furnitureStackingHeightMap) {
            this._tileObjectMap = new TileObjectMap(
                this._furnitureStackingHeightMap.width,
                this._furnitureStackingHeightMap.height,
            );
        }
    }

    public addButtonMouseCursorOwner(k: string): boolean {
        const _local_2 = this._mouseButtonCursorOwners.indexOf(k);

        if (_local_2 === -1) {
            this._mouseButtonCursorOwners.push(k);

            return true;
        }

        return false;
    }

    public removeButtonMouseCursorOwner(k: string): boolean {
        const _local_2 = this._mouseButtonCursorOwners.indexOf(k);

        if (_local_2 > -1) {
            this._mouseButtonCursorOwners.splice(_local_2, 1);

            return true;
        }

        return false;
    }

    public hasButtonMouseCursorOwners(): boolean {
        return this._mouseButtonCursorOwners.length > 0;
    }

    public getRoomValue<T>(key: RoomObjectVariableEnum): T {
        return this._instance?.model.getValue(key);
    }

    public update(time: number, update: boolean = false): void {
        this._instance.update(time, update);

        if (this._wasDragged) {
            const canvas = this._instance.renderer.getCanvas(1);

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

    public getFurnitureFloorName(typeId: number): string {
        return GetRoomContentLoader().getFurnitureFloorNameForTypeId(typeId);
    }

    public getFurnitureFloorColorIndex(typeId: number): number {
        return GetRoomContentLoader().getFurnitureFloorColorIndex(typeId);
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get modelName(): string {
        return this._modelName;
    }

    public get legacyGeometry(): ILegacyWallGeometry {
        return this._legacyGeometry;
    }

    public get tileObjectMap(): ITileObjectMap {
        return this._tileObjectMap;
    }

    public get selectedObject(): ISelectedRoomObjectData {
        return this._selectedObject;
    }

    public get placedObject(): ISelectedRoomObjectData {
        return this._placedObject;
    }

    public get furnitureStackingHeightMap(): IFurnitureStackingHeightMap {
        return this._furnitureStackingHeightMap;
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

        const canvas = this._instance.renderer.getCanvas(1)!;

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
