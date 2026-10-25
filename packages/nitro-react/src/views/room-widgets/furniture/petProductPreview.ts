import { FurnitureSpecialType, IPetCustomPart, IRoomUserData } from '@nitrodevco/nitro-api';
import { GetRoomContentLoader, PetFigureData } from '@nitrodevco/nitro-renderer';

import { PetImageRequest } from '#base/context/catalog';

/** `getPetImage(..., new Vector3d(90), 64, ...)`: every preview faces the same way. */
const PREVIEW_DIRECTION = 90;

/** `resolvePreviewImage`: a monsterplant under this level is drawn at its growth stage. */
const GROWN_LEVEL = 7;

const ints = (list: string | undefined) => (list ?? '').split(',').map(value => parseInt(value, 10));

/**
 * `UseProductConfirmationView.resolvePreviewImage`: the pet as the product would leave it, from the
 * product's `customParams` (`<pet type> ...`, as each category spells it) and the pet's own figure.
 * Undefined when the params are too short for their category, which Flash logs and draws nothing for.
 *
 * - Shampoo (`<type> <tag>`): the palette of the shampoo's colour tag with the pet's own breed.
 * - Custom part (`<type> <layers> <parts> <palettes>`): the product's parts, each keeping the
 *   palette the pet already wears on that layer.
 * - Custom part shampoo (`<type> <layers> <palettes>`): the product's palettes on the parts the pet
 *   already wears there (`-1` for none).
 * - Saddle (`<type> <layers> <parts> <palettes>`): the saddle's parts, then every part the pet
 *   wears - Flash keeps out those on the saddle's layers by `indexOf` on the strings it split, which
 *   never matches the pet's numbers, so none are kept out; that is kept.
 * - Monsterplant revival, rebreed and fertilise: the plant as it stands, a dead one at the growth
 *   stage its level names (`grw<level>`, `std` from level 7).
 */
export const petProductPreview = (specialType: FurnitureSpecialType, customParams: string, pet: IRoomUserData): PetImageRequest | undefined => {
    const figure = new PetFigureData(pet.figure);
    const params = customParams.split(' ');
    const productType = parseInt(params[0], 10);
    const base = { typeId: figure.typeId, paletteId: figure.paletteId, color: figure.color, direction: PREVIEW_DIRECTION };

    switch (specialType) {
        case FurnitureSpecialType.PetShampoo: {
            if (params.length < 2) return undefined;

            const loader = GetRoomContentLoader();
            const current = loader.getPetColorResult(productType, figure.paletteId);
            const tinted = loader.getPetColorResultsForTag(productType, params[1]).find(color => color.breed === current?.breed);

            return { ...base, paletteId: tinted?.id ?? 0, customParts: figure.customParts };
        }
        case FurnitureSpecialType.PetCustomPart: {
            if (params.length < 4) return undefined;

            const layers = ints(params[1]);
            const parts = ints(params[2]);
            const palettes = ints(params[3]);

            return {
                ...base,
                customParts: layers.map((layerId, index) => ({ layerId, partId: parts[index], paletteId: figure.getCustomPart(layerId)?.paletteId ?? palettes[index] })),
            };
        }
        case FurnitureSpecialType.PetCustomPartShampoo: {
            if (params.length < 3) return undefined;

            const layers = ints(params[1]);
            const palettes = ints(params[2]);

            return {
                ...base,
                customParts: layers.map((layerId, index) => ({ layerId, partId: figure.getCustomPart(layerId)?.partId ?? -1, paletteId: palettes[index] })),
            };
        }
        case FurnitureSpecialType.PetSaddle: {
            if (params.length < 4) return undefined;

            const layers = ints(params[1]);
            const parts = ints(params[2]);
            const palettes = ints(params[3]);
            const saddle: IPetCustomPart[] = layers.map((layerId, index) => ({ layerId, partId: parts[index], paletteId: palettes[index] }));

            return { ...base, customParts: [ ...saddle, ...figure.customParts ] };
        }
        case FurnitureSpecialType.MonsterplantRevival:
        case FurnitureSpecialType.MonsterplantRebreed:
        case FurnitureSpecialType.MonsterplantFertilize: {
            const posture = (pet.petPosture === 'rip') ? ((pet.petLevel < GROWN_LEVEL) ? `grw${pet.petLevel}` : 'std') : pet.petPosture;

            return { ...base, customParts: figure.customParts, posture };
        }
        default:
            return undefined;
    }
};
