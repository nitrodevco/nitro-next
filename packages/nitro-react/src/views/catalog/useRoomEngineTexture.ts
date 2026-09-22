import { IGetImageListener } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

/**
 * A room engine render taken as a texture - the `getRoomTexture` / `getGenericRoomObjectTexture`
 * counterpart of `useFurnitureImageTexture`, for a render the caller describes itself: `request`
 * asks the engine (handing it the listener that receives the finished render when an asset was
 * still downloading), and `key` names what is asked for, so a new key is a new request. Flash's
 * `§_-m1k.imageReady` answers by callback id; here the latest request's texture wins and a
 * superseded one is dropped.
 *
 * The hook owns every texture it receives, and destroys one only once no sprite can still be
 * drawing it: after the commit that replaced it, or on unmount (see `useFurnitureImageTexture`
 * for why a texture must outlive the frame that still draws it).
 */
export const useRoomEngineTexture = (key: string | undefined, request: (listener: IGetImageListener) => Promise<Texture | undefined>): Texture | undefined => {
    const [ texture, setTexture ] = useState<Texture | undefined>(undefined);
    const requestRef = useRef(request);
    const ownedRef = useRef<Set<Texture>>(new Set());
    const latestRef = useRef<Texture | undefined>(undefined);

    useEffect(() => {
        requestRef.current = request;
    });

    useEffect(() => {
        if (key === undefined) return;

        let cancelled = false;

        const adopt = (next: Texture | undefined) => {
            if (!next) return;

            if (cancelled) {
                next.destroy(true);

                return;
            }

            ownedRef.current.add(next);
            latestRef.current = next;
            setTexture(next);
        };

        void requestRef.current({ imageReady: () => { }, imageFailed: () => { }, textureReady: adopt }).then(adopt);

        return () => {
            cancelled = true;
        };
    }, [ key ]);

    useEffect(() => {
        for (const owned of ownedRef.current) {
            if ((owned === texture) || (owned === latestRef.current)) continue;

            ownedRef.current.delete(owned);
            owned.destroy(true);
        }
    });

    useEffect(() => () => {
        for (const owned of ownedRef.current) owned.destroy(true);

        ownedRef.current.clear();
        latestRef.current = undefined;
    }, []);

    return (key === undefined) ? undefined : texture;
};
