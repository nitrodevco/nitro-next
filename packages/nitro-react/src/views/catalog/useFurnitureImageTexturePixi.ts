import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

export interface FurnitureImageTexture {
    texture: Texture | undefined;
    width: number;
    height: number;
}

const EMPTY: FurnitureImageTexture = { texture: undefined, width: 0, height: 0 };

/**
 * Pixi counterpart of components/FurnitureImage.tsx: the same engine render of a furni type,
 * taken as a texture (`getGenericRoomObjectTexture`) instead of the DOM's base64 `<img>` -
 * the render texture the engine drew into is the one the sprite shows, nothing is read back
 * or re-uploaded. When the furni's asset is still downloading the engine calls back through
 * `textureReady` once it can render, so the image fills in rather than staying blank. The
 * hook owns each texture it receives and destroys it on change/unmount.
 */
export const useFurnitureImageTexturePixi = (
    type: string | undefined,
    colorIndex: number = 0,
    direction: number = 2,
    scale: RoomGeometryScaleType,
    extra: number = 0,
): FurnitureImageTexture => {
    const [ result, setResult ] = useState<FurnitureImageTexture>(EMPTY);
    const textureRef = useRef<Texture | undefined>(undefined);

    useEffect(() => {
        if (!type) return;

        let cancelled = false;

        const adopt = (texture: Texture | undefined) => {
            if (!texture) return;

            if (cancelled) {
                texture.destroy(true);

                return;
            }

            textureRef.current?.destroy(true);
            textureRef.current = texture;

            setResult({ texture, width: texture.width, height: texture.height });
        };

        void GetRoomEngine().getGenericRoomObjectTexture(
            type,
            colorIndex.toString(),
            new Vector3d(direction),
            scale,
            { imageReady: () => { }, imageFailed: () => { }, textureReady: adopt },
            extra,
        ).then(adopt);

        return () => {
            cancelled = true;
        };
    }, [ type, colorIndex, direction, scale, extra ]);

    useEffect(() => () => {
        textureRef.current?.destroy(true);
    }, []);

    return result;
};
