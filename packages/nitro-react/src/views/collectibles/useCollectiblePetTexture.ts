import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader, GetRoomEngine, PetFigureData } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

/** `PetImageWidget`'s defaults: `pet_image:direction` southeast (2, so 90 degrees), `pet_image:scale` 64, posture `std`. */
export const COLLECTIBLE_PET_DIRECTION_DEFAULT = 90;
const PET_POSTURE = 'std';

/**
 * The `pet_image` window widget's render - `PetImageWidget.refreshBitmap`'s
 * `roomEngine.getPetImage(typeId, paletteId, color, Vector3d(direction * 45), 64, ..., customParts, 'std')`,
 * taken as the texture the engine drew into (`getGenericRoomObjectTexture` in its temporary room,
 * with the value `Room.getRoomObjectPetImageArgs` builds). It needs no room of the user's, as the
 * Flash widget does not.
 *
 * The hook owns every texture it receives and destroys one only once no sprite can still draw it,
 * the way `useFurnitureImageTexture` does.
 */
export const useCollectiblePetTexture = (figure: string | undefined, direction: number = COLLECTIBLE_PET_DIRECTION_DEFAULT): Texture | undefined => {
    const [ texture, setTexture ] = useState<Texture | undefined>(undefined);
    const ownedRef = useRef<Set<Texture>>(new Set());
    const latestRef = useRef<Texture | undefined>(undefined);

    useEffect(() => {
        if (!figure) return;

        const figureData = new PetFigureData(figure);
        const type = GetRoomContentLoader().getPetNameForType(figureData.typeId);

        if (!type) return;

        let value = `${figureData.typeId} ${figureData.paletteId} ${figureData.color.toString(16)} ${figureData.customParts.length}`;

        for (const part of figureData.customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;

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

        void GetRoomEngine().getGenericRoomObjectTexture(type, value, new Vector3d(direction), RoomGeometryScaleType.ZoomedIn, { imageReady: () => { }, imageFailed: () => { }, textureReady: adopt }, 0, undefined, 0, 0, PET_POSTURE).then(adopt);

        return () => {
            cancelled = true;
        };
    }, [ figure, direction ]);

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

    return figure ? texture : undefined;
};
