/**
 * The helpers `PetsCatalogWidget` and `NewPetsCatalogWidget` each carry a copy of - the pet type
 * read off an offer's localization id, the breed's text key, the palettes a type may be bought in,
 * the purchase's extra parameter and the name approval's error text keys - and the old pet page's
 * colour table (`PetsCatalogWidget.updateAvailableColors`, checked by `drift/constants.py`).
 */
import type { CatalogSellablePetPalette } from '#base/context/catalog';

/**
 * `updateAvailableColors`: the colours the old pet page (`petsWidget`, pet types 0-7) offers, per
 * type; any other type has none.
 */
export const PET_AVAILABLE_COLORS: readonly (readonly number[])[] = [
    [ 16743226, 16750435, 16764339, 16094464, 16498012, 16704690, 15586304, 16115545, 16513201, 8694111, 11585939, 14413767, 6664599, 9553845, 12971486, 8358322, 10002885, 13292268, 10780600, 12623573, 14403561, 12418717, 14327229, 15517403, 14515069, 15764368, 16366271, 11250603, 13948116, 16777215, 14256481, 14656129, 15848130, 14005087, 14337152, 15918540, 15118118, 15531929, 9764857, 11258085 ],
    [ 16743226, 16750435, 16764339, 16094464, 16498012, 16704690, 15586304, 16115545, 16513201, 8694111, 11585939, 14413767, 6664599, 9553845, 12971486, 8358322, 10002885, 13292268, 10780600, 12623573, 14403561, 12418717, 14327229, 15517403, 14515069, 15764368, 16366271, 11250603, 13948116, 16777215, 14256481, 14656129, 15848130, 14005087, 14337152, 15918540, 15118118, 15531929, 9764857, 11258085 ],
    [ 16579283, 15378351, 8830016, 15257125, 9340985, 8949607, 6198292, 8703620, 9889626, 8972045, 12161285, 13162269, 8620113, 12616503, 8628101, 13827840, 9764857 ],
    [ 16777215, 15658734, 14540253 ],
    [ 16777215, 16053490, 15464440, 16248792, 15396319, 15007487 ],
    [ 16777215, 15658734, 14540253 ],
    [ 16777215, 15658734, 14540253, 16767177, 16770205, 16751331 ],
    [ 13421772, 11447982, 16751331, 10149119, 16763290, 16743786 ],
];

/**
 * `getPetTypeIndexFromProduct`: the digits the localization id ends in (`a0 pet12` -> 12), 0 for
 * an empty id and -1 when the digits are the whole id.
 */
export const getPetTypeIndexFromProduct = (productCode: string): number => {
    if (!productCode.length) return 0;

    let index = productCode.length - 1;

    while (index >= 0) {
        if (isNaN(parseInt(productCode.charAt(index)))) break;

        index--;
    }

    if (index > 0) return (parseInt(productCode.substring(index + 1)) || 0);

    return -1;
};

/** `getRaceLocalizationKey`: `pet.breed.<type>.<breed>`. */
export const getPetRaceLocalizationKey = (petType: number, breedId: number) => `pet.breed.${petType}.${breedId}`;

/** `parseSellablePalettes`: the palettes of this pet type that are for sale, in the server's order. */
export const parseSellablePetPalettes = (palettes: readonly CatalogSellablePetPalette[] | undefined, petType: number): CatalogSellablePetPalette[] | undefined => {
    if (!palettes) return undefined;

    return palettes.filter(palette => (palette.type === petType) && palette.sellable);
};

/** `addZeroPadding(color.toString(16).toUpperCase(), 6)`. */
const colorHex = (color: number) => color.toString(16).toUpperCase().padStart(6, '0');

/** `getPurchaseParameters`' extra parameter: the name, the palette id and the colour, one per line. */
export const getPetPurchaseParameter = (name: string, paletteId: number, color: number) => `${name}\n${paletteId}\n${colorHex(color)}`;

/**
 * `onApproveNameResult`'s cases (`event.result - 1`): the name is too long, too short, has
 * characters it may not, or is filtered - each has its `catalog.alert.petname.<reason>` text.
 * Any other result buys.
 */
export const PET_NAME_ERRORS: Readonly<Record<number, string>> = {
    1: 'long',
    2: 'short',
    3: 'chars',
    4: 'bobba',
};
