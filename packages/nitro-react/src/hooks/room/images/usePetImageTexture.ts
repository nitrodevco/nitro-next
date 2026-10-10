import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader, GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

import { PetImageRequest } from '#base/context/catalog';

import { useOwnedEngineTexture } from './useRoomEngineTexture';

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
 * The textures' life cycle is `useOwnedEngineTexture`'s.
 */
export const usePetImageTexture = (request: PetImageRequest | undefined, onImageReady?: () => void): Texture | undefined => {
    const type = request ? GetRoomContentLoader().getPetNameForType(request.typeId) : undefined;
    const value = request ? petImageValue(request) : '';
    const direction = request?.direction ?? 0;
    // `getPetImage`'s last argument: a monster plant is drawn at the growth stage its level names.
    const posture = request?.posture ?? '';
    const key = type ? JSON.stringify([ type, value, direction, posture ]) : undefined;

    return useOwnedEngineTexture(key, listener => GetRoomEngine().getGenericRoomObjectTexture(
        type ?? '',
        value,
        new Vector3d(direction),
        RoomGeometryScaleType.ZoomedIn,
        listener,
        undefined,
        undefined,
        undefined,
        undefined,
        posture || undefined,
    ), { nearest: true, onTextureReady: onImageReady });
};
