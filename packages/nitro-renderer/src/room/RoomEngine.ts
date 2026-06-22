import type {
    IObjectData,
    IRoom,
    IRoomEngine,
    IRoomObjectController,
    IVector3D,
    RoomGeometryScaleType,
} from '@nitrodevco/nitro-api';
import {
    GetObjectDataForFlags,
    ObjectDataFlagsEnum,
    RoomObjectCategoryEnum,
    RoomObjectUserTypeName,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { type ImageLike } from 'pixi.js';

import { PetFigureData } from '../session';
import { NumberBank } from '../utils';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import { ObjectDataUpdateMessage } from './messages';
import { Room } from './Room';
import { RoomGeometry } from './utils';

export class RoomEngine implements IRoomEngine {
    public static TEMORARY_ROOM_ID: number = -1;

    private _rooms: Map<number, IRoom> = new Map();
    private _imageObjectIdBank = new NumberBank(1000);

    public async init(): Promise<void> {
        await GetRoomContentLoader().init();
    }

    public createRoom(roomId: number): IRoom {
        let room = this._rooms.get(roomId);

        if (room) return room;

        room = new Room(roomId);

        room.prepareRoom();

        this._rooms.set(roomId, room);

        return room;
    }

    public async getGenericRoomObjectImage(
        type: string,
        value: string,
        direction: IVector3D,
        scale: RoomGeometryScaleType,
        extras: number = NaN,
        objectData: IObjectData | undefined = undefined,
        state: number = -1,
        frameCount: number = -1,
        posture: string = '',
    ): Promise<ImageLike | undefined> {
        const room = this.getTemporaryRoom();

        let objectId = this._imageObjectIdBank.reserveNumber();
        const objectCategory = GetRoomContentLoader().getCategoryForType(type);

        objectId++;

        const roomObject = (room.createRoomObjectAndInitalize(
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
                    type === RoomObjectUserTypeName.User ||
                    type === RoomObjectUserTypeName.Bot ||
                    type === RoomObjectUserTypeName.RentableBot ||
                    type === RoomObjectUserTypeName.Pet
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

    public getTemporaryRoom(): IRoom {
        return this.createRoom(RoomEngine.TEMORARY_ROOM_ID);
    }
}
