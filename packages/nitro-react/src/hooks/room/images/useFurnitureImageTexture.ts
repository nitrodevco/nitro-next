import { IObjectData, RoomGeometryScaleType, StringDataType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

import { useOwnedEngineTexture } from './useRoomEngineTexture';

export interface FurnitureImageTexture {
    texture: Texture | undefined;
    width: number;
    height: number;
}

/**
 * Pixi counterpart of components/FurnitureImage.tsx: the same engine render of a furni type,
 * taken as a texture (`getGenericRoomObjectTexture`) instead of the DOM's base64 `<img>` -
 * the render texture the engine drew into is the one the sprite shows, nothing is read back
 * or re-uploaded. When the furni's asset is still downloading the engine calls back through
 * `textureReady` once it can render, so the image fills in rather than staying blank. The
 * textures' life cycle is `useOwnedEngineTexture`'s.
 */
export const useFurnitureImageTexture = (
    type: string | undefined,
    colorIndex: number = 0,
    direction: number = 2,
    scale: RoomGeometryScaleType,
    extra: number = 0,
    /**
     * A `StringArrayStuffData` to render the furni with (the catalogue's guild furni icons pass
     * `[ '0', guildId, badgeCode, color1, color2 ]`); without it the engine's legacy data is used.
     */
    stringStuffData?: readonly string[],
): FurnitureImageTexture => {
    const stuffDataKey = stringStuffData ? JSON.stringify(stringStuffData) : undefined;
    const key = type ? JSON.stringify([ type, colorIndex, direction, scale, extra, stuffDataKey ]) : undefined;

    const texture = useOwnedEngineTexture(key, (listener) => {
        let objectData: IObjectData | undefined = undefined;

        if (stringStuffData) {
            const data = new StringDataType();

            data.setValue([ ...stringStuffData ]);
            objectData = data;
        }

        return GetRoomEngine().getGenericRoomObjectTexture(type ?? '', colorIndex.toString(), new Vector3d(direction), scale, listener, extra, objectData);
    });

    return { texture, width: texture?.width ?? 0, height: texture?.height ?? 0 };
};
