/**
 * The part sets a set type's grid lists, in the grid's order - `HabboAvatarEditor.createCategory`'s
 * filter and sort: selectable, the editing gender's or unisex, over the user's club level only with
 * `avatareditor.show.clubitems.dimmed`, a sellable set only when the user owns it
 * (`hasFigureSetIdInInventory`); sellable sets last, then by club level - descending with
 * `avatareditor.show.clubitems.first` (`orderByClubDesc`), else ascending - then by id the same way.
 */
import { AvatarGenderType, IFigurePartSet, ISetType } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

export interface AvatarEditorPartSetFilter {
    gender: AvatarGenderType;
    clubLevel: number;
    /** The sellable sets the user owns (`FigureSetIdsEventMessage`). */
    figureSetIds: readonly number[];
    clubItemsFirst: boolean;
    clubItemsDimmed: boolean;
}

/** `orderByClubDesc` / `orderByClubAsc`. */
const partSorter = (clubFirst: boolean) => (a: IFigurePartSet, b: IFigurePartSet): number => {
    if (a.isSellable !== b.isSellable) return a.isSellable ? 1 : -1;
    if (a.clubLevel !== b.clubLevel) return clubFirst ? b.clubLevel - a.clubLevel : a.clubLevel - b.clubLevel;

    return clubFirst ? b.id - a.id : a.id - b.id;
};

export const getAvatarEditorPartSets = (type: ISetType, { gender, clubLevel, figureSetIds, clubItemsFirst, clubItemsDimmed }: AvatarEditorPartSetFilter): IFigurePartSet[] => [ ...type.partSets.values() ]
    .filter((partSet) => {
        if (!partSet.isSelectable) return false;
        if (partSet.gender !== AvatarGenderType.Unisex && partSet.gender !== gender) return false;
        if (!clubItemsDimmed && partSet.clubLevel > clubLevel) return false;
        if (partSet.isSellable && !figureSetIds.includes(partSet.id)) return false;

        return true;
    })
    .sort(partSorter(clubItemsFirst));

/** The first colour a set type may select (`avatarSetFirstSelectableColor`) - used when the figure has no colour yet. */
export const firstSelectableColorId = (setType: string, clubLevel: number): number => {
    const figureData = GetAvatarRenderManager().structureData;
    const type = figureData.getSetType(setType);
    const palette = type && figureData.getPalette(type.paletteId);

    if (!palette) return -1;

    for (const color of palette.colors.values()) {
        if (color.isSelectable && color.clubLevel <= clubLevel) return color.id;
    }

    return -1;
};
