/**
 * `actiontypes/§_-d22§` (SET_FURNI_HIGHLIGHT, `wf_act_set_highlight`, WIN63-202610201032) - outlines,
 * glows, darkens, tints or brightens the target furni or users, for the selected users or for everyone.
 *
 * Int params (`readIntParamsFromForm`): `[ everyone, type, strength, colour, animation, easing, targets
 * are users ]`. Brighten's strength dropdown runs 0 / 76 and saves half of it; Darken and Brighten save
 * colour 0 / white. The "target" section merges the furni slot with the second user slot, the "visibility
 * audience" section is the first user slot (`mergedSelections [[0,1],[-1,0]]`), greyed while everyone sees it.
 */
import { clamp } from '#base/utils/clamp';

import { getIntFromString } from '../../common/WiredUtil';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_MERGED, WIRED_SOURCE_USER, type WiredElementContext, type WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `HIGHLIGHT_COLORS`: the palette; Color tint offers it without the first (white). */
export const SET_FURNI_HIGHLIGHT_COLORS: readonly number[] = [ 16777215, 16772910, 16758528, 16747008, 16734774, 16724016, 16724855, 16733627, 15741144, 12076287, 7883007, 4611327, 2395391, 2146303, 2156016, 1628592, 2149480, 5300272, 10546464, 16557530, 12291417 ];

export const SET_FURNI_HIGHLIGHT_TYPE_DARKEN = 2;
export const SET_FURNI_HIGHLIGHT_TYPE_TINT = 3;
export const SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN = 4;
/** Brighten's "On" in its strength dropdown. */
export const SET_FURNI_HIGHLIGHT_BRIGHTEN_ON = 76;

/** `darkenLevels`: `wired.furni_highlight.darken_levels`, and only a missing key falls back to 0-100 in tens. */
export const getDarkenLevels = (ctx: WiredElementContext): number[] => {
    const key = 'wired.furni_highlight.darken_levels';
    const property = ctx.configHas(key) ? ctx.configString(key) : '0,10,20,30,40,50,60,70,80,90,100';

    return property.split(',').map(level => getIntFromString(level, 0));
};

/** `darkeningAvailable`: a darken level above 0. */
export const isDarkeningAvailable = (ctx: WiredElementContext): boolean => getDarkenLevels(ctx).some(level => level > 0);

export interface SetFurniHighlightActionForm {
    everyone: boolean;
    /** `§_-H1r§` - the "everyone" info was shown (or the box was saved for everyone): it is not shown again. */
    everyoneInfoShown: boolean;
    /** `_targetUsers`. */
    targetUsers: boolean;
    type: number;
    /** The strength dropdown's selected id (Brighten's 0 / 76). */
    strength: number;
    color: number;
    animation: number;
    easing: number;
}

/** `updateStrengthOptions`: the ids the strength dropdown offers for a type. */
export const getStrengthOptions = (type: number, ctx: WiredElementContext): number[] => {
    if (type === SET_FURNI_HIGHLIGHT_TYPE_DARKEN) return getDarkenLevels(ctx);
    if (type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) return [ 0, SET_FURNI_HIGHLIGHT_BRIGHTEN_ON ];

    const step = (type === SET_FURNI_HIGHLIGHT_TYPE_TINT) ? 25 : 100;
    const ids: number[] = [];

    for (let level = 0; level <= 100; level += step) ids.push(level);

    return ids;
};

/** `updateStrengthOptions`: the option a type's dropdown selects for a strength - the nearest level. */
export const fitStrength = (type: number, strength: number, ctx: WiredElementContext): number => {
    if (type === SET_FURNI_HIGHLIGHT_TYPE_DARKEN) {
        const levels = getDarkenLevels(ctx);

        return levels.reduce((best, level) => ((Math.abs(level - strength) < Math.abs(best - strength)) ? level : best), levels[0] ?? 0);
    }

    if (type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) return (strength > 0) ? SET_FURNI_HIGHLIGHT_BRIGHTEN_ON : 0;

    const step = (type === SET_FURNI_HIGHLIGHT_TYPE_TINT) ? 25 : 100;

    return Math.round(clamp(strength, 0, 100) / step) * step;
};

/** `ColorPalettePreset.color`: a colour not in the palette becomes its first. */
export const fitPaletteColor = (palette: readonly number[], color: number): number => (palette.includes(color) ? color : palette[0]);

/** `updateColorAvailability`: the palette a type shows. */
export const getHighlightPalette = (type: number): readonly number[] => ((type === SET_FURNI_HIGHLIGHT_TYPE_TINT) ? SET_FURNI_HIGHLIGHT_COLORS.slice(1) : SET_FURNI_HIGHLIGHT_COLORS);

/** `updateAnimationOptions`: Brighten only pulses. */
export const getAnimationOptions = (type: number): number[] => ((type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) ? [ 1 ] : [ 0, 1 ]);

/** The form a type change leaves: its strength, palette and animation refitted (`onHighlightTypeChanged`). */
export const withHighlightType = (form: SetFurniHighlightActionForm, type: number, ctx: WiredElementContext): SetFurniHighlightActionForm => ({
    ...form,
    type,
    strength: fitStrength(type, form.strength, ctx),
    color: fitPaletteColor(getHighlightPalette(type), form.color),
    animation: (type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) ? 1 : form.animation,
});

export const setFurniHighlightAction: WiredElementDefinition<SetFurniHighlightActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.SET_FURNI_HIGHLIGHT,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
    // `onEditStart`: a saved Darken with darkening off opens as an Outline, off, in the first colour.
    createForm: (triggerable, ctx) => {
        const everyone = getWiredBoolean(triggerable, 0);
        let type = getWiredInt(triggerable, 1);
        let strength = getWiredInt(triggerable, 2);
        let color = getWiredInt(triggerable, 3);

        if ((type === SET_FURNI_HIGHLIGHT_TYPE_DARKEN) && !isDarkeningAvailable(ctx)) {
            type = 0;
            strength = 0;
            color = SET_FURNI_HIGHLIGHT_COLORS[0];
        }

        return {
            everyone,
            everyoneInfoShown: everyone,
            targetUsers: getWiredBoolean(triggerable, 6),
            type,
            strength: fitStrength(type, (type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) ? strength * 2 : strength, ctx),
            color: fitPaletteColor(getHighlightPalette(type), color >>> 0),
            animation: (type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) ? 1 : clamp(getWiredInt(triggerable, 4), 0, 1),
            easing: getWiredInt(triggerable, 5),
        };
    },
    readIntParams: form => [
        form.everyone ? 1 : 0,
        form.type,
        (form.type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) ? form.strength / 2 : form.strength,
        (form.type === SET_FURNI_HIGHLIGHT_TYPE_DARKEN) ? 0 : ((form.type === SET_FURNI_HIGHLIGHT_TYPE_BRIGHTEN) ? 16777215 : form.color),
        form.animation,
        form.easing,
        form.targetUsers ? 1 : 0,
    ],
    mergedSelections: [ [ 0, 1 ], [ -1, 0 ] ],
    mergedSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.merged.title.target' : 'wiredfurni.params.visualization.visibility_audience'),
    getMergedType: (form, id) => (((id === 1) || form.targetUsers) ? WIRED_SOURCE_USER : WIRED_SOURCE_FURNI),
    setMergedType: (form, id, sourceType) => ((id === 0) ? { ...form, targetUsers: sourceType === WIRED_SOURCE_USER } : form),
    hasCustomTypePicker: id => (id === 1),
    isInputSourceDisabled: (form, id, sourceType) => (sourceType === WIRED_SOURCE_MERGED) && (id === 1) && form.everyone,
};
