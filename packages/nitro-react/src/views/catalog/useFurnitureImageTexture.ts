import { IObjectData, RoomGeometryScaleType, StringDataType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

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
 * `textureReady` once it can render, so the image fills in rather than staying blank.
 *
 * The hook owns every texture it receives, and destroys one only once no sprite can still be
 * drawing it. A texture arrives outside React (a promise, an engine callback), and the sprite
 * keeps drawing the previous texture until React has committed the next one - Pixi's ticker can
 * render a frame in between. Destroying the previous texture on arrival, as this used to, left
 * that frame drawing a texture with no source: Pixi's batcher then throws reading `alphaMode`.
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
    // The stuff data as one value the effect can depend on; the effect rebuilds the array from it.
    const stuffDataKey = stringStuffData ? JSON.stringify(stringStuffData) : undefined;
    const [ texture, setTexture ] = useState<Texture | undefined>(undefined);
    // Every texture handed to state and not destroyed yet, and the most recent of them.
    const ownedRef = useRef<Set<Texture>>(new Set());
    const latestRef = useRef<Texture | undefined>(undefined);

    useEffect(() => {
        if (!type) return;

        let cancelled = false;
        let objectData: IObjectData | undefined = undefined;

        if (stuffDataKey !== undefined) {
            const data = new StringDataType();

            data.setValue(JSON.parse(stuffDataKey) as string[]);
            objectData = data;
        }

        const adopt = (next: Texture | undefined) => {
            if (!next) return;

            // Nothing ever showed a render for a request that has since been replaced.
            if (cancelled) {
                next.destroy(true);

                return;
            }

            ownedRef.current.add(next);
            latestRef.current = next;
            setTexture(next);
        };

        void GetRoomEngine().getGenericRoomObjectTexture(
            type,
            colorIndex.toString(),
            new Vector3d(direction),
            scale,
            { imageReady: () => { }, imageFailed: () => { }, textureReady: adopt },
            extra,
            objectData,
        ).then(adopt);

        return () => {
            cancelled = true;
        };
    }, [ type, colorIndex, direction, scale, extra, stuffDataKey ]);

    /*
     * After each commit, `texture` is what the sprite shows. Everything else owned is either a
     * texture that commit replaced or one that was superseded before it ever reached the screen -
     * except the latest, which may still be on its way to the next commit.
     */
    useEffect(() => {
        for (const owned of ownedRef.current) {
            if ((owned === texture) || (owned === latestRef.current)) continue;

            ownedRef.current.delete(owned);
            owned.destroy(true);
        }
    });

    // Unmounting removes the sprite in the same commit, before this runs.
    useEffect(() => () => {
        for (const owned of ownedRef.current) owned.destroy(true);

        ownedRef.current.clear();
        latestRef.current = undefined;
    }, []);

    return { texture, width: texture?.width ?? 0, height: texture?.height ?? 0 };
};
