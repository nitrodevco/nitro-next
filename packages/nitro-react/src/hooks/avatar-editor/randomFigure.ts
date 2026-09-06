import { AvatarGenderType, IFigurePartSet, IPalette } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

import { FIGURE_SET_TYPES, FigureParts } from '#base/context/avatar-editor/store';

/** Port of the old `FigureGenerator.generateRandomFigure` - pure function over the avatar structure. */

const randomInt = (max: number): number => Math.floor(Math.random() * max);

const randomElement = <T>(values: T[]): T => values[randomInt(values.length)];

const randomPartSet = (setType: string, gender: AvatarGenderType, clubLevel: number, figureSetIds: number[]): IFigurePartSet | undefined => {
    const figureData = GetAvatarRenderManager().structureData;
    const type = figureData.getSetType(setType);

    if (!type) return undefined;

    const options = [ ...type.partSets.values() ].filter(option =>
        option.isSelectable
        && (option.gender === AvatarGenderType.Unisex || option.gender === gender)
        && option.clubLevel <= clubLevel
        && (!option.isSellable || figureSetIds.includes(option.id)));

    if (!options.length) return undefined;

    return randomElement(options);
};

const randomColors = (palette: IPalette | undefined, partSet: IFigurePartSet, clubLevel: number): number[] => {
    if (!palette) return [];

    const totalLayers = Math.max(0, ...partSet.parts.map(part => part.colorLayerIndex));
    const options = [ ...palette.colors.values() ].filter(option => option.isSelectable && option.clubLevel <= clubLevel);

    if (!options.length) return [];

    return Array.from({ length: totalLayers }, () => randomElement(options).id);
};

/**
 * A random full figure: the mandatory set types plus a random selection of the optional ones,
 * keeping `keepSetTypes` (the face, by default) from the current figure.
 */
export const generateRandomFigureParts = (current: FigureParts, gender: AvatarGenderType, clubLevel: number, figureSetIds: number[], keepSetTypes: string[] = [ 'hd' ]): FigureParts => {
    const renderManager = GetAvatarRenderManager();
    const figureData = renderManager.structureData;
    const mandatory = renderManager.getMandatoryAvatarPartSetIds(gender, clubLevel);
    const optional = FIGURE_SET_TYPES.filter(setType => !mandatory.includes(setType));
    const chosen = new Set<string>([ ...mandatory, ...Array.from({ length: randomInt(optional.length) + 1 }, () => randomElement([ ...optional ])) ]);
    const next: FigureParts = {};

    for (const setType of keepSetTypes) {
        if (current[setType]) next[setType] = current[setType];
    }

    for (const setType of chosen) {
        if (next[setType]) continue;

        const partSet = randomPartSet(setType, gender, clubLevel, figureSetIds);

        if (!partSet) continue;

        const type = figureData.getSetType(setType);
        const colorIds = partSet.isColorable ? randomColors(type && figureData.getPalette(type.paletteId), partSet, clubLevel) : [];

        next[setType] = { setId: partSet.id, colorIds };
    }

    return next;
};
