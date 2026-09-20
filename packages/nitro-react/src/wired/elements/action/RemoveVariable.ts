/**
 * `actiontypes/§_-A2y§` (REMOVE_VARIABLE) - takes a variable away from the selected furni, users
 * or the context (the counterpart of `§_-92n§`, GIVE_VARIABLE).
 *
 * Int params: `[ target ]` - the merged source type, picked in the variable section's header.
 * Variable ids: `[ the variable ]`, one the box may create and delete.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, setPickerTarget, type WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

export interface RemoveVariableActionForm {
    /** The picker; its `target` is Flash's `§_-nd§`, the merged type of section 0. */
    picker: WiredVariablePickerState;
}

export const removeVariableAction: WiredElementDefinition<RemoveVariableActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.REMOVE_VARIABLE,
    createForm: triggerable => ({
        picker: createVariablePickerState(getWiredRoomVariables(triggerable), triggerable.variableIds[0] ?? '', getWiredInt(triggerable, 0)),
    }),
    readIntParams: form => [ form.picker.target ],
    readVariableIds: form => [ form.picker.variableId ],
    mergedSelections: [ [ 0, 0 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables',
    getMergedType: form => form.picker.target,
    setMergedType: (form, id, sourceType) => ({ ...form, picker: setPickerTarget(form.picker, sourceType) }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
