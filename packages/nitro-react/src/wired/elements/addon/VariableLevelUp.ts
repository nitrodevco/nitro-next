/**
 * `addons/§_-3p§` (VARIABLE_LEVEL_UP, `wf_xtra_var_lvlup_system`) - turns a variable into xp on a
 * level-up curve and creates sub-variables from it (current level, xp, progress, ...). The curve
 * is linear (a step size and a maximum level), exponential (the first level's xp, an increase
 * factor in percent and a maximum level) or manual (typed `level=xp` lines, interpolated between).
 *
 * Int params: `[ sub-variable mask, mode ]`, then `[ step size, max level ]` for linear or
 * `[ first level xp, increase factor, max level ]` for exponential. String param: the manual
 * lines, empty for the other modes.
 *
 * Flash registers the element for frame updates while it is edited and re-previews the xp of
 * levels 1, 2, 3, 5, 10 and 20 whenever the params change (`update`); here the preview is a pure
 * function of the form (`variableLevelUpPreviewXps`), recomputed with it.
 */
import type { WiredSubVariableParam } from '../../common/SubVariableParam';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';
import { type AbstractLevelUpConfig, toInt32 } from './levelupper/AbstractLevelUpConfig';
import { ExponentialLevelUpper } from './levelupper/ExponentialLevelUpper';
import { InterpolateLevelUpper } from './levelupper/InterpolateLevelUpper';
import { LinearLevelUpper } from './levelupper/LinearLevelUpper';

/** `§_-3p§.MODE_MANUAL` / `MODE_LINEAR` / `MODE_EXPONENTIAL`. */
export const LEVEL_UP_MODE_MANUAL = 0;
export const LEVEL_UP_MODE_LINEAR = 1;
export const LEVEL_UP_MODE_EXPONENTIAL = 2;

/** `createLevelXpPreview([ 1, 2, 3, 5, 10, 20 ])`. */
export const LEVEL_UP_PREVIEW_LEVELS = [ 1, 2, 3, 5, 10, 20 ];

/** The number inputs' `NumberInputParam(initial, min, max, width)`, which `reset()` puts back. */
export const LEVEL_UP_STEP_SIZE = { initial: 100, min: 1, max: 100000, width: 35 };
export const LEVEL_UP_MAX_LEVEL = { initial: 50, min: 2, max: 100000, width: 20 };
export const LEVEL_UP_FIRST_LEVEL_XP = { initial: 100, min: 1, max: 100000, width: 35 };
export const LEVEL_UP_INCREASE_FACTOR = { initial: 20, min: 1, max: 100000, width: 35 };

/** The manual lines' `TextAreaParam(60, -1, -1, 30, 1000, "", placeholder, "0123456789=\r")`. */
export const LEVEL_UP_MANUAL_HEIGHT = 60;
export const LEVEL_UP_MANUAL_MAX_LENGTH = 1000;
export const LEVEL_UP_MANUAL_RESTRICT = '0123456789=\r';

/** `createSubVariableCreator("wiredfurni.params.levelup.subvariable.", ...)`'s variables. */
export const LEVEL_UP_SUB_VARIABLES: WiredSubVariableParam[] = [
    { id: 0, name: 'current_level' },
    { id: 1, name: 'current_xp' },
    { id: 2, name: 'progress' },
    { id: 3, name: 'progress_percentage' },
    { id: 4, name: 'xp_required' },
    { id: 5, name: 'xp_remaining' },
    { id: 6, name: 'is_maxed' },
    { id: 7, name: 'max_level' },
];

export interface VariableLevelUpAddonForm {
    subVariables: number;
    mode: number;
    manualText: string;
    stepSize: number;
    /** `_maxLevel1` - the linear curve's. */
    linearMaxLevel: number;
    firstLevelXp: number;
    increaseFactor: number;
    /** `_maxLevel2` - the exponential curve's. */
    exponentialMaxLevel: number;
}

