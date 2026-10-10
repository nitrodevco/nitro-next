import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader, GetRoomEngine, PetFigureData } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

import { useOwnedEngineTexture } from './useRoomEngineTexture';

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
 * The textures' life cycle is `useOwnedEngineTexture`'s.
 */
export const useCollectiblePetTexture = (figure: string | undefined, direction: number = COLLECTIBLE_PET_DIRECTION_DEFAULT): Texture | undefined => {
    const texture = useOwnedEngineTexture(figure ? `${figure}|${direction}` : undefined, (listener) => {
        const figureData = new PetFigureData(figure ?? '');
        const type = GetRoomContentLoader().getPetNameForType(figureData.typeId);

        if (!type) return Promise.resolve(undefined);

        let value = `${figureData.typeId} ${figureData.paletteId} ${figureData.color.toString(16)} ${figureData.customParts.length}`;

        for (const part of figureData.customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;

        return GetRoomEngine().getGenericRoomObjectTexture(type, value, new Vector3d(direction), RoomGeometryScaleType.ZoomedIn, listener, 0, undefined, 0, 0, PET_POSTURE);
    }, { nearest: true });

    return figure ? texture : undefined;
};
