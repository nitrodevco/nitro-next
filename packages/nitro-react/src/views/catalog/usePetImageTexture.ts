import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader, GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { PetImageRequest } from '#base/context/catalog';

/**
 * `RoomEngine.getPetImage`'s figure string: type, palette and colour in hex, then - only when
 * custom parts are given, even none - their count and each part's layer, part and palette.
 */
const petImageValue = (request: PetImageRequest) => {
    let value = `${request.typeId} ${request.paletteId} ${request.color.toString(16)}`;

    if (request.customParts) {
        value = `${value} ${request.customParts.length}`;

        for (const part of request.customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;
    }

    return value;
};

/**
 * A catalogue pet render - `getPetImage` at the 64 scale - as the texture the engine drew into
 * (`getGenericRoomObjectTexture`), the same way `useFurnitureImageTexture` takes a furni render.
 * Until the pet's library has downloaded the engine draws its placeholder; the finished render
 * comes through `textureReady`, which is Flash's `imageReady` callback, and `onImageReady` runs
 * then - the pet widgets re-initialise on it, since the pet's palettes only exist once its
 * library is in.
 *
 * The hook owns every texture it receives and destroys one only after React has committed the
 * one that replaces it (see `useFurnitureImageTexture` for why).
 */
export const usePetImageTexture = (request: PetImageRequest | undefined, onImageReady?: () => void): Texture | undefined => {
    const [ texture, setTexture ] = useState<Texture | undefined>(undefined);
    const ownedRef = useRef<Set<Texture>>(new Set());
    const latestRef = useRef<Texture | undefined>(undefined);
    const onImageReadyRef = useRef(onImageReady);
    const type = request ? GetRoomContentLoader().getPetNameForType(request.typeId) : undefined;
    const value = request ? petImageValue(request) : '';
    const direction = request?.direction ?? 0;

    useEffect(() => {
        onImageReadyRef.current = onImageReady;
    });

    useEffect(() => {
        if (!type) return;

        let cancelled = false;

        const adopt = (next: Texture | undefined) => {
            if (!next) return;

            if (cancelled) {
                next.destroy(true);

                return;
            }

            next.source.scaleMode = 'nearest';
            ownedRef.current.add(next);
            latestRef.current = next;
            setTexture(next);
        };

        void GetRoomEngine().getGenericRoomObjectTexture(
            type,
            value,
            new Vector3d(direction),
            RoomGeometryScaleType.ZoomedIn,
            {
                imageReady: () => { },
                imageFailed: () => { },
                textureReady: (next) => {
                    adopt(next);

                    if (!cancelled) onImageReadyRef.current?.();
                },
            },
        ).then(adopt);

        return () => {
            cancelled = true;
        };
    }, [ type, value, direction ]);

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

    return texture;
};
