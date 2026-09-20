/**
 * `addons/variablefx/§_-416§` - the base of the six Variable FX addons (health points, progress
 * bar, levelling progress, status bar, boss bar, number display): an effect drawn over the users or
 * furni of the box's source type showing one of their variables. Each subclass only fixes its
 * category (`categoryId`) and, for two of them, one more int param or the string param.
 *
 * Int params (`writeIntParams`):
 * `[ sourceType, visibility, showMode, updateMask, showOnMouseHover, showDuration, styleId, colorId,
 * widthId, rendererId, defaultMin (long: 10, 11), defaultMax (long: 12, 13), overrideMinEnabled,
 * overrideMaxEnabled, overrideMinTarget, overrideMaxTarget, audienceValue (long: 18, 19), segments ]`
 * and at 21 the subclass's extra int. `readIntParams` reads each long's low word only (11, 13, 19),
 * as Flash does. Variable ids: `[ override min, override max, audience ]`.
 *
 * The dialog is 1.45 times as wide (`widthModifier`) and has a furni / user source type selector in
 * its header (`§_-J2U§`, the int param 0). `validate` refuses a value range whose maximum is not
 * above its minimum, for the categories that have one.
 *
 * The form is the editor state `§_-P1n§` (always sanitised, as Flash sanitises it after every
 * change) plus what the presets hold on their own and `currentState()` applies on top: the value
 * range's two number inputs and the two override rows (checkbox + variable picker, whose target is
 * the row's source type). The change functions below are the presets' listeners
 * (`stateChanged` / `onNumberChange` / `onRowChange` / `onAudienceVariableSaved`) and the header's
 * `sourceType` setter.
 */
import { IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { pushIntAsLong } from '../../../common/WiredUtil';
import { createVariablePickerState, WiredVariablePickerState } from '../../../common/WiredVariablePickerModel';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, WiredElementDefinition } from '../../../WiredElement';
import type { WiredTriggerable } from '../../../WiredTriggerable';
import { VariableFxAudience } from './model/VariableFxEditorEnums';
import { variableFxCategoryUsesValueRange, variableFxRendererSupportsSegments } from './model/VariableFxEditorMetadata';
import { createVariableFxState, sanitizeVariableFxState, variableFxCurrentStyle, variableFxSegmentRendererId, VariableFxState } from './model/VariableFxState';

/** `§_-416§.widthModifier`. */
export const VARIABLE_FX_WIDTH_MODIFIER = 1.45;

/** `getHeaderSourceTypeSelectorParam` - furni or users. */
export const VARIABLE_FX_SOURCE_TYPES: readonly number[] = [ WIRED_SOURCE_FURNI, WIRED_SOURCE_USER ];

/** `VariableFxVariableOverrideRowPreset.§_-Z2m§` / `MAXIMUM`. */
export const VARIABLE_FX_OVERRIDE_MIN = 0;
export const VARIABLE_FX_OVERRIDE_MAX = 1;

/** One `VariableFxVariableOverrideRowPreset`: its checkbox and its picker (the picker's target is the row's `§_-E§`). */
export interface VariableFxOverrideRow {
    enabled: boolean;
    picker: WiredVariablePickerState;
}

export interface VariableFxForm {
    /** `§_-P1n§`. */
    state: VariableFxState;
    /** `VariableFxValueRangePreset`'s two number inputs. */
    rangeMin: number;
    rangeMax: number;
    overrideMin: VariableFxOverrideRow;
    overrideMax: VariableFxOverrideRow;
    /** `wiredContext.roomVariablesList.variables` - the pickers are re-initialised from it when the source type changes. */
    roomVariables: readonly IWiredVariable[] | undefined;
}

/** What a subclass adds to `§_-416§`. */
export interface VariableFxAddonOptions {
    code: number;
    categoryId: number;
    /** The int param at 21: `§_-t1W§` writes `subRendererId`, `§_-N1s§` the icon alignment. */
    extraIntParam?: 'subRendererId' | 'iconAlignment';
    /** `§_-N1s§` keeps the number display's icon in the string param. */
    iconStringParam?: boolean;
}

/** `VariableFxVariableOverrideRowPreset.sourceOptionsForType` - the row's selector: the box's source type or global. */
export const variableFxOverrideSourceTypes = (sourceType: number): readonly number[] =>
    (sourceType === WIRED_SOURCE_FURNI) ? [ WIRED_SOURCE_FURNI, VariableExtraSourceTypes.GLOBAL_SOURCE ] : [ WIRED_SOURCE_USER, VariableExtraSourceTypes.GLOBAL_SOURCE ];

/** `VariableFxVariableOverrideRowPreset.variableSelectionFilter`. */
export const variableFxOverrideFilter = (variable: IWiredVariable): boolean => variable.hasValue;

