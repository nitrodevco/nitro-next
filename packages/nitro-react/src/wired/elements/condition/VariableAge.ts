/**
 * `conditions/§_-mb§` (VARIABLE_AGE, `wf_cnd_var_age_match`) - how long ago a variable was created
 * or last changed compares to a duration.
 *
 * Int params: `[ target, comparison, compared time, duration (a long: high, low), time unit ]` -
 * the comparison is 0 (`comparison.0`) or 2 (`comparison.2`); the compared time 0 the creation
 * (`variables.compare_value.0`), 1 the last update (`.1`); the unit one of
 * `variables.duration.0` to `.7`. Variable ids: `[ variable ]`. Only variables whose creation or
 * update time can be read are offered, and the compared time the selected variable cannot read is
 * greyed out. The target is the merged input source (furni, users, global, context), whose type
 * picker the element draws itself.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { intAsLong } from '../../common/WiredUtil';
import { createVariablePickerState, finalizePickerSelection, setPickerTarget, WiredVariableFilter, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, VALUE_OR_VARIABLE_OPTION_VALUE, VALUE_OR_VARIABLE_OPTION_VARIABLE, WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';
import { ConditionCodes } from './conditionCodes';

/** The time unit dropdown's ids, `variables.duration.0` to `.7`. */
export const VARIABLE_AGE_TIME_UNITS = [ 0, 1, 2, 3, 4, 5, 6, 7 ];

export interface VariableAgeConditionForm {
    /** `target` is `§_-nd§`, the merged type. */
    picker: WiredVariablePickerState;
    comparison: number;
    compareValue: number;
    /**
     * The duration (WIN63-202610121624 `ValueOrVariableSection`, merged section 1: a value or a
     * variable - Wired Faculty 12/10/2026: "Variable Age can use timeout from a variable").
     */
    duration: WiredValueOrVariableState;
    timeUnit: number;
}

/** `§_-mb§.variableSelectionFilter`. */
export const variableAgeConditionFilter: WiredVariableFilter = variable => (variable.canReadCreationTime || variable.canReadLastUpdateTime);

/**
 * `updateAgeOptions(variable)` - which compared times are greyed out: the creation time for a
 * variable that cannot read it, else the update time for one that cannot read that. No variable,
 * nothing greyed.
 */
export const variableAgeDisabledCompareValues = (variable: { canReadCreationTime: boolean; canReadLastUpdateTime: boolean } | null): [ boolean, boolean ] => {
    if (!variable) return [ false, false ];

    if (!variable.canReadCreationTime) return [ true, false ];

    return [ false, !variable.canReadLastUpdateTime ];
};

export const variableAgeCondition: WiredElementDefinition<VariableAgeConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.VARIABLE_AGE,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const option = (getWiredInt(triggerable, 6) === VALUE_OR_VARIABLE_OPTION_VARIABLE) ? VALUE_OR_VARIABLE_OPTION_VARIABLE : VALUE_OR_VARIABLE_OPTION_VALUE;

        return {
            picker: createVariablePickerState(variables, triggerable.variableIds[0] ?? '', getWiredInt(triggerable, 0)),
            comparison: getWiredInt(triggerable, 1),
            compareValue: getWiredInt(triggerable, 2),
            duration: createValueOrVariableState(variables, (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[1] ?? ''), getWiredInt(triggerable, 7), option, getWiredInt(triggerable, 4)),
            timeUnit: getWiredInt(triggerable, 5),
        };
    },
    readIntParams: form => [
        form.picker.target,
        form.comparison,
        form.compareValue,
        ...intAsLong(form.duration.value),
        form.timeUnit,
        form.duration.option,
        form.duration.picker.target,
    ],
    readVariableIds: (form, ctx) => [ finalizePickerSelection(ctx.roomVariables, form.picker), finalizePickerSelection(ctx.roomVariables, form.duration.picker) ],
    mergedSelections: [ [ 0, 0 ], [ 1, 1 ] ],
    mergedSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.merged.title.variables' : 'wiredfurni.params.sources.merged.title.variables_reference'),
    getMergedType: (form, id) => ((id === 0) ? form.picker.target : form.duration.picker.target),
    setMergedType: (form, id, sourceType) => ((id === 0)
        ? { ...form, picker: setPickerTarget(form.picker, sourceType) }
        : { ...form, duration: { ...form.duration, picker: setPickerTarget(form.duration.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
