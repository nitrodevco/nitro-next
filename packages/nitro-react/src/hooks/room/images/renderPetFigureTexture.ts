import { IGetImageListener, RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader, GetRoomEngine, PetFigureData, petImageValue } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

export interface PetFigureRender {
    /** The direction in degrees. */
    direction: number;
    scale: RoomGeometryScaleType;
    posture: string;
    headOnly?: boolean;
    /** What receives a render the engine finishes later, an asset still downloading. */
    listener?: IGetImageListener;
}

/**
 * A pet's figure drawn by the room engine, as the texture it drew into
 * (`getGenericRoomObjectTexture`) - the `type` / `value` pair `Room.getRoomObjectPetImageArgs`
 * builds. Undefined for a figure whose type names no pet.
 */
export const renderPetFigureTexture = (figureData: PetFigureData, { direction, scale, posture, headOnly = false, listener }: PetFigureRender): Promise<Texture | undefined> => {
    const type = GetRoomContentLoader().getPetNameForType(figureData.typeId);

    if (!type) return Promise.resolve(undefined);

    const value = petImageValue(figureData.typeId, figureData.paletteId, figureData.color, headOnly, figureData.customParts);

    return GetRoomEngine().getGenericRoomObjectTexture(type, value, new Vector3d(direction), scale, listener, 0, undefined, 0, 0, posture);
};
