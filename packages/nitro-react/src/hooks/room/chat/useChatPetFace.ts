import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetRoomContentLoader, GetRoomEngine, PetFigureData } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useLayoutEffect, useSyncExternalStore } from 'react';

import { useRoom } from '#base/context/room';
import { destroyOwnedTexture, RetainedCache } from '#base/utils';

/** How big and which way round a pet render is wanted. */
export interface PetFaceOptions {
    scale?: RoomGeometryScaleType;
    /** In eighths of a turn, as the room counts directions. */
    direction?: number;
    /** Only the head and hair layers (`RoomEngine.getPetImage` without its full-body flag). */
    headOnly?: boolean;
}

export interface ChatPetFace {
    texture: Texture | undefined;
    /** The pet figure's own colour, used the way an avatar's chest colour is. */
    color: number | undefined;
}

const EMPTY: ChatPetFace = { texture: undefined, color: undefined };

/** Bounds the faces kept - the least recently shown pet is dropped past this many. */
const MAX_CACHED_FACES = 64;

const faceKey = (cacheKey: string): string => `chat:pet:${cacheKey}`;

const freeFace = (cacheKey: string, texture: Texture) => {
    if (GetAssetManager().getTexture(faceKey(cacheKey)) === texture) GetAssetManager().removeTexture(faceKey(cacheKey));

    destroyOwnedTexture(texture);
};

/**
 * Least recently used past the cap - but never a face something on screen still shows
 * (`RetainedCache`): it used to be destroyed under the bubble, which stops the ticker.
 */
const cache = new RetainedCache<string, Texture>(MAX_CACHED_FACES, freeFace);
const pending = new Map<string, Promise<Texture | undefined>>();

const storeFace = (cacheKey: string, texture: Texture) => {
    GetAssetManager().setTexture(faceKey(cacheKey), texture);
    cache.set(cacheKey, texture);
};

/**
 * The engine's pet render as the texture it drew into (`getGenericRoomObjectTexture`) - the
 * `getRoomObjectPetImage` route would read that texture back as a base64 `<img>` and upload
 * it a second time. The `type`/`value` pair is what `Room.getRoomObjectPetImageArgs` builds.
 */
const renderPetFace = (figureData: PetFigureData, posture: string | undefined, scale: RoomGeometryScaleType, direction: number, headOnly: boolean): Promise<Texture | undefined> => {
    const type = GetRoomContentLoader().getPetNameForType(figureData.typeId);

    if (!type) return Promise.resolve(undefined);

    let value = `${figureData.typeId} ${figureData.paletteId} ${figureData.color.toString(16)}`;

    if (headOnly) value = `${value} head`;

    value = `${value} ${figureData.customParts.length}`;

    for (const part of figureData.customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;

    return GetRoomEngine().getGenericRoomObjectTexture(type, value, new Vector3d(direction * 45), scale, undefined, 0, undefined, 0, 0, posture ?? '');
};

/** `ChatBubbleFactory.getPetImage`'s scale and direction: the zoomed-out (32px) scale, facing direction 2. */
const DEFAULT_SCALE = RoomGeometryScaleType.ZoomedOut;
const DEFAULT_DIRECTION = 2;

/**
 * A pet drawn by the room engine, cached across everything that shows one. The chat bubble takes
 * the scale and direction defaults and asks for the head only; the infostand asks for a bigger
 * whole-body render, which is a different cache entry.
 */
export const useChatPetFace = (figure: string | undefined, posture: string | undefined, options?: PetFaceOptions): ChatPetFace => {
    const scale = options?.scale ?? DEFAULT_SCALE;
    const direction = options?.direction ?? DEFAULT_DIRECTION;
    const headOnly = options?.headOnly ?? false;
    const room = useRoom();
    const cacheKey = `${figure}|${posture ?? ''}|${scale}|${direction}|${headOnly ? 'head' : 'full'}`;
    const canRender = !!room && !!figure;

    // The shared face cache is the source of truth; a hit is moved to the back, the most recent end.
    const getSnapshot = () => {
        if (!canRender) return undefined;

        return cache.get(cacheKey);
    };

    // Subscribing is what starts the render; the face landing in the cache is the change to re-read.
    const subscribe = (onChange: () => void) => {
        if (!canRender || cache.has(cacheKey)) return () => {};

        let cancelled = false;
        let promise = pending.get(cacheKey);

        if (!promise) {
            promise = renderPetFace(new PetFigureData(figure), posture, scale, direction, headOnly).then((texture) => {
                if (!texture) return undefined;

                texture.source.scaleMode = 'nearest';
                storeFace(cacheKey, texture);

                return texture;
            }, () => undefined).finally(() => pending.delete(cacheKey));

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

    // Held while shown, so the cache cannot destroy it under whatever draws it.
    useLayoutEffect(() => {
        if (!texture) return;

        cache.retain(texture);

        return () => cache.release(texture);
    }, [ texture ]);

    if (!canRender) return EMPTY;

    return { texture, color: new PetFigureData(figure).color };
};
