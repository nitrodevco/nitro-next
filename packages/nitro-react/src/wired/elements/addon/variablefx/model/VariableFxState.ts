/**
 * `addons/variablefx/model/§_-Z2j§` - the whole configuration of a Variable FX addon box while it
 * is edited: what the four presets show and what `readIntParamsFromForm` /
 * `readVariableIdsFromForm` / `readStringParamFromForm` write. Flash keeps one mutable instance and
 * calls `sanitize()` on it after every change; here the state is a plain object and
 * `sanitizeVariableFxState` returns the sanitised copy.
 *
 * `toRuntimeConfig` turns it into the renderer's `VariableFxConfigData`, which the live preview
 * draws exactly as the room would.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';
import { VariableFxConfigData } from '@nitrodevco/nitro-renderer';

import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER } from '../../../../WiredElement';
import { VariableFxAudience, VariableFxIconAlignment } from './VariableFxEditorEnums';
import { getVariableFxCategory, getVariableFxStyle, getVariableFxSubRendererOptions, variableFxCategoryUsesValueRange, variableFxOptionIn, variableFxRendererSupportsSegments } from './VariableFxEditorMetadata';
import type { VariableFxStyleDefinition } from './VariableFxStyleDefinition';

/** The levelling progress and number display categories, which `sanitize` treats apart. */
export const VARIABLE_FX_CATEGORY_LEVELLING_PROGRESS = 2;
export const VARIABLE_FX_CATEGORY_NUMBER_DISPLAY = 5;

/** `level_with_progress`, whose bar is drawn by the sub renderer. */
export const VARIABLE_FX_RENDERER_LEVEL_WITH_PROGRESS = 20;

/** `sanitize`'s ranges. */
export const VARIABLE_FX_UPDATE_MASK_MAX = 15;
export const VARIABLE_FX_SHOW_DURATION_MIN = 1500;
export const VARIABLE_FX_SHOW_DURATION_MAX = 20000;
export const VARIABLE_FX_SEGMENTS_MAX = 100;

export interface VariableFxState {
    categoryId: number;
    /** Whose variable is shown: `WIRED_SOURCE_FURNI` or `WIRED_SOURCE_USER`. */
    sourceType: number;
    /** `VariableFxAudience`. */
    visibility: number;
    /** `VariableFxShowMode`. */
    showMode: number;
    /** `§_-Z2f§` - the "show when the variable changes" checkbox mask (`update_mask.1`..`4`). */
    updateMask: number;
    showOnMouseHover: boolean;
    /** Milliseconds, 1500 to 20000. */
    showDuration: number;
    styleId: number;
    colorId: number;
    /** `§_-22S§`. */
    widthId: number;
    rendererId: number;
    defaultMinValue: number;
    defaultMaxValue: number;
    overrideMinEnabled: boolean;
    overrideMaxEnabled: boolean;
    overrideMinTarget: number;
    overrideMaxTarget: number;
    segments: number;
    subRendererId: number;
    /** `§_-N1C§` - `VariableFxIconAlignment`. */
    iconAlignment: number;
    icon: string;
    overrideMinVariableId: string;
    overrideMaxVariableId: string;
    audienceVariableId: string;
    audienceVariableValue: number;
}

/** `new §_-Z2j§()` - every field at its AS3 default. */
export const createVariableFxState = (categoryId: number): VariableFxState => ({
    categoryId,
    sourceType: 0,
    visibility: 0,
    showMode: 0,
    updateMask: 0,
    showOnMouseHover: false,
    showDuration: 0,
    styleId: 0,
    colorId: 0,
    widthId: 0,
    rendererId: 0,
    defaultMinValue: 0,
    defaultMaxValue: 0,
    overrideMinEnabled: false,
    overrideMaxEnabled: false,
    overrideMinTarget: 0,
    overrideMaxTarget: 0,
    segments: 0,
    subRendererId: 0,
    iconAlignment: 0,
    icon: '',
    overrideMinVariableId: '',
    overrideMaxVariableId: '',
    audienceVariableId: '',
    audienceVariableValue: 0,
});

const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));

/** `sanitizeIconAlignment` - right and double are kept, anything else is left. */
const sanitizeIconAlignment = (alignment: number): number =>
    ((alignment === VariableFxIconAlignment.RIGHT) || (alignment === VariableFxIconAlignment.DOUBLE)) ? alignment : VariableFxIconAlignment.LEFT;

/** `iconAlignmentRuntimeValue`. */
const iconAlignmentRuntimeValue = (alignment: number): string => {
    switch (sanitizeIconAlignment(alignment)) {
        case VariableFxIconAlignment.RIGHT: return 'right';
        case VariableFxIconAlignment.DOUBLE: return 'double';
        default: return 'left';
    }
};

const isVariableAudience = (visibility: number): boolean =>
    (visibility === VariableFxAudience.HAS_VARIABLE) || (visibility === VariableFxAudience.HAS_VARIABLE_VALUE);

