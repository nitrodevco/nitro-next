/**
 * Derives the part grid and colour palettes for one figure set type - the React-first port of
 * the old `AvatarEditorUtilities.createCategory` + `CategoryData` classes: instead of mutable
 * category objects with notifier callbacks, everything is computed from the store's figure and
 * the avatar structure on demand, and selection state is simply "what the figure currently
 * wears".
 */
import { IFigurePartSet, IPartColor } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { useMemo } from 'react';

import { useAvatarEditorStore } from '#base/context/avatar-editor';
import { useConfigBoolean } from '#base/context/system';
import { useOwnClubLevel } from '#base/context/user';
import { firstSelectableColorId, getAvatarEditorPartSets, toCssHexColor } from '#base/utils';

export interface AvatarEditorPartData {
    id: number;
    partSet?: IFigurePartSet;
    /** The colours the part renders with (the figure's selected colours). */
    partColors: (IPartColor | undefined)[];
    usesColors: boolean;
    isClear: boolean;
    isClub: boolean;
    isSellable: boolean;
    selected: boolean;
    disabled: boolean;
}

export interface AvatarEditorColorData {
    id: number;
    partColor: IPartColor;
    /** CSS colour for the swatch. */
    color: string;
    isClub: boolean;
    selected: boolean;
    disabled: boolean;
}

const MAX_COLOR_LAYERS = 2;

export const useAvatarEditorData = (setType: string): { parts: AvatarEditorPartData[]; palettes: AvatarEditorColorData[][]; maxColorLayers: number } => {
    const figureParts = useAvatarEditorStore(x => x.parts);
    const gender = useAvatarEditorStore(x => x.gender);
    const figureSetIds = useAvatarEditorStore(x => x.figureSetIds);
    // Widened to a plain number: `ClubLevelEnum` values compare against the structure's numeric club levels.
    const clubLevel: number = useOwnClubLevel();
    const clubItemsFirst = useConfigBoolean('avatareditor.show.clubitems.first');
    const clubItemsDimmed = useConfigBoolean('avatareditor.show.clubitems.dimmed');

    return useMemo(() => {
        const renderManager = GetAvatarRenderManager();
        const figureData = renderManager.structureData;
        const type = figureData.getSetType(setType);
        const palette = type && figureData.getPalette(type.paletteId);

        if (!type || !palette) return { parts: [], palettes: [], maxColorLayers: 0 };

        const usesColors = setType !== 'hd' ? true : false;
        const selected = figureParts[setType];
        const selectedColorIds = selected?.colorIds?.length ? selected.colorIds : [ firstSelectableColorId(setType, clubLevel) ];
        const selectedColors = selectedColorIds.map(colorId => palette.getColor(colorId));

        // --- the part grid -----------------------------------------------------------------
        const sets = getAvatarEditorPartSets(type, { gender, clubLevel, figureSetIds, clubItemsFirst, clubItemsDimmed });

        const parts: AvatarEditorPartData[] = sets.map(partSet => ({
            id: partSet.id,
            partSet,
            partColors: selectedColors,
            usesColors,
            isClub: partSet.clubLevel > 0,
            isSellable: partSet.isSellable,
            isClear: false,
            selected: selected?.setId === partSet.id,
            disabled: partSet.clubLevel > clubLevel,
        }));

        // A non-mandatory set type offers the "clear" cell first (`isntMandatorySet`).
        const mandatory = renderManager.getMandatoryAvatarPartSetIds(gender, clubItemsDimmed ? 2 : clubLevel);

        const hasClear = !mandatory.includes(setType);

        if (hasClear) {
            parts.unshift({ id: -1, partColors: [], usesColors: false, isClear: true, isClub: false, isSellable: false, selected: !selected, disabled: false });
        }

        // --- the colour palettes ------------------------------------------------------------
        // `AvatarEditorGridView.initFromList` ends on the selected item's `showPalettes(colorLayerCount)`;
        // the clear item, selected while nothing of the set type is worn, has no part set and so no layers.
        const layerCount = selected ? Math.max(1, ...(sets.find(partSet => partSet.id === selected.setId)?.parts ?? []).map(part => part.colorLayerIndex)) : 1;
        const maxColorLayers = (hasClear && !selected) ? 0 : Math.min(MAX_COLOR_LAYERS, layerCount);
        const colors = [ ...palette.colors.values() ]
            .filter(color => color.isSelectable && (clubItemsDimmed || color.clubLevel <= clubLevel))
            .sort((a, b) => (a.clubLevel !== b.clubLevel ? a.clubLevel - b.clubLevel : a.index - b.index));
        // `usesColors` only says whether the grid *tints* thumbnails (faces are rendered by the
        // imager instead) - every set type with a palette, skin tone included, still offers it.
        const palettes: AvatarEditorColorData[][] = Array.from({ length: maxColorLayers }, (_, layer) => colors.map(color => ({
            id: color.id,
            partColor: color,
            color: toCssHexColor(color.rgb),
            isClub: color.clubLevel > 0,
            selected: (selectedColorIds[layer] ?? selectedColorIds[0]) === color.id,
            disabled: color.clubLevel > clubLevel,
        })));

        return { parts, palettes, maxColorLayers };
    }, [ setType, figureParts, gender, figureSetIds, clubLevel, clubItemsFirst, clubItemsDimmed ]);
};
