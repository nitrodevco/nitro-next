import { PetType } from '@nitrodevco/nitro-api';

/** A monster plant at this level or above is fully grown (`std`); below it, `grw<level>`. */
const MONSTERPLANT_GROWN_LEVEL = 7;

/**
 * The posture an inventory pet is drawn and placed in: a monster plant at the growth stage its
 * level names (`PetsView.getPetImage`, `placePetToRoom`), any other pet in its default.
 */
export const getMonsterPlantPosture = (typeId: number, level: number): string | undefined => {
    if (typeId !== PetType.MONSTERPLANT) return undefined;

    return (level >= MONSTERPLANT_GROWN_LEVEL) ? 'std' : `grw${level}`;
};
