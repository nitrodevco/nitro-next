/**
 * A pet's picture in an inventory bitmap - `PetsView.getPetImage` copied into the bitmap's centre
 * (`PetsGridItem.setPetImage`, `updatePreview`): the figure's custom parts from the packet's flat
 * triples, the direction turned into degrees (`* 45`), and a monster plant in the growth posture its
 * level names.
 */
import { IPetCustomPart } from '@nitrodevco/nitro-api';

import { InventoryPet } from '#base/context/inventory';
import { usePetImageTexture } from '#base/hooks';
import { getMonsterPlantPosture } from '#base/utils';

/** `getPetImage`'s `new Vector3d(direction * 45)`. */
const DEGREES_PER_DIRECTION = 45;

/** `PetsView.getPetImage`'s figure: the flat triples the packet carries, as the image request wants them. */
const getPetImageRequest = (pet: InventoryPet, direction: number) => {
    const customParts: IPetCustomPart[] = [];

    for (let index = 0; index < pet.figureData.customParts.length; index += 3) {
        customParts.push({ layerId: pet.figureData.customParts[index], partId: pet.figureData.customParts[index + 1], paletteId: pet.figureData.customParts[index + 2] });
    }

    return {
        typeId: pet.figureData.typeId,
        paletteId: pet.figureData.paletteId,
        color: parseInt(pet.figureData.color, 16) || 0,
        direction: direction * DEGREES_PER_DIRECTION,
        customParts: customParts.length ? customParts : undefined,
        posture: getMonsterPlantPosture(pet.figureData.typeId, pet.level),
    };
};

export interface InventoryPetImageProps {
    pet: InventoryPet;
    direction: number;
    width: number;
    height: number;
}

/** `setPetImage` / `updatePreview`: the render copied into the bitmap's centre. */
export const InventoryPetImage = ({ pet, direction, width, height }: InventoryPetImageProps) => {
    const texture = usePetImageTexture(getPetImageRequest(pet, direction));

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            anchor={0.5}
            x={Math.trunc(width / 2)}
            y={Math.trunc(height / 2)}
            layout={false}
        />
    );
};
