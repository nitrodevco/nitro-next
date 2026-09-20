/**
 * `variables/ECHO_VARIABLE`'s element `§_-b2m§` (`wf_var_echo`) - creates a variable that mirrors
 * another one under a new name: same target, availability and flags as its source.
 *
 * String param: the variable name. Variable ids: `[ source variable ]`. The source is picked with a
 * choose variable section (furni, user, global or context variables; the variables made by
 * variable furni - `VariableType.UNKNOWN_0`, Flash `§_-ck§.§_-513§` - are not offered). Picking a
 * source fills the name with the source's flat name (`Util.flatVariableName`) while the name is
 * empty or still the previous source's flat name. The created variable's target
 * (`variableType()`) is the picker's.
 */
import { IWiredVariable, VariableExtraSourceTypes, VariableType } from '@nitrodevco/nitro-packets';

import { flatVariableName } from '../../common/WiredUtil';
import { createVariablePickerState, getPickerSelectedVariable, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER } from '../../WiredElement';
import { getWiredRoomVariables } from '../../WiredTriggerable';
import { VariableCodes } from './variableCodes';
import { createVariableElementForm, readVariableName, WiredVariableElementDefinition, WiredVariableElementForm } from './VariableElement';

/** `createChooseVariableSection(-1, [ §_-Y2L§, USER_SOURCE, GLOBAL_SOURCE, CONTEXT_SOURCE ], ...)`. */
export const ECHO_VARIABLE_SOURCE_TYPES: readonly number[] = [ WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE ];

/** `§_-b2m§.variableSelectionFilter`. */
export const echoVariableFilter = (variable: IWiredVariable): boolean => Number(variable.variableType) !== Number(VariableType.UNKNOWN_0);

export interface EchoVariableForm extends WiredVariableElementForm {
    picker: WiredVariablePickerState;
    /** `§_-X10§` - the source picked last, whose flat name the name field may still hold. */
    lastVariable: IWiredVariable | null;
}

/** `§_-b2m§.onVariableSelected` - the picker moved to `variable`. */
export const selectEchoVariableSource = (form: EchoVariableForm, picker: WiredVariablePickerState, variable: IWiredVariable | null): EchoVariableForm => {
    const name = readVariableName(form);
    // Flash compares the raw flat name with the field's normalised text, so a source whose name has capitals is never followed.
    const followsSource = (name.length === 0) || ((form.lastVariable !== null) && (flatVariableName(form.lastVariable) === name));

    return {
        ...form,
        picker,
        name: followsSource ? ((variable === null) ? '' : flatVariableName(variable)) : form.name,
        lastVariable: variable,
    };
};

export const echoVariable: WiredVariableElementDefinition<EchoVariableForm> = {
    holder: 'variable',
    code: VariableCodes.ECHO_VARIABLE,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const variableId = triggerable.variableIds[0] ?? '';
        const variable = variables.find(entry => entry.variableId === variableId) ?? null;
        const picker = createVariablePickerState(variables, variableId, (variable !== null) ? Number(variable.variableTarget) : WIRED_SOURCE_USER);

        return {
            ...createVariableElementForm(triggerable.stringParam),
            picker,
            lastVariable: getPickerSelectedVariable(variables, picker),
        };
    },
    readStringParam: readVariableName,
    readVariableIds: form => [ form.picker.variableId ],
    initialVariableName: form => form.initialVariableName,
    variableType: form => form.picker.target,
};
