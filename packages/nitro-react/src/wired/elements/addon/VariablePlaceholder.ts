/**
 * `addons/§_-L2e§` (VARIABLE_PLACEHOLDER, `wf_xtra_text_output_variable`) - a `$(name)`
 * placeholder the stack's texts can use, replaced by a variable of the selected furni or users,
 * of the room (global) or of the context (merged input source 0): its value, or the text its
 * text connector gives that value, for one holder or for all of them joined by a delimiter.
 *
 * String param: the name, then `\t` and the delimiter when it shows them all. Int params:
 * `[ show all, variable target, text mode ]`. Variable ids: `[ the variable ]`.
 *
 * Picking a variable (`onChangeVariable`) names the placeholder after it while the name is empty
 * or still the previous variable's name, and turns the text mode off (and unavailable) for a
 * variable without a text connector. A global or context variable has one holder, so "show all"
 * is off and unavailable for them (`updateMultipleOptionVisibility`). Switching the target
 * retargets the picker, which reports the variable it restores through the same callback - so
 * `setMergedType` runs both.
 */
import { type IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { flatVariableName } from '../../common/WiredUtil';
import { createVariablePickerState, getPickerSelectedVariable, setPickerTarget, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { normalizeWiredVariableName } from '../../common/WiredVariableSections';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES } from '../action/ActionVariableReference';
import { AddonCodes } from './addonCodes';
import { readWiredPlaceholderAddonFields, type WiredPlaceholderAddonFields, writeWiredPlaceholderAddonString } from './addonShared';

/** `§_-L2e§.variableSelectionFilter` - only a variable with a value. */
export const variablePlaceholderFilter = (variable: IWiredVariable): boolean => variable.hasValue;

/** `§_-L2e§.prettifiedName` / `§_-M29§.prettifiedName` - the name a placeholder gets from its variable. */
export const variablePlaceholderName = (variable: IWiredVariable | null): string => (variable ? flatVariableName(variable) : '');

export interface VariablePlaceholderAddonForm extends WiredPlaceholderAddonFields {
    picker: WiredVariablePickerState;
    /** `VariablePlaceholderModeSection.isTextMode`. */
    textMode: boolean;
    /** `§_-X2p§.get(1).disabled` - the chosen variable has no text connector. */
    textModeDisabled: boolean;
    /** `prettifiedName(§_-X10§)` - the name the previously chosen variable gave the placeholder. */
    previousVariableName: string;
    /** The room's variables, for the retarget in `setMergedType`. */
    variables: readonly IWiredVariable[];
}

/** `onChangeVariable` - the fields that follow the chosen variable (`textMode` must be set before). */
export const changeVariablePlaceholderVariable = <F extends { name: string; textMode: boolean; textModeDisabled: boolean; previousVariableName: string }>(form: F, variable: IWiredVariable | null): F => {
    const textModeDisabled = !variable || !variable.textConnector;
    const variableName = variablePlaceholderName(variable);
    const renames = (form.name === '') || (form.name === form.previousVariableName);

    return {
        ...form,
        textModeDisabled,
        textMode: textModeDisabled ? false : form.textMode,
        name: renames ? normalizeWiredVariableName(variableName) : form.name,
        previousVariableName: variableName,
    };
};

/** `updateMultipleOptionVisibility` - a global or context variable cannot show several holders. */
export const isVariablePlaceholderMultipleDisabled = (target: number): boolean =>
    (target === Number(VariableExtraSourceTypes.CONTEXT_SOURCE)) || (target === Number(VariableExtraSourceTypes.GLOBAL_SOURCE));

const updateMultipleOption = (form: VariablePlaceholderAddonForm): VariablePlaceholderAddonForm =>
    (isVariablePlaceholderMultipleDisabled(form.picker.target) ? { ...form, showMultiple: false } : form);

export const variablePlaceholderAddon: WiredElementDefinition<VariablePlaceholderAddonForm> = {
    holder: 'addon',
    code: AddonCodes.VARIABLE_PLACEHOLDER,
    createForm: (triggerable, ctx) => {
        const variables = getWiredRoomVariables(triggerable);
        const picker = createVariablePickerState(variables, triggerable.variableIds[0] ?? '', resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, 1)));
        const selected = getPickerSelectedVariable(variables, picker);
        const form: VariablePlaceholderAddonForm = {
            ...readWiredPlaceholderAddonFields(triggerable),
            picker,
            textMode: getWiredBoolean(triggerable, 2),
            textModeDisabled: false,
            previousVariableName: variablePlaceholderName(selected),
            variables,
        };

        return updateMultipleOption(changeVariablePlaceholderVariable(form, selected));
    },
    readIntParams: form => [ form.showMultiple ? 1 : 0, form.picker.target, form.textMode ? 1 : 0 ],
    readStringParam: writeWiredPlaceholderAddonString,
    readVariableIds: form => [ form.picker.variableId ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables',
    mergedSelections: [ [ 0, 0 ] ],
    getMergedType: form => form.picker.target,
    setMergedType: (form, id, sourceType) => {
        const picker = setPickerTarget(form.picker, sourceType);

        return updateMultipleOption(changeVariablePlaceholderVariable({ ...form, picker }, getPickerSelectedVariable(form.variables, picker)));
    },
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
    hasCustomTypePicker: () => true,
};
