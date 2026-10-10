import { IGetImageListener } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { destroyOwnedTexture } from '#base/utils';

export interface EngineTextureOptions {
    /** Draw the texture with nearest-neighbour sampling, as the pet renders want. */
    nearest?: boolean;
    /** Runs when a render the engine finished later (an asset was downloading) arrives - Flash's `imageReady`. */
    onTextureReady?: () => void;
}

/**
 * The texture life cycle every room engine render hook shares. `request` asks the engine,
 * handing it the listener that receives the finished render when an asset was still downloading;
 * `key` names what is asked for, so a new key is a new request and `undefined` asks for nothing.
 * Flash's `§_-m1k.imageReady` answers by callback id; here the latest request's texture wins and
 * a superseded one is dropped. The last texture stays when the key goes to `undefined`.
 *
 * The hook owns every texture it receives, and destroys one only once no sprite can still be
 * drawing it. A texture arrives outside React (a promise, an engine callback), and the sprite
 * keeps drawing the previous texture until React has committed the next one - Pixi's ticker can
 * render a frame in between. Destroying the previous texture on arrival left that frame drawing a
 * texture with no source: Pixi's batcher then throws reading `alphaMode`.
 */
export const useOwnedEngineTexture = (key: string | undefined, request: (listener: IGetImageListener) => Promise<Texture | undefined>, options: EngineTextureOptions = {}): Texture | undefined => {
    const [ texture, setTexture ] = useState<Texture | undefined>(undefined);
    const requestRef = useRef(request);
    const optionsRef = useRef(options);
    // Every texture handed to state and not destroyed yet, and the most recent of them.
    const ownedRef = useRef<Set<Texture>>(new Set());
    const latestRef = useRef<Texture | undefined>(undefined);

    useEffect(() => {
        requestRef.current = request;
        optionsRef.current = options;
    });

    useEffect(() => {
        if (key === undefined) return;

        let cancelled = false;

        const adopt = (next: Texture | undefined) => {
            if (!next) return;

            // Nothing ever showed a render for a request that has since been replaced.
            if (cancelled) {
                destroyOwnedTexture(next);

                return;
            }

            if (optionsRef.current.nearest) next.source.scaleMode = 'nearest';

            ownedRef.current.add(next);
            latestRef.current = next;
            setTexture(next);
        };

        const textureReady = (next: Texture | undefined) => {
            adopt(next);

            if (!cancelled) optionsRef.current.onTextureReady?.();
        };

        void requestRef.current({ imageReady: () => { }, imageFailed: () => { }, textureReady }).then(adopt);

        return () => {
            cancelled = true;
        };
    }, [ key ]);

    /*
     * After each commit, `texture` is what the sprite shows. Everything else owned is either a
     * texture that commit replaced or one that was superseded before it ever reached the screen -
     * except the latest, which may still be on its way to the next commit.
     */
    useEffect(() => {
        for (const owned of ownedRef.current) {
            if ((owned === texture) || (owned === latestRef.current)) continue;

            ownedRef.current.delete(owned);
            destroyOwnedTexture(owned);
        }
    });

    // Unmounting removes the sprite in the same commit, before this runs.
    useEffect(() => () => {
        for (const owned of ownedRef.current) destroyOwnedTexture(owned);

        ownedRef.current.clear();
        latestRef.current = undefined;
    }, []);

    return texture;
};

/**
 * A room engine render taken as a texture - the `getRoomTexture` / `getGenericRoomObjectTexture`
 * counterpart of `useFurnitureImageTexture`, for a render the caller describes itself (see
 * `useOwnedEngineTexture`). Nothing is shown while `key` is `undefined`.
 */
export const useRoomEngineTexture = (key: string | undefined, request: (listener: IGetImageListener) => Promise<Texture | undefined>): Texture | undefined => {
    const texture = useOwnedEngineTexture(key, request);

    return (key === undefined) ? undefined : texture;
};