/** `VariableFxVariableOverrideRowPreset.init(variables, state)`. */
const initOverrideRow = (variables: readonly IWiredVariable[] | undefined, state: VariableFxState, kind: number): VariableFxOverrideRow => {
    const isMin = kind === VARIABLE_FX_OVERRIDE_MIN;

    return {
        enabled: isMin ? state.overrideMinEnabled : state.overrideMaxEnabled,
        picker: createVariablePickerState(variables, isMin ? state.overrideMinVariableId : state.overrideMaxVariableId, isMin ? state.overrideMinTarget : state.overrideMaxTarget),
    };
};

/** `VariableFxAdvancedRangePreset.refreshForSourceType` - its rows re-read from the state while the section shows. */
const refreshOverrideRows = (form: VariableFxForm): VariableFxForm => {
    if (!variableFxCategoryUsesValueRange(form.state.categoryId)) return form;

    return {
        ...form,
        overrideMin: initOverrideRow(form.roomVariables, form.state, VARIABLE_FX_OVERRIDE_MIN),
        overrideMax: initOverrideRow(form.roomVariables, form.state, VARIABLE_FX_OVERRIDE_MAX),
    };
};

/**
 * `VariableFxVisualizationSettingsPreset.applyToState` on a state its dropdowns show: a hidden or
 * disabled dropdown writes nothing, except that a shown but disabled segments dropdown clears the
 * segments and a hidden or disabled icon dropdown clears the icon.
 */
export const applyVariableFxVisualizationRules = (state: VariableFxState): VariableFxState => {
    const style = variableFxCurrentStyle(state);
    const segmentsDisabled = !variableFxRendererSupportsSegments(variableFxSegmentRendererId(state));

    return {
        ...state,
        segments: segmentsDisabled ? 0 : state.segments,
        icon: style.supportsIcon ? state.icon : '',
    };
};

/** `VariableFxAdvancedRangePreset.applyToState(state, finalize)` - the rows' values, while the section shows. */
const applyOverrideRows = (form: VariableFxForm, state: VariableFxState): VariableFxState => {
    if (!variableFxCategoryUsesValueRange(state.categoryId)) return state;

    return {
        ...state,
        overrideMinEnabled: form.overrideMin.enabled,
        overrideMinTarget: form.overrideMin.picker.target,
        overrideMinVariableId: form.overrideMin.picker.variableId,
        overrideMaxEnabled: form.overrideMax.enabled,
        overrideMaxTarget: form.overrideMax.picker.target,
        overrideMaxVariableId: form.overrideMax.picker.variableId,
    };
};

/** `VariableFxValueRangePreset.applyToState` - the two inputs, while the section shows. */
const applyValueRange = (form: VariableFxForm, state: VariableFxState): VariableFxState =>
    variableFxCategoryUsesValueRange(state.categoryId) ? { ...state, defaultMinValue: form.rangeMin, defaultMaxValue: form.rangeMax } : state;

/** `currentState()` - every preset applied to the state, then sanitised. */
export const currentVariableFxState = (form: VariableFxForm): VariableFxState =>
    sanitizeVariableFxState(applyOverrideRows(form, applyValueRange(form, applyVariableFxVisualizationRules(form.state))));

/** `VariableFxVisualizationSettingsPreset.stateChanged` - a dropdown of the visualization section changed. */
export const changeVariableFxVisualization = (form: VariableFxForm, patch: Partial<VariableFxState>): VariableFxForm => ({
    ...form,
    state: sanitizeVariableFxState(applyVariableFxVisualizationRules({ ...form.state, ...patch })),
});

/** `VariableFxValueRangePreset.onNumberChange`. */
export const changeVariableFxValueRange = (form: VariableFxForm, rangeMin: number, rangeMax: number): VariableFxForm => {
    const next = { ...form, rangeMin, rangeMax };

    return { ...next, state: sanitizeVariableFxState(applyValueRange(next, form.state)) };
};

/** `VariableFxVisibilitySettingsPreset.stateChanged` - the show mode, the update mask, the duration, the hover flag or a plain audience changed. */
export const changeVariableFxVisibility = (form: VariableFxForm, patch: Partial<Pick<VariableFxState, 'visibility' | 'showMode' | 'showOnMouseHover' | 'updateMask' | 'showDuration'>>): VariableFxForm => ({
    ...form,
    state: sanitizeVariableFxState({ ...form.state, ...patch }),
});

/** `VariableFxVisibilitySettingsPreset.onAudienceVariableSaved` - the audience popup's save. */
export const saveVariableFxAudienceVariable = (form: VariableFxForm, variableId: string, withValue: boolean, value: number): VariableFxForm => ({
    ...form,
    state: sanitizeVariableFxState({
        ...form.state,
        visibility: withValue ? VariableFxAudience.HAS_VARIABLE_VALUE : VariableFxAudience.HAS_VARIABLE,
        audienceVariableId: variableId,
        audienceVariableValue: withValue ? value : 0,
    }),
});

/** `VariableFxAdvancedRangePreset.onRowChange` - an override row's checkbox, picker or source type changed. */
export const changeVariableFxOverrideRow = (form: VariableFxForm, kind: number, row: VariableFxOverrideRow): VariableFxForm => {
    const next = (kind === VARIABLE_FX_OVERRIDE_MIN) ? { ...form, overrideMin: row } : { ...form, overrideMax: row };

    return { ...next, state: sanitizeVariableFxState(applyOverrideRows(next, form.state)) };
};

