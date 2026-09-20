/**
 * `conditions/§_-d1W§` (VARIABLE_VALUE, `wf_cnd_var_val_match`) - a variable's value compares to a
 * number or to another variable's value.
 *
 * Int params: `[ target, operator, reference option, reference value (a long: high, low),
 * reference target ]` - the operator is one of `CONDITION_OPERATORS` (0 `<`, 1 `=`, 2 `>`,
 * 3 `≤`, 4 `≠`, 5 `≥`); the reference option 0 compares with the typed value (any 32-bit int), 1 with
 * the reference variable. Variable ids: `[ variable, reference variable ]`. Both targets are merged
 * input sources (section 0 the variable, section 1 the reference) with the global and context
 * sources besides furni and users, and the element draws both type pickers itself; the reference
 * section's input source is greyed out while the typed value is used.
 *
 * `onEditStart` reads the value's low word only (`intParams[4]`), and drops it (0) when the box
 * compares with a variable; a box comparing with the value opens with no reference variable
 * (`WiredVariable.§_-i8§`, no selection).
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { intAsLong } from '../../common/WiredUtil';
import { createVariablePickerState, setPickerTarget, WiredVariableFilter, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';
import { ConditionCodes } from './conditionCodes';
import { resolveConditionMergedTypes } from './conditionShared';

export interface VariableValueConditionForm {
    /** `target` is `§_-nd§`, merged section 0. */
    picker: WiredVariablePickerState;
    operator: number;
    /** `_section3`, merged section 1. */
    reference: WiredValueOrVariableState;
}

/** `§_-d1W§.variableSelectionFilter1` - only variables with a value. */
export const variableValueConditionFilter: WiredVariableFilter = variable => variable.hasValue;

export const variableValueCondition: WiredElementDefinition<VariableValueConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.VARIABLE_VALUE,
    createForm: (triggerable, ctx) => {
        const variables = getWiredRoomVariables(triggerable);
        const option = getWiredInt(triggerable, 2);

        return resolveConditionMergedTypes(variableValueCondition, {
            picker: createVariablePickerState(variables, triggerable.variableIds[0] ?? '', getWiredInt(triggerable, 0)),
            operator: getWiredInt(triggerable, 1),
            reference: createValueOrVariableState(
                variables,
                (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[1] ?? ''),
                getWiredInt(triggerable, 5),
                option,
                (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? getWiredInt(triggerable, 4) : 0,
            ),
        }, ctx);
    },
    readIntParams: form => [
        form.picker.target,
        form.operator,
        form.reference.option,
        ...intAsLong(form.reference.value),
        form.reference.picker.target,
    ],
    readVariableIds: form => [ form.picker.variableId, form.reference.picker.variableId ],
    mergedSelections: [ [ 0, 0 ], [ 1, 1 ] ],
    mergedSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.merged.title.variables' : 'wiredfurni.params.sources.merged.title.variables_reference'),
    getMergedType: (form, id) => ((id === 0) ? form.picker.target : form.reference.picker.target),
    setMergedType: (form, id, sourceType) => ((id === 0)
        ? { ...form, picker: setPickerTarget(form.picker, sourceType) }
        : { ...form, reference: { ...form.reference, picker: setPickerTarget(form.reference.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    isInputSourceDisabled: (form, id, sourceType) => (sourceType === WIRED_SOURCE_MERGED) && (id === 1) && isValueOrVariableSourcePickingDisabled(form.reference),
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
