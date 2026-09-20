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
import { createVariablePickerState, setPickerTarget, WiredVariableFilter, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { resolveConditionMergedTypes } from './conditionShared';

/** The time unit dropdown's ids, `variables.duration.0` to `.7`. */
export const VARIABLE_AGE_TIME_UNITS = [ 0, 1, 2, 3, 4, 5, 6, 7 ];

export interface VariableAgeConditionForm {
    /** `target` is `§_-nd§`, the merged type. */
    picker: WiredVariablePickerState;
    comparison: number;
    compareValue: number;
    duration: number;
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
    createForm: (triggerable, ctx) => resolveConditionMergedTypes(variableAgeCondition, {
        picker: createVariablePickerState(getWiredRoomVariables(triggerable), triggerable.variableIds[0] ?? '', getWiredInt(triggerable, 0)),
        comparison: getWiredInt(triggerable, 1),
        compareValue: getWiredInt(triggerable, 2),
        duration: getWiredInt(triggerable, 4),
        timeUnit: getWiredInt(triggerable, 5),
    }, ctx),
    readIntParams: form => [
        form.picker.target,
        form.comparison,
        form.compareValue,
        ...intAsLong(form.duration),
        form.timeUnit,
    ],
    readVariableIds: form => [ form.picker.variableId ],
    mergedSelections: [ [ 0, 0 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables',
    getMergedType: form => form.picker.target,
    setMergedType: (form, _id, sourceType) => ({ ...form, picker: setPickerTarget(form.picker, sourceType) }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
