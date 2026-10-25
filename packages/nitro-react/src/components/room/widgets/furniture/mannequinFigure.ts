import { AvatarFigurePartType, AvatarGenderType } from '@nitrodevco/nitro-api';
import { AvatarFigureContainer, GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

/** The only six part types a mannequin wears; everything else on it belongs to a person. */
const CLOTHING_PART_TYPES = [
    AvatarFigurePartType.ChestAccessory,
    AvatarFigurePartType.CoatChest,
    AvatarFigurePartType.Chest,
    AvatarFigurePartType.Legs,
    AvatarFigurePartType.Shoes,
    AvatarFigurePartType.WaistAccessory,
];

/** The blank head a dummy wears in place of a face. */
const MANNEQUIN_HEAD_SET_ID = 99999;
const MANNEQUIN_HEAD_COLOR_ID = 99998;

/** The outfit as the dummy wears it: its clothes, on the mannequin's own faceless head. */
export const asMannequinFigure = (figure: string): string => {
    const container = new AvatarFigureContainer(figure);

    for (const part of container.getPartTypeIds()) {
        if (CLOTHING_PART_TYPES.indexOf(part) === -1) container.removePart(part);
    }

    container.updatePart(AvatarFigurePartType.Head, MANNEQUIN_HEAD_SET_ID, [ MANNEQUIN_HEAD_COLOR_ID ]);

    return container.getFigureString();
};

/** The outfit as you would wear it: your own figure with the mannequin's clothes swapped in. */
export const withMannequinOutfit = (figure: string, mannequinFigure: string): string => {
    const container = new AvatarFigureContainer(figure);
    const outfit = new AvatarFigureContainer(mannequinFigure);

    for (const part of CLOTHING_PART_TYPES) container.removePart(part);

    for (const part of outfit.getPartTypeIds()) {
        container.updatePart(part, outfit.getPartSetId(part), outfit.getPartColorIds(part));
    }

    return container.getFigureString();
};

/**
 * What the outfit costs in club levels. Flash asked the render manager the same question over
 * the same six part types, and refused the wear when your own level fell short - so an outfit of
 * free clothes is free to take, whatever club the person who dressed the dummy was in.
 */
export const getMannequinClubLevel = (figure: string, gender: AvatarGenderType): number =>
    GetAvatarRenderManager().getFigureClubLevel(new AvatarFigureContainer(figure), gender, CLOTHING_PART_TYPES);
