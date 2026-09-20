/**
 * The form state and rules of the variable sections of `uibuilder/presets/sections`
 * (`ValueOrVariableSection`, `VariableNameSection`, `PlaceholderNameSection`,
 * `PlaceholderTypeSection`) - what their getters and setters did, as pure functions an element's
 * `createForm` / `readIntParams` call. The sections themselves are the kit's
 * `WiredValueOrVariableSection`, `WiredVariableNameSection`, ... in `views/wired-setup/kit`.
 */
import { IWiredVariable } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, WiredVariablePickerState } from './WiredVariablePickerModel';

/** `ValueOrVariableSection`'s radio ids: `variables.reference_value.set_value` / `.from_variable`. */
export const VALUE_OR_VARIABLE_OPTION_VALUE = 0;
export const VALUE_OR_VARIABLE_OPTION_VARIABLE = 1;

/** Everything a `ValueOrVariableSection` holds: the radio (`option`), the number input (`value`) and the picker. */
export interface WiredValueOrVariableState {
    option: number;
    value: number;
    picker: WiredVariablePickerState;
}

/** `ValueOrVariableSection.variableSelectionFilter` - only variables with a value can be referenced. */
export const valueOrVariableFilter = (variable: IWiredVariable): boolean => variable.hasValue;

/**
 * `ValueOrVariableSection.init(variables, variableId, target, option, value)`. The source type
 * selector shows `target`; pass it through `resolveSourceTypeSelection` first when the box can
 * hold a target the section does not offer.
 */
export const createValueOrVariableState = (variables: readonly IWiredVariable[] | null | undefined, variableId: string, target: number, option: number, value: number): WiredValueOrVariableState =>
    ({ option, value, picker: createVariablePickerState(variables, variableId, target) });

/** `ValueOrVariableSection.isSourcePickingDisabled` - the merged input source only matters for a variable. */
export const isValueOrVariableSourcePickingDisabled = (state: WiredValueOrVariableState): boolean => (state.option === VALUE_OR_VARIABLE_OPTION_VALUE);

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
