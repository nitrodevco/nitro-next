/**
 * `conditions/§_-X1P§` (HAS_VARIABLE, `wf_cnd_has_var`) - the selected furni or users (or the
 * context) have a variable; inverted (`NOT_HAS_VARIABLE`, `wf_cnd_neg_has_var`), do not.
 *
 * Int params: `[ target ]` - the variable's target, which is also the merged input source's type
 * (furni, users, or `CONTEXT_SOURCE`). Variable ids: `[ variable ]`. Only variables that are not
 * always available can be picked. The element draws the merged type picker itself, in its
 * variable section's header; the advanced settings are always shown and the "pick furni" hint
 * never is.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { createVariablePickerState, setPickerTarget, WiredVariableFilter, WiredVariablePickerState } from '../../common/WiredVariablePickerModel';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { resolveConditionMergedTypes } from './conditionShared';

export interface HasVariableConditionForm {
    /** `target` is `§_-nd§`, the merged type. */
    picker: WiredVariablePickerState;
}

/** `§_-X1P§.variableSelectionFilter`. */
export const hasVariableConditionFilter: WiredVariableFilter = variable => !variable.alwaysAvailable;

export const hasVariableCondition: WiredElementDefinition<HasVariableConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.HAS_VARIABLE,
    negativeCode: ConditionCodes.NOT_HAS_VARIABLE,
    createForm: (triggerable, ctx) => resolveConditionMergedTypes(hasVariableCondition, {
        picker: createVariablePickerState(getWiredRoomVariables(triggerable), triggerable.variableIds[0] ?? '', getWiredInt(triggerable, 0)),
    }, ctx),
    readIntParams: form => [ form.picker.target ],
    readVariableIds: form => [ form.picker.variableId ],
    mergedSelections: [ [ 0, 0 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables',
    getMergedType: form => form.picker.target,
    setMergedType: (form, _id, sourceType) => ({ ...form, picker: setPickerTarget(form.picker, sourceType) }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