/** `segmentRendererId` - the renderer whose segments count: the sub renderer of a level-with-progress style. */
export const variableFxSegmentRendererId = (state: VariableFxState): number =>
    ((state.categoryId === VARIABLE_FX_CATEGORY_LEVELLING_PROGRESS) && (state.rendererId === VARIABLE_FX_RENDERER_LEVEL_WITH_PROGRESS)) ? state.subRendererId : state.rendererId;

/** `currentStyle()`. */
export const variableFxCurrentStyle = (state: VariableFxState): VariableFxStyleDefinition => getVariableFxStyle(state.categoryId, state.styleId);

/** `sanitize()`. */
export const sanitizeVariableFxState = (input: VariableFxState): VariableFxState => {
    const state = { ...input };

    if ((state.sourceType !== WIRED_SOURCE_FURNI) && (state.sourceType !== WIRED_SOURCE_USER)) state.sourceType = WIRED_SOURCE_USER;
    if ((state.visibility < 0) || (state.visibility > 4)) state.visibility = VariableFxAudience.EVERYONE;
    if ((state.showMode < 0) || (state.showMode > 2)) state.showMode = 0;
    if ((state.sourceType === WIRED_SOURCE_FURNI) && !isVariableAudience(state.visibility)) state.visibility = VariableFxAudience.EVERYONE;
    if (!isVariableAudience(state.visibility)) {
        state.audienceVariableId = '';
        state.audienceVariableValue = 0;
    }

    state.updateMask = clamp(state.updateMask, 0, VARIABLE_FX_UPDATE_MASK_MAX);
    state.showDuration = clamp(state.showDuration, VARIABLE_FX_SHOW_DURATION_MIN, VARIABLE_FX_SHOW_DURATION_MAX);

    const category = getVariableFxCategory(state.categoryId);

    state.categoryId = category.id;

    const style = getVariableFxStyle(state.categoryId, state.styleId);

    state.styleId = style.id;
    state.colorId = variableFxOptionIn(style.colorOptions, state.colorId, style.defaultColor).id;
    state.widthId = variableFxOptionIn(style.widthOptions, state.widthId, style.defaultWidth).id;
    state.rendererId = variableFxOptionIn(style.rendererOptions, state.rendererId, style.defaultRenderer).id;

    if (state.categoryId === VARIABLE_FX_CATEGORY_LEVELLING_PROGRESS) {
        const subRenderers = getVariableFxSubRendererOptions(style);

        state.defaultMinValue = 0;
        state.defaultMaxValue = 100;
        // Flash's `optionIn(options, id, options[0])` with an empty list falls back to `null.id` and throws; no levelling style has none.
        state.subRendererId = (subRenderers.length > 0) ? variableFxOptionIn(subRenderers, state.subRendererId, subRenderers[0]).id : state.subRendererId;
    } else if (variableFxCategoryUsesValueRange(state.categoryId) && (state.defaultMaxValue <= state.defaultMinValue)) {
        state.defaultMaxValue = (state.defaultMinValue < 100) ? 100 : (state.defaultMinValue + 1);
    }

    state.overrideMinTarget = (state.overrideMinTarget === Number(VariableExtraSourceTypes.GLOBAL_SOURCE)) ? VariableExtraSourceTypes.GLOBAL_SOURCE : state.sourceType;
    state.overrideMaxTarget = (state.overrideMaxTarget === Number(VariableExtraSourceTypes.GLOBAL_SOURCE)) ? VariableExtraSourceTypes.GLOBAL_SOURCE : state.sourceType;
    state.segments = clamp(state.segments, 0, VARIABLE_FX_SEGMENTS_MAX);

    if (!variableFxRendererSupportsSegments(variableFxSegmentRendererId(state))) state.segments = 0;

    state.iconAlignment = (state.categoryId === VARIABLE_FX_CATEGORY_NUMBER_DISPLAY) ? sanitizeIconAlignment(state.iconAlignment) : 0;

    return state;
};

/** `toRuntimeConfig()` - the config the renderer draws. */
export const variableFxRuntimeConfig = (state: VariableFxState): VariableFxConfigData => {
    const category = getVariableFxCategory(state.categoryId);
    const style = variableFxCurrentStyle(state);
    const color = variableFxOptionIn(style.colorOptions, state.colorId, style.defaultColor);
    const width = variableFxOptionIn(style.widthOptions, state.widthId, style.defaultWidth);
    const renderer = variableFxOptionIn(style.rendererOptions, state.rendererId, style.defaultRenderer);
    const extra = new Map(style.extra);

    if (state.segments > 0) extra.set('segments', String(state.segments));

    if (state.categoryId === VARIABLE_FX_CATEGORY_LEVELLING_PROGRESS) {
        extra.set('sub_renderer', String(state.subRendererId));
    } else if (state.categoryId === VARIABLE_FX_CATEGORY_NUMBER_DISPLAY) {
        if (state.icon.length > 0) extra.set('icon', state.icon);

        extra.set('icon_alignment', iconAlignmentRuntimeValue(state.iconAlignment));
    }

    return new VariableFxConfigData(category.runtimeCategory, style.runtimeStyle, renderer.runtimeValue, width.runtimeValue, color.runtimeValue, state.defaultMinValue, state.defaultMaxValue, extra, category.id, state.styleId, state.rendererId);
};
