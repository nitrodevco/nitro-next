/**
 * The form state and rules of the variable sections of `uibuilder/presets/sections`
 * (`ValueOrVariableSection`, `VariableNameSection`, `PlaceholderNameSection`,
 * `PlaceholderTypeSection`) - what their getters and setters did, as pure functions an element's
 * `createForm` / `readIntParams` call. The sections themselves are the kit's
 * `WiredValueOrVariableSection`, `WiredVariableNameSection`, ... in `views/wired-setup/kit`.
 */
import { IWiredVariable } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, filterPickerVariables, getPickerSelectedVariable, WiredVariablePickerState } from './WiredVariablePickerModel';

/** `ValueOrVariableSection`'s radio ids: `variables.reference_value.set_value` / `.from_variable`. */
export const VALUE_OR_VARIABLE_OPTION_VALUE = 0;
export const VALUE_OR_VARIABLE_OPTION_VARIABLE = 1;

/** Everything a `ValueOrVariableSection` holds: the radio (`option`), the number input (`value`) and the picker. */
export interface WiredValueOrVariableState {
    option: number;
    value: number;
    picker: WiredVariablePickerState;
    /**
     * `§_-J1T§` (WIN63-202610121624) - the "same holder" checkbox
     * (`wiredfurni.params.variables.reference_value.same_holder`): read the reference variable on
     * each furni or user the box acts on. Only boxes built with it (`param9`) show it.
     */
    sameHolder?: boolean;
}

/** `WiredInputSourcePicker.§_-F1K§` / `USER_SOURCE` - the targets a "same holder" reference can follow. */
const SAME_HOLDER_TARGETS = [ 0, 1 ];

/**
 * `ValueOrVariableSection.referenceVariableOnTarget` - the box reads its reference on the same
 * holder: the variable option, the checkbox ticked, and the reference on the box's own target
 * (`primaryTarget`), which must be furni or users (`isPrimaryTargetEligible`).
 */
export const isValueOrVariableOnSameHolder = (state: WiredValueOrVariableState, primaryTarget: number): boolean =>
    (state.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) && !!state.sameHolder && SAME_HOLDER_TARGETS.includes(primaryTarget) && (state.picker.target === primaryTarget);

/** Whether the "same holder" checkbox can be ticked: the reference is on the box's own furni or user target. */
export const isValueOrVariableSameHolderEligible = (state: WiredValueOrVariableState, primaryTarget: number): boolean =>
    SAME_HOLDER_TARGETS.includes(primaryTarget) && (state.picker.target === primaryTarget);

/**
 * `ValueOrVariableSection.init(variables, variableId, target, option, value)`. `target` is the
 * box's saved one, kept even when the section's source type selector does not offer it - the
 * selector then only shows its first option (`resolveSourceTypeSelection`).
 */
export const createValueOrVariableState = (variables: readonly IWiredVariable[] | null | undefined, variableId: string, target: number, option: number, value: number, sameHolder: boolean = false): WiredValueOrVariableState =>
    ({ option, value, picker: createVariablePickerState(variables, variableId, target), sameHolder });

/** `DECIMAL_PATTERN`, `§_-UN§` (hex) and `BINARY_PATTERN` - what the unified input reads as a number. */
const DECIMAL_PATTERN = /^-?\d+$/;
const HEX_PATTERN = /^0x[0-9a-fA-F]+$/;
const BINARY_PATTERN = /^0b[01]+$/;

/** `ValueOrVariableSection.isNumericText`. */
export const isValueOrVariableNumericText = (text: string): boolean => DECIMAL_PATTERN.test(text) || HEX_PATTERN.test(text) || BINARY_PATTERN.test(text);

/** `ValueOrVariableSection.parseNumericText`. */
export const parseValueOrVariableNumericText = (text: string): number => {
    if (HEX_PATTERN.test(text)) return parseInt(text.substring(2), 16);

    if (BINARY_PATTERN.test(text)) return parseInt(text.substring(2), 2);

    return Number(text);
};

/** `ValueOrVariableSection.variableSelectionFilter` with the box's own filter (`param11`). */
export const valueOrVariableSelectable = (variable: IWiredVariable, filter?: (variable: IWiredVariable) => boolean): boolean =>
    variable.hasValue && (!filter || filter(variable));

/**
 * `ValueOrVariablePopupPreset.eligibleVariables` - the variables a typed name can mean: the
 * picker's list for the section's target (every variable of it, as the picker lists rejected ones
 * greyed) that the section accepts.
 */
