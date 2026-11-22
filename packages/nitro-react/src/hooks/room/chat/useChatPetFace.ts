import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetAssetManager, PetFigureData } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useLayoutEffect, useSyncExternalStore } from 'react';

import { useRoom } from '#base/context/room';
import { destroyOwnedTexture } from '#base/utils';

import { renderPetFigureTexture } from '../images/renderPetFigureTexture';
import { createPetFaceStore } from './petFaceStore';

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

const storeFace = (cacheKey: string, texture: Texture) => GetAssetManager().setTexture(faceKey(cacheKey), texture);

const freeFace = (cacheKey: string, texture: Texture) => {
    if (GetAssetManager().getTexture(faceKey(cacheKey)) === texture) GetAssetManager().removeTexture(faceKey(cacheKey));

    destroyOwnedTexture(texture);
};

/**
 * Least recently used past the cap - but never a face something on screen still shows: it used to
 * be destroyed under the bubble, which stops the ticker. A pet still downloading is replaced by its
 * finished render when that lands (`petFaceStore`).
 */
const faces = createPetFaceStore<Texture>(MAX_CACHED_FACES, storeFace, freeFace);

/** `ChatBubbleFactory.getPetImage`'s scale and direction: the zoomed-out (32px) scale, facing direction 2. */
const DEFAULT_SCALE = RoomGeometryScaleType.ZoomedOut;
const DEFAULT_DIRECTION = 2;

/**
 * A pet drawn by the room engine, cached across everything that shows one. The chat bubble takes
 * the scale and direction defaults and asks for the head only; the infostand asks for a bigger
 * whole-body render, which is a different cache entry. A pet whose library is still downloading
 * shows the engine's placeholder until the finished render replaces it.
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

        return faces.get(cacheKey);
    };

    // Subscribing is what starts the render; a face stored or replaced under the key is the change to re-read.
    const subscribe = (onChange: () => void) => {
        if (!canRender) return () => {};

        const unwatch = faces.watch(cacheKey, onChange);

        faces.request(cacheKey, listener => renderPetFigureTexture(new PetFigureData(figure), { direction: direction * 45, scale, posture: posture ?? '', headOnly, listener }));

        return unwatch;
    };

    const texture = useSyncExternalStore(subscribe, getSnapshot);

    // Held while shown, so the cache cannot destroy it under whatever draws it.
    useLayoutEffect(() => {
        if (!texture) return;

        faces.retain(texture);

        return () => faces.release(texture);
    }, [ texture ]);

    if (!canRender) return EMPTY;

    return { texture, color: new PetFigureData(figure).color };
};
