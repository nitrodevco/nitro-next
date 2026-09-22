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
    Vector3d,
} from '@nitrodevco/nitro-api';
import { ImageLike, Texture, Ticker, UPDATE_PRIORITY } from 'pixi.js';

import { PetFigureData } from '#renderer/session';
import { GetTicker, NumberBank, TextureUtils } from '#renderer/utils';

import { GetRoomContentLoader } from './GetRoomContentLoader';
import { ObjectDataUpdateMessage, ObjectRoomMaskUpdateMessage } from './messages';
import { RoomLogic, RoomPlaneParser } from './object';
import { RefreshVariableFxRendererMappings } from './object/variablefx/VariableFxRoomData';
import { GetVariableFxAssetLibrary } from './object/visualization/variablefx/VariableFxAssetLibrary';
import { Room } from './Room';
import { RoomGeometry } from './utils';

export class RoomEngine implements IRoomEngine {
    public static TEMPORARY_ROOM_ID: number = -1;

    private _rooms: Map<number, IRoom> = new Map();
    private _imageObjectIdBank = new NumberBank(1000);
    private _imageListeners: Record<number, IGetImageListener[]> = {};
    private _tick = (ticker: Ticker) => this.update(ticker.lastTime);
    private _ticking: boolean = false;

    public async init(): Promise<void> {
        await GetRoomContentLoader().init();

        // The Variable FX atlas is not needed for the first frame; statuses that arrive before it
        // has loaded are kept by their stack additions and drawn once it is ready.
        void GetVariableFxAssetLibrary().load().then((loaded) => {
            if (loaded) RefreshVariableFxRendererMappings();
        });

        this.start();
    }

    /**
     * Registers the single room tick on the shared ticker. It runs at HIGH priority so every
     * room's objects and sprite canvas are advanced before the NORMAL-priority presentation
     * work registered by the UI (camera, preview centring, DOM blits) and before Pixi's own
     * LOW-priority render of the frame.
     */
    public start(): void {
        if (this._ticking) return;

        this._ticking = true;

        GetTicker().add(this._tick, undefined, UPDATE_PRIORITY.HIGH);
    }

    public stop(): void {
        if (!this._ticking) return;

        this._ticking = false;

        GetTicker().remove(this._tick);
    }

    /** Advances every room that is being drawn (has a canvas): the main room and any previewers alike. */
    public update(time: number): void {
        for (const room of this._rooms.values()) {
            if (!room.canvas) continue;

            room.update(time);
        }
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
        const texture = await this.getGenericRoomObjectTexture(type, value, direction, scale, listener, extras, objectData, state, frameCount, posture);

        if (!texture) return undefined;

        const image = await TextureUtils.generateImage(texture);

        texture.destroy(true);

        return image;
    }

    /**
     * Flash `RoomEngine.getRoomImage`, as a texture: a small room with these floor, wall and
     * landscape types, rendered as a `room` object of the temporary room. The planes and the types
     * travel in the object's value (`<floor>\n<wall>\n<landscape>\n<window>`), which
     * `initializeRoomForGettingImage` reads back; `windowType` cuts that window's mask into the
     * wall, the way the catalogue's spaces preview shows its landscape through one.
     */
    public getRoomTexture(floorType: string | undefined, wallType: string | undefined, landscapeType: string | undefined, scale: RoomGeometryScaleType, listener: IGetImageListener | undefined = undefined, windowType: string | undefined = undefined): Promise<Texture | undefined> {
        let value = `${floorType ?? ''}\n${wallType ?? ''}\n${landscapeType ?? ''}\n`;

        if (windowType !== undefined) value += windowType;

        return this.getGenericRoomObjectTexture('room', value, new Vector3d(), scale, listener);
    }

    /**
     * Flash `RoomEngine.initializeRoomForGettingImage`: a 6x6 floor of height 0 inside a one-tile
     * border, walls 6 high, the plane types from the value, and - when the value names a window
     * (its fourth line; an empty one is still a mask of no type, which the logic ignores) - that
     * window's mask as `20_1` at (2.5, 0.5, 2).
     */
    private initializeRoomForGettingImage(roomObject: IRoomObjectController, value: string): void {
        const parts = value.split('\n');

        if (parts.length < 3) return;

        const [ floorType, wallType, landscapeType, windowType ] = parts;
        const size = 6;
        const parser = new RoomPlaneParser();

        parser.initializeTileMap(size + 2, size + 2);

        for (let y = 1; y < (1 + size); y++) {
            for (let x = 1; x < (1 + size); x++) parser.setTileHeight(x, y, 0);
        }

        parser.wallHeight = size;
        parser.initializeFromTileData();

        if (roomObject.logic instanceof RoomLogic) roomObject.logic.initialize(parser.getMapData());

        roomObject.model.setValue(RoomObjectVariableEnum.RoomFloorType, floorType);
        roomObject.model.setValue(RoomObjectVariableEnum.RoomWallType, wallType);
        roomObject.model.setValue(RoomObjectVariableEnum.RoomLandscapeType, landscapeType);

        if (windowType !== undefined) roomObject.processUpdateMessage(new ObjectRoomMaskUpdateMessage(ObjectRoomMaskUpdateMessage.ADD_MASK, '20_1', windowType, new Vector3d(2.5, 0.5, 2)));

        parser.dispose();
    }

    public getGenericRoomObjectTexture(
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
    ): Promise<Texture | undefined> {
        // The render is synchronous. The executor runs it at once and a throw rejects the promise,
        // exactly as the `async` method with nothing to await did.
        return new Promise(resolve => resolve(this.renderGenericRoomObjectTexture(type, value, direction, scale, listener, extras, objectData, state, frameCount, posture)));
    }

    private renderGenericRoomObjectTexture(
        type: string,
        value: string,
        direction: IVector3D,
        scale: RoomGeometryScaleType,
        listener: IGetImageListener | undefined,
        extras: number,
        objectData: IObjectData | undefined,
        state: number,
        frameCount: number,
        posture: string,
    ): Texture | undefined {
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
                    type === RoomObjectUserTypeName.User
                    || type === RoomObjectUserTypeName.Bot
                    || type === RoomObjectUserTypeName.RentableBot
                    || type === RoomObjectUserTypeName.Pet
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
                this.initializeRoomForGettingImage(roomObject, value);
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

        const texture = roomObject.visualization.getRenderTexture();

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

        return texture;
    }

    /** Delivers a finished render to a listener in the form it asked for - texture (owned by it) or read-back image. */
    private async notifyImageListener(listener: IGetImageListener, texture: Texture | undefined): Promise<void> {
        if (!texture) {
            listener.imageFailed();

            return;
        }

        if (listener.textureReady) {
            listener.textureReady(texture);

            return;
        }

        const image = await TextureUtils.generateImage(texture);

        texture.destroy(true);

        if (image) listener.imageReady(image);
        else listener.imageFailed();
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

                // Each listener gets its own render: a texture listener takes ownership of it.
                for (const listener of imageListeners) {
                    if (listener) void this.notifyImageListener(listener, roomObject.visualization.getRenderTexture());
                }
            }
        }

        geometry?.dispose();
    }

    public getTemporaryRoom(): IRoom {
        return this.createRoom(RoomEngine.TEMPORARY_ROOM_ID);
    }
}