/** `§_-416§.sourceType = x` - the header's selector. */
export const setVariableFxSourceType = (form: VariableFxForm, sourceType: number): VariableFxForm =>
    refreshOverrideRows({ ...form, state: sanitizeVariableFxState({ ...form.state, sourceType }) });

/** `§_-416§.readIntParams(intParams, state)` + the subclass's. */
const readIntParams = (params: number[], state: VariableFxState, options: VariableFxAddonOptions): VariableFxState => {
    // AS3 coerces a missing entry to 0 for an int field, while `param != 0` is true for one.
    const int = (index: number): number => params[index] ?? 0;
    const flag = (index: number): boolean => params[index] !== 0;

    const next: VariableFxState = {
        ...state,
        sourceType: int(0),
        visibility: int(1),
        showMode: int(2),
        updateMask: int(3),
        showOnMouseHover: flag(4),
        showDuration: int(5),
        styleId: int(6),
        colorId: int(7),
        widthId: int(8),
        rendererId: int(9),
        defaultMinValue: int(11),
        defaultMaxValue: int(13),
        overrideMinEnabled: flag(14),
        overrideMaxEnabled: flag(15),
        overrideMinTarget: int(16),
        overrideMaxTarget: int(17),
        audienceVariableValue: int(19),
        segments: int(20),
    };

    if (options.extraIntParam === 'subRendererId') next.subRendererId = int(21);
    if (options.extraIntParam === 'iconAlignment') next.iconAlignment = int(21);

    return next;
};

/** `§_-416§.writeIntParams(params, state)` + the subclass's. */
const writeIntParams = (state: VariableFxState, options: VariableFxAddonOptions): number[] => {
    const params: number[] = [
        state.sourceType,
        state.visibility,
        state.showMode,
        state.updateMask,
        state.showOnMouseHover ? 1 : 0,
        state.showDuration,
        state.styleId,
        state.colorId,
        state.widthId,
        state.rendererId,
    ];

    pushIntAsLong(params, state.defaultMinValue);
    pushIntAsLong(params, state.defaultMaxValue);
    params.push(state.overrideMinEnabled ? 1 : 0);
    params.push(state.overrideMaxEnabled ? 1 : 0);
    params.push(state.overrideMinTarget);
    params.push(state.overrideMaxTarget);
    pushIntAsLong(params, state.audienceVariableValue);
    params.push(state.segments);

    if (options.extraIntParam === 'subRendererId') params.push(state.subRendererId);
    if (options.extraIntParam === 'iconAlignment') params.push(state.iconAlignment);

    return params;
};

/** `§_-416§.onEditStart`. */
const createVariableFxForm = (triggerable: WiredTriggerable, options: VariableFxAddonOptions): VariableFxForm => {
    const roomVariables = triggerable.wiredContext.roomVariablesList?.variables;
    const state = sanitizeVariableFxState({
        ...readIntParams(triggerable.intParams, createVariableFxState(options.categoryId), options),
        icon: options.iconStringParam ? triggerable.stringParam : '',
        overrideMinVariableId: triggerable.variableIds[0] ?? '',
        overrideMaxVariableId: triggerable.variableIds[1] ?? '',
        audienceVariableId: triggerable.variableIds[2] ?? '',
    });

    return {
        state,
        rangeMin: state.defaultMinValue,
        rangeMax: state.defaultMaxValue,
        overrideMin: initOverrideRow(roomVariables, state, VARIABLE_FX_OVERRIDE_MIN),
        overrideMax: initOverrideRow(roomVariables, state, VARIABLE_FX_OVERRIDE_MAX),
        roomVariables,
    };
};

/** One `§_-416§` subclass. */
export const createVariableFxAddon = (options: VariableFxAddonOptions): WiredElementDefinition<VariableFxForm> => ({
    holder: 'addon',
    code: options.code,
    widthModifier: VARIABLE_FX_WIDTH_MODIFIER,
    createForm: triggerable => createVariableFxForm(triggerable, options),
    readIntParams: form => writeIntParams(currentVariableFxState(form), options),
    readVariableIds: (form) => {
        const state = currentVariableFxState(form);

        return [ state.overrideMinVariableId, state.overrideMaxVariableId, state.audienceVariableId ];
    },
    readStringParam: form => (options.iconStringParam ? currentVariableFxState(form).icon : ''),
    validate: (form, ctx) => {
        const state = form.state;

        if (variableFxCategoryUsesValueRange(state.categoryId) && (state.defaultMaxValue <= state.defaultMinValue)) return ctx.localize('wiredfurni.error.variable_fx.value_range');

        return null;
    },
    headerSourceTypeSelector: {
        options: () => [ ...VARIABLE_FX_SOURCE_TYPES ],
        get: form => form.state.sourceType,
        set: setVariableFxSourceType,
    },
});
