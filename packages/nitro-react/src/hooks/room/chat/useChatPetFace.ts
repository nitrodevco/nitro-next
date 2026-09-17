import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetRoomContentLoader, GetRoomEngine, PetFigureData } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useSyncExternalStore } from 'react';

import { useRoom } from '#base/context/room';

/** How big and which way round a pet render is wanted. */
export interface PetFaceOptions {
    scale?: RoomGeometryScaleType;
    /** In eighths of a turn, as the room counts directions. */
    direction?: number;
}

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
const renderPetFace = (figureData: PetFigureData, posture: string | undefined, scale: RoomGeometryScaleType, direction: number): Promise<Texture | undefined> => {
    const type = GetRoomContentLoader().getPetNameForType(figureData.typeId);

    if (!type) return Promise.resolve(undefined);

    let value = `${figureData.typeId} ${figureData.paletteId} ${figureData.color.toString(16)}`;

    value = `${value} ${figureData.customParts.length}`;

    for (const part of figureData.customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;

    return GetRoomEngine().getGenericRoomObjectTexture(type, value, new Vector3d(direction * 45), scale, undefined, 0, undefined, 0, 0, posture ?? '');
};

/** `ChatBubbleFactory._Str_2641`'s defaults: the whole pet at the zoomed-out (32px) scale, facing direction 2. */
const DEFAULT_SCALE = RoomGeometryScaleType.ZoomedOut;
const DEFAULT_DIRECTION = 2;

/**
 * A pet drawn by the room engine, cached across everything that shows one. The chat bubble takes
 * the defaults; the infostand asks for a bigger render, which is a different cache entry.
 */
export const useChatPetFace = (figure: string | undefined, posture: string | undefined, options?: PetFaceOptions): ChatPetFace => {
    const scale = options?.scale ?? DEFAULT_SCALE;
    const direction = options?.direction ?? DEFAULT_DIRECTION;
    const room = useRoom();
    const cacheKey = `${figure}|${posture ?? ''}|${scale}|${direction}`;
    const canRender = !!room && !!figure;

    // The shared face cache is the source of truth; a hit is moved to the back, the most recent end.
    const getSnapshot = () => {
        if (!canRender) return undefined;

        const cached = cache.get(cacheKey);

        if (cached) {
            cache.delete(cacheKey);
            cache.set(cacheKey, cached);
        }

        return cached;
    };

    // Subscribing is what starts the render; the face landing in the cache is the change to re-read.
    const subscribe = (onChange: () => void) => {
        if (!canRender || cache.has(cacheKey)) return () => {};

        let cancelled = false;
        let promise = pending.get(cacheKey);

        if (!promise) {
            promise = renderPetFace(new PetFigureData(figure), posture, scale, direction).then((texture) => {
                pending.delete(cacheKey);

                if (!texture) return undefined;

                texture.source.scaleMode = 'nearest';
                storeFace(cacheKey, texture);

                return texture;
            });

            pending.set(cacheKey, promise);
        }

        void promise.then(() => {
            if (!cancelled) onChange();
        });

        return () => {
            cancelled = true;
        };
    };

    const texture = useSyncExternalStore(subscribe, getSnapshot);

    if (!canRender) return EMPTY;

    return { texture, color: new PetFigureData(figure).color };
};
