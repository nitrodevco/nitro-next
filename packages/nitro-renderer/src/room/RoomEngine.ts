import type { IRoomInstance, IRoomObjectController, IRoomRenderer, IVector3D } from '@nitrodevco/nitro-api';
import { RoomObjectCategory, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetConfigValue } from '@nitrodevco/nitro-shared';
import { Container } from 'pixi.js';

import { ObjectRoomMaskUpdateMessage, ObjectRoomUpdateMessage } from './messages';
import { RoomLogic, type RoomMapData } from './object';
import { RoomRenderer } from './renderer';

export class RoomEngine {
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

    constructor(roomId: number, instance: IRoomInstance) {
        this._roomId = roomId;
        this._instance = instance;
    }

    public async prepareRoom(roomMap: RoomMapData): Promise<boolean> {
        const floorType = '111';
        const wallType = '201';
        const landscapeType = '1';

        const roomObject = (await this._instance.createRoomObjectAndInitalize(
            RoomEngine.ROOM_OBJECT_ID,
            RoomEngine.ROOM_OBJECT_TYPE,
            RoomObjectCategory.ROOM,
        )) as IRoomObjectController;

        if (!roomObject) return false;

        this._instance.model.setValue(RoomObjectVariableEnum.RoomIsPublic, 0);
        this._instance.model.setValue(RoomObjectVariableEnum.RoomZScale, 1);

        if (!(roomObject.logic instanceof RoomLogic)) return false;

        if (roomMap) {
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
        }

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

        await this._instance.createRoomObjectAndInitalize(
            RoomEngine.CURSOR_OBJECT_ID,
            RoomEngine.CURSOR_OBJECT_TYPE,
            RoomObjectCategory.CURSOR,
        );

        if (GetConfigValue('renderer.avatarArrowEnabled', false))
            await this._instance.createRoomObjectAndInitalize(
                RoomEngine.ARROW_OBJECT_ID,
                RoomEngine.ARROW_OBJECT_TYPE,
                RoomObjectCategory.CURSOR,
            );

        return true;
    }

    public getRoomDisplay(canvasId: number, width: number, height: number, scale: number): Container | undefined {
        let renderer = this._instance.renderer as IRoomRenderer;

        if (!renderer) {
            renderer = new RoomRenderer();
        }

        renderer.roomObjectVariableAccurateZ = RoomObjectVariableEnum.ObjectAccurateZValue;

        this._instance.setRenderer(renderer);

        const canvas = renderer.createCanvas(canvasId, width, height, scale);

        if (canvas) {
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

                const displayObject = canvas.master;

                if (displayObject) {
                    const overlay = new Container();

                    overlay.label = RoomEngine.OVERLAY;

                    displayObject.addChild(overlay);
                }
            }
        }

        return canvas?.master;
    }
}