export const valueOrVariableEligibleVariables = (variables: readonly IWiredVariable[] | null | undefined, state: WiredValueOrVariableState, filter?: (variable: IWiredVariable) => boolean): IWiredVariable[] =>
    filterPickerVariables(variables, state.picker.target, state.picker.initialVariableId).filter(variable => valueOrVariableSelectable(variable, filter));

/** What the unified input's text says (`onInputTextChanged`). */
export interface WiredValueOrVariableText {
    option: number;
    /** The typed number, when it is a valid one - otherwise the value stays what it was. */
    value?: number;
    /** The one variable the text names, when it names exactly one. */
    variable?: IWiredVariable;
    valid: boolean;
    ambiguous: boolean;
}

/**
 * `ValueOrVariableSection.onInputTextChanged` - a number (decimal, `0x` or `0b`) is the value
 * option, valid inside the int range and `[min, max]`; a lone sign is an invalid value; anything
 * else is the variable option, valid when exactly one eligible variable has that name (ignoring
 * case) and ambiguous when more do.
 */
export const readValueOrVariableText = (text: string, min: number, max: number, eligible: readonly IWiredVariable[]): WiredValueOrVariableText => {
    if (isValueOrVariableNumericText(text)) {
        const parsed = parseValueOrVariableNumericText(text);
        const valid = !Number.isNaN(parsed) && (parsed === Math.floor(parsed)) && (parsed >= -2147483648) && (parsed <= 2147483647) && (parsed >= min) && (parsed <= max);

        return { option: VALUE_OR_VARIABLE_OPTION_VALUE, value: valid ? parsed : undefined, valid, ambiguous: false };
    }

    if ((text === '-') || (text === '+')) return { option: VALUE_OR_VARIABLE_OPTION_VALUE, valid: false, ambiguous: false };

    const lowered = text.toLowerCase();
    const named = eligible.filter(variable => variable.variableName.toLowerCase() === lowered);

    return { option: VALUE_OR_VARIABLE_OPTION_VARIABLE, variable: (named.length === 1) ? named[0] : undefined, valid: named.length === 1, ambiguous: named.length > 1 };
};

/** `currentValidationError`'s two messages, with Flash's fallbacks. */
export const VALUE_OR_VARIABLE_ERROR_AMBIGUOUS = { key: 'wiredfurni.params.variables.reference_value.ambiguous', fallback: 'More than one variable has this name.' };
export const VALUE_OR_VARIABLE_ERROR_INVALID = { key: 'wiredfurni.params.variables.reference_value.invalid', fallback: 'Enter a valid whole number or variable name.' };
/** `currentValidationError` of a `variableOnlyOrEmpty` section (the link dataframe rows' "Variable text"). */
export const VALUE_OR_VARIABLE_ERROR_VARIABLE_OR_EMPTY = { key: 'wiredfurni.params.variables.reference_value.variable_or_empty', fallback: 'Select an available variable or leave this field empty.' };

/**
 * `ValueOrVariableSection.currentValidationError` (without `variableOnlyOrEmpty`, which only the
 * link dataframe rows use - the section checks that itself) - `null` while the text is valid and, for the variable option, the
 * selected variable is one the section accepts.
 */
export const valueOrVariableValidationError = (state: WiredValueOrVariableState, valid: boolean, ambiguous: boolean, variables: readonly IWiredVariable[] | null | undefined, filter?: (variable: IWiredVariable) => boolean): typeof VALUE_OR_VARIABLE_ERROR_INVALID | null => {
    const selected = getPickerSelectedVariable(variables, state.picker);

    if (valid && ((state.option !== VALUE_OR_VARIABLE_OPTION_VARIABLE) || (!!selected && valueOrVariableSelectable(selected, filter)))) return null;

    return ambiguous ? VALUE_OR_VARIABLE_ERROR_AMBIGUOUS : VALUE_OR_VARIABLE_ERROR_INVALID;
};

/**
 * `VariableNameSection.variableName` / `PlaceholderNameSection.placeholderName` - spaces become
 * underscores and everything is lower case; the field is rewritten to this on every change.
 */
export const normalizeWiredVariableName = (text: string): string => text.split(' ').join('_').toLowerCase();

/** `VariableNameSection`'s `TextInputParam` limit. */
export const VARIABLE_NAME_MAX_CHARACTERS = 40;
/** `PlaceholderNameSection`'s `TextInputParam` limit and `restrict` (a Flash `TextField.restrict` string). */
export const PLACEHOLDER_NAME_MAX_CHARACTERS = 32;
export const PLACEHOLDER_NAME_RESTRICT = 'a-zA-Z_0-9 ';

/** `PlaceholderTypeSection.delimiter` (the getter) - only a multiple placeholder has one. */
export const placeholderDelimiter = (showMultiple: boolean, delimiter: string): string => (showMultiple ? delimiter : '');
