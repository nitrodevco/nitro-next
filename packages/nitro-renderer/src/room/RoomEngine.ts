
import {
    GetObjectDataForFlags,
    IGetImageListener,
    IObjectData,
    IRoom,
    IRoomEngine,
    IRoomGeometry,
    IRoomObjectController,
    IVector3D,
    ObjectDataFlagsEnum,
    RoomGeometryScaleType,
    RoomObjectCategoryEnum,
    RoomObjectUserTypeName,
    RoomObjectVariableEnum,
    Vector3d
} from '@nitrodevco/nitro-api';
import { type ImageLike } from 'pixi.js';

import { PetFigureData } from '#renderer/session';
import { NumberBank } from '#renderer/utils';

import { GetRoomContentLoader } from './GetRoomContentLoader';
import { ObjectDataUpdateMessage } from './messages';
import { Room } from './Room';
import { RoomGeometry } from './utils';

export class RoomEngine implements IRoomEngine {
    public static TEMPORARY_ROOM_ID: number = -1;

    private _rooms: Map<number, IRoom> = new Map();
    private _imageObjectIdBank = new NumberBank(1000);
    private _imageListeners: Record<number, IGetImageListener[]> = {};

    public async init(): Promise<void> {
        await GetRoomContentLoader().init();
    }

    public createRoom(roomId: number): IRoom {
        let room = this._rooms.get(roomId);

        if (room) return room;

        room = new Room(roomId);

        this._rooms.set(roomId, room);

        return room;
    }

    /*
     * RoomEngine.disposeRoom in the SWF removes the instance from its map before
     * disposing it (`roomInstanceData.remove(identifier)`), so a later createRoom for
     * the same id builds a fresh room rather than handing back a disposed one.
     */
    public disposeRoom(roomId: number): void {
        const room = this._rooms.get(roomId);

        if (!room) return;

        this._rooms.delete(roomId);

        room.dispose();
    }

    public getFurnitureFloorIconUrl(typeId: number): string | undefined {
        const type = GetRoomContentLoader().getFurnitureFloorNameForTypeId(typeId);
        const color = GetRoomContentLoader().getFurnitureFloorColorIndex(typeId).toString();

        return GetRoomContentLoader().getAssetIconUrl(type, color);
    }

    public getFurnitureWallIconUrl(typeId: number, extra: string | undefined): string | undefined {
        const type = GetRoomContentLoader().getFurnitureWallNameForTypeId(typeId, extra);
        const color = GetRoomContentLoader().getFurnitureWallColorIndex(typeId).toString();

        return GetRoomContentLoader().getAssetIconUrl(type, color);
    }

    public async getGenericRoomObjectImage(
        type: string,
        value: string,
        direction: IVector3D,
        scale: RoomGeometryScaleType,
        listener: IGetImageListener | undefined = undefined,
        extras: number = NaN,
        objectData: IObjectData | undefined = undefined,
        state: number = -1,
        frameCount: number = -1,
        posture: string = '',
    ): Promise<ImageLike | undefined> {
        const room = this.getTemporaryRoom();

        if (!room) return undefined;

        let objectId = this._imageObjectIdBank.reserveNumber();
        const objectCategory = GetRoomContentLoader().getCategoryForType(type);

        if (objectId < 0) return undefined;

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

        if (!roomObject.isReady && listener) {
            let imageListeners = this._imageListeners[objectId];

            if (!imageListeners) {
                imageListeners = [];

                this._imageListeners[objectId] = imageListeners;
            }

            imageListeners.push(listener);

            roomObject.model.setValue<RoomGeometryScaleType>(RoomObjectVariableEnum.ImageQueryScale, scale);
        } else {
            room.removeRoomObject(objectId, objectCategory);

            this._imageObjectIdBank.freeNumber(objectId - 1);
        }

        geometry.dispose();

        return image;
    }

    public initalizeTemporaryObjectsByType(type: string, valid: boolean): void {
        const room = this.getTemporaryRoom();

        if (!room) return;

        room.reinitializeRoomObjectsByType(type);

        const objectCategory = GetRoomContentLoader().getCategoryForType(type);
        const objectManager = room.getRoomObjectManager(objectCategory);
        const roomObjects = objectManager?.getObjectsByType(type)?.getValues();

        if (!roomObjects?.length) return;

        let geometry: IRoomGeometry | undefined = undefined;
        let scale: RoomGeometryScaleType = RoomGeometryScaleType.None;

        for (const roomObject of roomObjects) {
            if (!roomObject?.model || roomObject.type !== type) continue;

            const imageScale = roomObject.model.getValue<RoomGeometryScaleType>(RoomObjectVariableEnum.ImageQueryScale);

            if (geometry && (scale !== imageScale)) {
                geometry.dispose();

                geometry = undefined;
            }

            if (!geometry) {
                scale = imageScale;

                geometry = new RoomGeometry(imageScale, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5));
            }

            roomObject.visualization.update(geometry, 0, true, false);

            const imageListeners = this._imageListeners[roomObject.id];

            if (imageListeners) {
                delete this._imageListeners[roomObject.id];

                const notify = async () => {
                    const image = await roomObject.visualization.getImage();

                    for (const listener of imageListeners) {
                        if (!listener) continue;

                        if (image) listener.imageReady(image);
                        else listener.imageFailed();
                    }
                }

                void notify();
            }
        }

        geometry?.dispose();
    }

    public getTemporaryRoom(): IRoom {
        return this.createRoom(RoomEngine.TEMPORARY_ROOM_ID);
    }
}
