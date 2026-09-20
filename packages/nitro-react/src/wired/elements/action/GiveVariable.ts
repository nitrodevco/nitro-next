/**
 * `actiontypes/§_-92n§` (GIVE_VARIABLE) - gives the selected furni, users or the context a
 * variable, with an initial value.
 *
 * Int params: `[ target, initial value as a long (high, low), override existing ]` - the target
 * is the merged source type the variable goes to (furni, users or `VariableExtraSourceTypes`
 * CONTEXT), picked in the variable section's header; the value is sent through
 * `Util.pushIntAsLong` and read back from its low word. Variable ids: `[ the variable ]`, one the
 * box may create and delete (`canCreateAndDelete`).
 *
 * `onEditStart` zeroes the initial value when the variable it opens with cannot be written, and
 * `onVariableSelected` greys the value section out for a variable without a value - the view
 * derives that from the picker's selection.
 */
import { IWiredVariable, VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { intAsLong } from '../../common/WiredUtil';
import { createVariablePickerState, getPickerSelectedVariable, setPickerTarget, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `§_-92n§.variableSelectionFilter` (and `§_-A2y§`'s, the same test) - only a variable the box may create and delete. */
export const giveVariableFilter = (variable: IWiredVariable): boolean => variable.canCreateAndDelete;

export interface GiveVariableActionForm {
    /** The picker; its `target` is Flash's `§_-nd§`, the merged type of section 0. */
    picker: WiredVariablePickerState;
    initialValue: number;
    overrideExisting: boolean;
}

export const giveVariableAction: WiredElementDefinition<GiveVariableActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.GIVE_VARIABLE,
    createForm: (triggerable) => {
        const variables = getWiredRoomVariables(triggerable);
        const picker = createVariablePickerState(variables, triggerable.variableIds[0] ?? '', getWiredInt(triggerable, 0));
        const selected = getPickerSelectedVariable(variables, picker);

        return {
            picker,
            initialValue: selected?.canWriteValue ? getWiredInt(triggerable, 2) : 0,
            overrideExisting: getWiredInt(triggerable, 3) !== 0,
        };
    },
    readIntParams: form => [ form.picker.target, ...intAsLong(form.initialValue), form.overrideExisting ? 1 : 0 ],
    readVariableIds: form => [ form.picker.variableId ],
    mergedSelections: [ [ 0, 0 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_destination',
    getMergedType: form => form.picker.target,
    setMergedType: (form, id, sourceType) => ({ ...form, picker: setPickerTarget(form.picker, sourceType) }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
