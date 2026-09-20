/**
 * `addons/§_-M29§` (VARIABLE_CAPTURER, `wf_xtra_text_input_variable`) - a `#(name)` capture the
 * stack's texts can use: what a user types there is written into a context variable, as a number
 * or - for a variable with a text connector - as the value whose text was typed.
 *
 * String param: the name. Int params: `[ text mode ]`. Variable ids: `[ the variable ]`. The
 * picker is always on context variables and has no source type selector.
 *
 * Picking a variable names the capture after it and gates the text mode as `§_-L2e§` does
 * (`changeVariablePlaceholderVariable`).
 */
import { type IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, getPickerSelectedVariable, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { normalizeWiredVariableName } from '../../common/WiredVariableSections';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredRoomVariables } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';
import { changeVariablePlaceholderVariable, variablePlaceholderName } from './VariablePlaceholder';

/** `§_-M29§.variableSelectionFilter` - a variable that can be created, deleted and written. */
export const variableCapturerFilter = (variable: IWiredVariable): boolean =>
    variable.hasValue && variable.canCreateAndDelete && variable.canWriteValue;

export interface VariableCapturerAddonForm {
    name: string;
    picker: WiredVariablePickerState;
    textMode: boolean;
    textModeDisabled: boolean;
    previousVariableName: string;
}

export const variableCapturerAddon: WiredElementDefinition<VariableCapturerAddonForm> = {
    holder: 'addon',
    code: AddonCodes.VARIABLE_CAPTURER,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const picker = createVariablePickerState(variables, triggerable.variableIds[0] ?? '', Number(VariableExtraSourceTypes.CONTEXT_SOURCE));
        const selected = getPickerSelectedVariable(variables, picker);

        return changeVariablePlaceholderVariable({
            name: normalizeWiredVariableName(triggerable.stringParam.split('\t')[0]),
            picker,
            textMode: getWiredBoolean(triggerable, 0),
            textModeDisabled: false,
            previousVariableName: variablePlaceholderName(selected),
        }, selected);
    },
    readIntParams: form => [ form.textMode ? 1 : 0 ],
    readStringParam: form => form.name,
    readVariableIds: form => [ form.picker.variableId ],
};
