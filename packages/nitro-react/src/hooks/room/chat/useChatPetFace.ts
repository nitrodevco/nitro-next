import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { PetFigureData } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useRoomSelector } from '#base/context';

export interface ChatPetFace {
    texture: Texture | undefined;
    /** The pet figure's own colour, used the way an avatar's chest colour is. */
    color: number | undefined;
}

const EMPTY: ChatPetFace = { texture: undefined, color: undefined };
const cache = new Map<string, Texture>();
const pending = new Map<string, Promise<Texture | undefined>>();

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
            setFace({ texture: cached, color: figureData.color });

            return;
        }

        let cancelled = false;
        let promise = pending.get(cacheKey);

        if (!promise) {
            promise = room.getRoomObjectPetImage(figureData.typeId, figureData.paletteId, figureData.color, new Vector3d(2 * 45), RoomGeometryScaleType.ZoomedOut, false, figureData.customParts, posture).then((image) => {
                pending.delete(cacheKey);

                if (!image) return undefined;

                const texture = Texture.from(image);

                texture.source.scaleMode = 'nearest';
                cache.set(cacheKey, texture);

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