/** Flash's `int(text)`: the text as a `Number` (0 when empty, `NaN` - so 0 - when not a number), truncated. */
const parseInt32 = (text: string): number => toInt32(Number(text));

/**
 * `parseLevelToXpMap` - the manual lines as level -> xp, `null` when a level or its xp is not
 * above the line before (the first level must be above 1 and its xp above 0). Lines without `=`
 * are skipped.
 */
export const parseLevelUpManualText = (text: string): Map<number, number> | null => {
    const points = new Map<number, number>();
    let previousLevel = 1;
    let previousXp = 0;

    for (const line of text.split('\n')) {
        const parts = line.split('=', 2);

        if (parts.length < 2) continue;

        const level = parseInt32(parts[0]);
        const xp = parseInt32(parts[1]);

        if ((level <= previousLevel) || (xp <= previousXp)) return null;

        points.set(level, xp);
        previousLevel = level;
        previousXp = xp;
    }

    return points;
};

/** `simulateLevelUpper` - the curve the form describes, `null` for unusable manual lines. */
export const simulateVariableLevelUpper = (form: VariableLevelUpAddonForm): AbstractLevelUpConfig | null => {
    switch (form.mode) {
        case LEVEL_UP_MODE_MANUAL: {
            const points = parseLevelUpManualText(form.manualText);

            return points ? new InterpolateLevelUpper(points) : null;
        }
        case LEVEL_UP_MODE_LINEAR:
            return new LinearLevelUpper(form.stepSize, form.linearMaxLevel);
        case LEVEL_UP_MODE_EXPONENTIAL:
            return new ExponentialLevelUpper(form.firstLevelXp, form.increaseFactor, form.exponentialMaxLevel);
        default:
            return null;
    }
};

/** `update`'s preview - the xp of each preview level up to the curve's maximum; a level past it has none. */
export const variableLevelUpPreviewXps = (form: VariableLevelUpAddonForm): number[] => {
    const config = simulateVariableLevelUpper(form);
    const xps: number[] = [];

    if (!config) return xps;

    for (const level of LEVEL_UP_PREVIEW_LEVELS) {
        if ((level <= 0) || (level > config.maxLevel)) break;

        xps.push(config.xpForLevel(level));
    }

    return xps;
};

export const variableLevelUpAddon: WiredElementDefinition<VariableLevelUpAddonForm> = {
    holder: 'addon',
    code: AddonCodes.VARIABLE_LEVEL_UP,
    createForm: (triggerable) => {
        const mode = getWiredInt(triggerable, 1);
        const first = getWiredInt(triggerable, 2);
        const second = getWiredInt(triggerable, 3);
        const third = getWiredInt(triggerable, 4);
        const linear = mode === LEVEL_UP_MODE_LINEAR;
        const exponential = mode === LEVEL_UP_MODE_EXPONENTIAL;

        return {
            subVariables: getWiredInt(triggerable, 0),
            mode,
            manualText: (mode === LEVEL_UP_MODE_MANUAL) ? triggerable.stringParam : '',
            stepSize: linear ? first : LEVEL_UP_STEP_SIZE.initial,
            linearMaxLevel: linear ? second : LEVEL_UP_MAX_LEVEL.initial,
            firstLevelXp: exponential ? first : LEVEL_UP_FIRST_LEVEL_XP.initial,
            increaseFactor: exponential ? second : LEVEL_UP_INCREASE_FACTOR.initial,
            exponentialMaxLevel: exponential ? third : LEVEL_UP_MAX_LEVEL.initial,
        };
    },
    readIntParams: (form) => {
        const params = [ form.subVariables, form.mode ];

        if (form.mode === LEVEL_UP_MODE_LINEAR) params.push(form.stepSize, form.linearMaxLevel);
        else if (form.mode === LEVEL_UP_MODE_EXPONENTIAL) params.push(form.firstLevelXp, form.increaseFactor, form.exponentialMaxLevel);

        return params;
    },
    readStringParam: form => ((form.mode === LEVEL_UP_MODE_MANUAL) ? form.manualText : ''),
};
