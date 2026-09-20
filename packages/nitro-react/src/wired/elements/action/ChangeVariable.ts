/**
 * `actiontypes/§_-d2J§` (CHANGE_VARIABLE) - applies an operation to a variable of the selected
 * furni, users, the room (global) or the context, with a typed value or another variable as the
 * operand.
 *
 * Int params: `[ target, operator, operand option, operand value as a long (high, low),
 * operand variable target ]` - the target is merged section 0's type, the operator one of
 * `CHANGE_VARIABLE_OPERATORS`, the operand option `ValueOrVariableSection`'s radio (sent as 0 for
 * an operator without an operand), and the operand target merged section 1's type. Variable ids:
 * `[ the variable, the operand variable ]`.
 */
import { IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { type WiredDropdownOption } from '../../common/expandableDropdown';
import { intAsLong } from '../../common/WiredUtil';
import { createVariablePickerState, setPickerTarget, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { WIRED_VARIABLE_ID_NONE } from './ActionVariableReference';

const operatorOption = (id: number, advanced: boolean = false): WiredDropdownOption =>
    ({ id, label: `\${wiredfurni.params.variables.operation.${id}}`, advanced });

const range = (from: number, to: number): number[] => Array.from({ length: (to - from) + 1 }, (_, index) => from + index);

/**
 * `§_-d2J§.operatorOptions` - the operator dropdown, in Flash's order: 0 to 6, then the advanced
 * ones 40, 41, 50, 60, 100 to 105, 110, 115 to 118, 111 to 114 and 119 to 122.
 */
export const CHANGE_VARIABLE_OPERATORS: WiredDropdownOption[] = [
    ...range(0, 6).map(id => operatorOption(id)),
    ...[ 40, 41, 50, 60, ...range(100, 105), 110, 115, 116, 117, 118, ...range(111, 114), ...range(119, 122) ].map(id => operatorOption(id, true)),
];

/** The operators `requiresOperand` excludes - they take no reference value. */
const OPERATORS_WITHOUT_OPERAND = [ 103, 60, 110 ];

/** `§_-d2J§.variableSelectionFilter1` - only a variable whose value can be written. */
export const changeVariableFilter = (variable: IWiredVariable): boolean => variable.canWriteValue;

export interface ChangeVariableActionForm {
    /** The picker; its `target` is Flash's `§_-nd§`, the merged type of section 0. */
    picker: WiredVariablePickerState;
    operator: number;
    /** The `ValueOrVariableSection`; its picker's target is merged section 1's type. */
    reference: WiredValueOrVariableState;
}

/** `§_-d2J§.requiresOperand`. */
export const changeVariableRequiresOperand = (form: ChangeVariableActionForm): boolean => !OPERATORS_WITHOUT_OPERAND.includes(form.operator);

export const changeVariableAction: WiredElementDefinition<ChangeVariableActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.CHANGE_VARIABLE,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const option = getWiredInt(triggerable, 2);
        // Flash: an operand given as a value has no variable (`WiredVariable.§_-i8§`), one given as a variable no value.
        const referenceId = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[1] ?? '');
        const value = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? getWiredInt(triggerable, 4) : 0;

        return {
            picker: createVariablePickerState(variables, triggerable.variableIds[0] ?? '', getWiredInt(triggerable, 0)),
            operator: getWiredInt(triggerable, 1),
            reference: createValueOrVariableState(variables, referenceId, getWiredInt(triggerable, 5), option, value),
        };
    },
    readIntParams: form => [
        form.picker.target,
        form.operator,
        changeVariableRequiresOperand(form) ? form.reference.option : 0,
        ...intAsLong(form.reference.value),
        form.reference.picker.target,
    ],
    readVariableIds: form => [ form.picker.variableId, form.reference.picker.variableId ],
    isInputSourceDisabled: (form, id, sourceType) =>
        (sourceType === WIRED_SOURCE_MERGED) && (id === 1) && (isValueOrVariableSourcePickingDisabled(form.reference) || !changeVariableRequiresOperand(form)),
    mergedSelections: [ [ 0, 0 ], [ 1, 1 ] ],
    mergedSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.merged.title.variables_destination' : 'wiredfurni.params.sources.merged.title.variables_reference'),
    getMergedType: (form, id) => ((id === 0) ? form.picker.target : form.reference.picker.target),
    setMergedType: (form, id, sourceType) => ((id === 0)
        ? { ...form, picker: setPickerTarget(form.picker, sourceType) }
        : { ...form, reference: { ...form.reference, picker: setPickerTarget(form.reference.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
