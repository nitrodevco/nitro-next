import type {
    IObjectData,
    IRoom,
    IRoomEngine,
    IRoomManager,
    IRoomObject,
    IRoomObjectController,
    IVector3D,
} from '@nitrodevco/nitro-api';
import {
    GetObjectDataForFlags,
    ObjectDataFlagsEnum,
    RoomObjectCategoryEnum,
    RoomObjectUserType,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import type { RoomObjectEvent } from '@nitrodevco/nitro-shared';
import type { ImageLike, Ticker } from 'pixi.js';

import { PetFigureData } from '../session';
import { NumberBank } from '../utils';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomObjectLogicFactory } from './GetRoomObjectLogicFactory';
import { ObjectDataUpdateMessage } from './messages';
import { Room } from './Room';
import { RoomEnterEffect, RoomGeometry } from './utils';

export class RoomEngine implements IRoomEngine {
    public static ROOM_OBJECT_ID: number = -1;
    public static ROOM_OBJECT_TYPE: string = 'room';
    public static CURSOR_OBJECT_ID: number = -2;
    public static CURSOR_OBJECT_TYPE: string = 'tile_cursor';
    public static ARROW_OBJECT_ID: number = -3;
    public static ARROW_OBJECT_TYPE: string = 'selection_arrow';
    public static OVERLAY: string = 'overlay';
    public static OBJECT_ICON_SPRITE: string = 'object_icon_sprite';
    public static TEMORARY_ROOM_ID: number = -1;

    private _roomManager: IRoomManager;

    private _rooms: Map<number, IRoom> = new Map();
    private _imageObjectIdBank = new NumberBank(1000);

    private _isPlayingGame: boolean = false;
    private _moveBlocked: boolean = false;

    constructor(roomManager: IRoomManager) {
        this._roomManager = roomManager;
    }

    public async init(): Promise<void> {
        GetRoomObjectLogicFactory().registerEventFunction(
            event => void this.processRoomObjectEvent(event as RoomObjectEvent),
        );

        await GetRoomContentLoader().init();
    }

    public update(ticker: Ticker): void {
        const time = ticker.lastTime;
        const update = false;

        RoomEnterEffect.turnVisualizationOn();

        //this.processPendingFurniture();

        for (const room of this._rooms.values()) room.update(time, update);

        //this.updateRoomCameras(time);

        //if (this._mouseCursorUpdate) this.setPointer();

        RoomEnterEffect.turnVisualizationOff();
    }

    public async createRoom(roomId: number): Promise<IRoom> {
        let room = this._rooms.get(roomId);

        if (room) return room;

        const instance = this._roomManager.createRoomInstance(roomId);

        if (!instance) throw new Error('invalid_instance');

        room = new Room(roomId, instance);

        await room.prepareRoom();

        this._rooms.set(roomId, room);

        return room;
    }

    public async getGenericRoomObjectImage(
        type: string,
        value: string,
        direction: IVector3D,
        scale: number,
        extras: number = NaN,
        objectData: IObjectData | undefined = undefined,
        state: number = -1,
        frameCount: number = -1,
        posture: string = '',
    ): Promise<ImageLike | undefined> {
        const room = await this.getTemporaryRoom();

        let objectId = this._imageObjectIdBank.reserveNumber();
        const objectCategory = GetRoomContentLoader().getCategoryForType(type);

        objectId++;

        const roomObject = (await room.createRoomObjectAndInitalize(
            objectId,
            type,
            objectCategory,
        )) as IRoomObjectController;

        if (!roomObject) return undefined;

        const model = roomObject.model;

        switch (objectCategory) {
            case RoomObjectCategoryEnum.Floor:
            case RoomObjectCategoryEnum.Wall:
                model.setValue(RoomObjectVariableEnum.FurnitureColor, parseInt(value));
                model.setValue(RoomObjectVariableEnum.FurnitureExtras, extras);

                if (state > -1) model.setValue(RoomObjectVariableEnum.FurnitureData, state.toString());
                break;
            case RoomObjectCategoryEnum.Unit:
                if (
                    type === RoomObjectUserType.USER ||
                    type === RoomObjectUserType.BOT ||
                    type === RoomObjectUserType.RENTABLE_BOT ||
                    type === RoomObjectUserType.PET
                ) {
                    model.setValue(RoomObjectVariableEnum.Figure, value);
                } else {
                    const figureData = new PetFigureData(value);

                    model.setValue(RoomObjectVariableEnum.PetPaletteIndex, figureData.paletteId);
                    model.setValue(RoomObjectVariableEnum.PetColor, figureData.color);

                    if (figureData.headOnly) model.setValue(RoomObjectVariableEnum.PetHeadOnly, 1);

                    if (figureData.hasCustomParts) {
                        model.setValue(RoomObjectVariableEnum.PetCustomLayerIds, figureData.customLayerIds);
                        model.setValue(RoomObjectVariableEnum.PetCustomPartsIds, figureData.customPartIds);
                        model.setValue(RoomObjectVariableEnum.PetCustomPaletteIds, figureData.customPaletteIds);
                    }

                    if (posture) model.setValue(RoomObjectVariableEnum.FigurePosture, posture);
                }
                break;
            case RoomObjectCategoryEnum.Room:
                break;
        }

        roomObject.setDirection(direction);

        if (!objectData) {
            objectData = GetObjectDataForFlags(ObjectDataFlagsEnum.Legacy)!;
            objectData.initializeFromRoomObjectModel(roomObject.model);
        }

        roomObject.processUpdateMessage(
            new ObjectDataUpdateMessage(parseInt(objectData.getLegacyString()), objectData),
        );

        const geometry = new RoomGeometry(scale, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5));

        roomObject.visualization.update(geometry, 0, true, false);

        if (frameCount > 0) {
            let i = 0;

            while (i < frameCount) {
                roomObject.visualization.update(geometry, 0, true, false);

                i++;
            }
        }

        const image = await roomObject.visualization.getImage();

        geometry.dispose();

        return image;
    }

    public getTemporaryRoom(): Promise<IRoom> {
        return this.createRoom(RoomEngine.TEMORARY_ROOM_ID);
    }

    private processRoomObjectEvent(event: RoomObjectEvent): void {
        const roomId = this.getRoomObjectRoomId(event.object);

        if (roomId === undefined) return;

        const room = this._rooms.get(roomId);

        void room?.eventHandler.handleRoomObjectEvent(event);
    }

    private getRoomObjectRoomId(object: IRoomObject): number | undefined {
        return object.model.getValue<number>(RoomObjectVariableEnum.ObjectRoomId) ?? undefined;
    }

    public whereYouClickIsWhereYouGo(): boolean {
        return true;
    }

    public get moveBlocked(): boolean {
        return this._moveBlocked;
    }

    public set moveBlocked(value: boolean) {
        this._moveBlocked = value;
    }
}
