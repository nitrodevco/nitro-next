import { ImageLike, Texture } from 'pixi.js';

import { IVector3D } from '../utils';
import { RoomGeometryScaleType } from './enum';
import { IGetImageListener } from './IGetImageListener';
import { IRoom } from './IRoom';
import { IObjectData } from './object';

export interface IRoomEngine {
    init(): Promise<void>;
    /** Starts/stops the shared tick that advances every room with a canvas each frame (started by `init`). */
    start(): void;
    stop(): void;
    update(time: number): void;
    createRoom(roomId: number): IRoom;
    getFurnitureFloorIconUrl(typeId: number): string | undefined;
    getFurnitureWallIconUrl(typeId: number, extra?: string): string | undefined;
    /**
     * Renders an object (a furni type + colour, a figure, a pet) in the temporary room and hands
     * back the render as a texture the caller owns - the form a Pixi consumer wants, with no
     * GPU read-back. Resolves undefined (and notifies `listener` later) while the object's
     * asset is still downloading.
     */
    getGenericRoomObjectTexture(type: string, value: string, direction: IVector3D, scale: RoomGeometryScaleType, listener?: IGetImageListener, extras?: number, objectData?: IObjectData, state?: number, frameCount?: number, posture?: string): Promise<Texture | undefined>;
    /**
     * Flash's `getRoomImage` as a texture the caller owns: a small room with these plane types,
     * and `windowType`'s mask cut into its wall. Resolves undefined (and notifies `listener`
     * later) while the room's assets are still downloading.
     */
    getRoomTexture(floorType: string | undefined, wallType: string | undefined, landscapeType: string | undefined, scale: RoomGeometryScaleType, listener?: IGetImageListener, windowType?: string): Promise<Texture | undefined>;
    /** `getGenericRoomObjectTexture` read back into an `<img>` - for a DOM consumer that needs a URL. */
    getGenericRoomObjectImage(type: string, value: string, direction: IVector3D, scale: RoomGeometryScaleType, listener?: IGetImageListener, extras?: number, objectData?: IObjectData, state?: number, frameCount?: number, posture?: string): Promise<ImageLike | undefined>;
}
