/**
 * `actiontypes/GiveVariable` (GIVE_VARIABLE) - gives the selected furni, users or the context a
 * variable, with an initial value typed or, since WIN63-202610121624, read from another variable
 * (Wired Faculty 12/10/2026: "Give Variable can initialize from a variable").
 *
 * Int params: `[ target, initial value as a long (high, low), override existing, value option,
 * reference target, same holder ]` - the target is the merged source type the variable goes to
 * (furni, users or `VariableExtraSourceTypes` CONTEXT), picked in the variable section's header;
 * the value is sent through `Util.pushIntAsLong` and read back from its low word; the option is
 * the `ValueOrVariableSection`'s (0 a value, 1 a variable), the reference target merged section
 * 1's type, and "same holder" 1 when the reference is read on each target itself. Variable ids:
 * `[ the variable, the reference or "n" ]` - the variable one the box may create and delete
 * (`canCreateAndDelete`).
 *
 * `onEditStart` zeroes the initial value when the variable it opens with cannot be written or the
 * value comes from a variable, and `onVariableSelected` greys the value section out for a variable
 * without a value - the view derives that from the picker's selection.
 */
import { IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { intAsLong } from '../../common/WiredUtil';
import { createVariablePickerState, finalizePickerSelection, getPickerSelectedVariable, setPickerTarget, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableOnSameHolder, VALUE_OR_VARIABLE_OPTION_VALUE, VALUE_OR_VARIABLE_OPTION_VARIABLE, type WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { WIRED_VARIABLE_ID_NONE } from './ActionVariableReference';

/** `GiveVariable.variableSelectionFilter` - only a variable the box may create and delete. */
export const giveVariableFilter = (variable: IWiredVariable): boolean => variable.canCreateAndDelete;

export interface GiveVariableActionForm {
    /** The picker; its `target` is Flash's `variableTarget`, the merged type of section 0. */
    picker: WiredVariablePickerState;
    /** `_initialValue`; its picker's target is merged section 1's type. */
    initialValue: WiredValueOrVariableState;
    overrideExisting: boolean;
    /** `_initialValue.disabled` - no variable with a value is picked. */
    valueDisabled: boolean;
}

export const giveVariableAction: WiredElementDefinition<GiveVariableActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.GIVE_VARIABLE,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const target = getWiredInt(triggerable, 0);
        const picker = createVariablePickerState(variables, triggerable.variableIds[0] ?? '', target);
        const selected = getPickerSelectedVariable(variables, picker);
        const option = (getWiredInt(triggerable, 4) === VALUE_OR_VARIABLE_OPTION_VARIABLE) ? VALUE_OR_VARIABLE_OPTION_VARIABLE : VALUE_OR_VARIABLE_OPTION_VALUE;
        const value = ((option === VALUE_OR_VARIABLE_OPTION_VALUE) && selected?.canWriteValue) ? getWiredInt(triggerable, 2) : 0;
        const referenceId = (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[1] ?? '');

        return {
            picker,
            initialValue: createValueOrVariableState(variables, referenceId, getWiredInt(triggerable, 5), option, value, getWiredInt(triggerable, 6) !== 0),
            overrideExisting: getWiredInt(triggerable, 3) !== 0,
            valueDisabled: !selected?.hasValue,
        };
    },
    readIntParams: form => [
        form.picker.target,
        ...intAsLong(form.initialValue.value),
        form.overrideExisting ? 1 : 0,
        form.initialValue.option,
        form.initialValue.picker.target,
        isValueOrVariableOnSameHolder(form.initialValue, form.picker.target) ? 1 : 0,
    ],
    readVariableIds: (form, ctx) => [
        finalizePickerSelection(ctx.roomVariables, form.picker),
        (form.initialValue.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) ? finalizePickerSelection(ctx.roomVariables, form.initialValue.picker) : WIRED_VARIABLE_ID_NONE,
    ],
    mergedSelections: [ [ 0, 0 ], [ 1, 1 ] ],
    mergedSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.merged.title.variables_destination' : 'wiredfurni.params.sources.merged.title.variables_reference'),
    getMergedType: (form, id) => ((id === 0) ? form.picker.target : form.initialValue.picker.target),
    setMergedType: (form, id, sourceType) => ((id === 0)
        ? { ...form, picker: setPickerTarget(form.picker, sourceType) }
        : { ...form, initialValue: { ...form.initialValue, picker: setPickerTarget(form.initialValue.picker, sourceType) } }),
    getCustomSourcesForMergedType: id => ((id === 0) ? [ Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ] : [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ]),
    hasCustomTypePicker: () => true,
    isInputSourceDisabled: (form, id, sourceType) =>
        (sourceType === WIRED_SOURCE_MERGED) && (id === 1) && (form.valueDisabled || isValueOrVariableOnSameHolder(form.initialValue, form.picker.target)),
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
