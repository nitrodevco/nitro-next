import type { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { Vector3d } from '@nitrodevco/nitro-api';
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
 * Pixi port of components/FurnitureImage.tsx - same `GetRoomEngine().getGenericRoomObjectImage()`
 * engine call (not DOM-specific; returns an `ImageLike` the same shape AvatarImage's own engine
 * call resolves to), same divergence already established by useAvatarImageTexture.ts: skip
 * DOM's `background-image: url(...)` step and wrap the resolved image directly in a Pixi
 * `Texture.from()` instead.
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

        const load = async () => {
            const image = await GetRoomEngine().getGenericRoomObjectImage(
                type,
                colorIndex.toString(),
                new Vector3d(direction),
                scale,
                { imageReady: () => { }, imageFailed: () => { } },
                extra,
            );

            if (!image || cancelled) return;

            const texture = Texture.from(image, true);

            textureRef.current?.destroy(true);
            textureRef.current = texture;

            setResult({ texture, width: image.width, height: image.height });
        };

        void load();

        return () => {
            cancelled = true;
        };
    }, [ type, colorIndex, direction, scale, extra ]);

    useEffect(() => () => {
        textureRef.current?.destroy(true);
    }, []);

    return result;
};
