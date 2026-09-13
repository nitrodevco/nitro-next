import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetRoomContentLoader, GetRoomEngine, PetFigureData } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useRoomSelector } from '#base/context';

export interface ChatPetFace {
    texture: Texture | undefined;
    /** The pet figure's own colour, used the way an avatar's chest colour is. */
    color: number | undefined;
}

const EMPTY: ChatPetFace = { texture: undefined, color: undefined };

/** Bounds the faces kept - the least recently shown pet is dropped past this many. */
const MAX_CACHED_FACES = 64;

/** Insertion order doubles as recency: a hit re-inserts, an insert past the cap evicts the first entry. */
const cache = new Map<string, Texture>();
const pending = new Map<string, Promise<Texture | undefined>>();

const faceKey = (cacheKey: string): string => `chat:pet:${cacheKey}`;

const evictFace = (cacheKey: string) => {
    const texture = cache.get(cacheKey);

    if (!texture) return;

    cache.delete(cacheKey);
    GetAssetManager().removeTexture(faceKey(cacheKey));
    texture.destroy(true);
};

const storeFace = (cacheKey: string, texture: Texture) => {
    GetAssetManager().setTexture(faceKey(cacheKey), texture);
    cache.set(cacheKey, texture);

    while (cache.size > MAX_CACHED_FACES) {
        const oldest = cache.keys().next().value;

        if (oldest === undefined) break;

        evictFace(oldest);
    }
};

/**
 * The engine's pet render as the texture it drew into (`getGenericRoomObjectTexture`) - the
 * `getRoomObjectPetImage` route would read that texture back as a base64 `<img>` and upload
 * it a second time. The `type`/`value` pair is what `Room.getRoomObjectPetImageArgs` builds.
 */
const renderPetFace = (figureData: PetFigureData, posture: string | undefined): Promise<Texture | undefined> => {
    const type = GetRoomContentLoader().getPetNameForType(figureData.typeId);

    if (!type) return Promise.resolve(undefined);

    let value = `${figureData.typeId} ${figureData.paletteId} ${figureData.color.toString(16)}`;

    value = `${value} ${figureData.customParts.length}`;

    for (const part of figureData.customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;

    return GetRoomEngine().getGenericRoomObjectTexture(type, value, new Vector3d(2 * 45), RoomGeometryScaleType.ZoomedOut, undefined, 0, undefined, 0, 0, posture ?? '');
};

/** `ChatBubbleFactory._Str_2641`: the whole pet at the zoomed-out (32px) scale, facing direction 2 - async through the room engine. */
export const useChatPetFace = (figure: string | undefined, posture: string | undefined): ChatPetFace => {
    const room = useRoomSelector();
    const [ face, setFace ] = useState<ChatPetFace>(EMPTY);

    useEffect(() => {
        if (!room || !figure) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFace(EMPTY);

            return;
        }

        const figureData = new PetFigureData(figure);
        const cacheKey = `${figure}|${posture ?? ''}`;
        const cached = cache.get(cacheKey);

        if (cached) {
            cache.delete(cacheKey);
            cache.set(cacheKey, cached);
            setFace({ texture: cached, color: figureData.color });

            return;
        }

        let cancelled = false;
        let promise = pending.get(cacheKey);

        if (!promise) {
            promise = renderPetFace(figureData, posture).then((texture) => {
                pending.delete(cacheKey);

                if (!texture) return undefined;

                texture.source.scaleMode = 'nearest';
                storeFace(cacheKey, texture);

                return texture;
            });

            pending.set(cacheKey, promise);
        }

        setFace({ texture: undefined, color: figureData.color });

        void promise.then((texture) => {
            if (!cancelled) setFace({ texture, color: figureData.color });
        });

        return () => {
            cancelled = true;
        };
    }, [ room, figure, posture ]);

    return face;
};
