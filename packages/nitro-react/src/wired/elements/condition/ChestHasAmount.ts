/**
 * `conditions/chests/ChestHasAmount` (CHEST_HAS_ITEMS) - the number of items in the selected
 * chests compares to a number or to a variable's value.
 *
 * Int params: `[ amount, amount option, amount target, operator ]` - the amount 0 to 1000000
 * when typed (option 0) or taken from the variable (option 1, variable ids `[ variable ]`), the
 * target the variable's (merged section 0, furni / users / global / context, type picker drawn by
 * the element) and the operator one of `CONDITION_OPERATORS`. A box using a variable opens with
 * the amount input at 1; one using the typed amount with no variable (`WiredVariable.§_-i8§`).
 *
 * The merged section pairs the furni selection 1 (the first, 0, is the chests -
 * `sources.furni.title.chests`) with the user selection 0, and is greyed out while the typed
 * amount is used. `§_-229§` (`ChestHasItemTypes`) is the same box counting item types.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { setPickerTarget } from '../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, WiredValueOrVariableState } from '../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, getWiredRoomVariables } from '../../WiredTriggerable';
import { WIRED_VARIABLE_ID_NONE } from '../action/ActionVariableReference';
import { ConditionCodes } from './conditionCodes';
import { resolveConditionMergedTypes } from './conditionShared';

/** `createValueOrVariableSection(0, ..., l("chest_compare_amount"), 0, 1000000)`. */
export const CHEST_HAS_AMOUNT_MAX = 1000000;

export interface ChestHasAmountConditionForm {
    operator: number;
    /** `§_-uo§`, merged section 0. */
    amount: WiredValueOrVariableState;
}

/** `ChestHasItemTypes` spreads this and overrides the code, the furni titles and the merged selection. */
export const chestHasAmountCondition: WiredElementDefinition<ChestHasAmountConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.CHEST_HAS_ITEMS,
    createForm: (triggerable, ctx) => {
        const option = getWiredInt(triggerable, 1);

        return resolveConditionMergedTypes(chestHasAmountCondition, {
            operator: getWiredInt(triggerable, 3),
            amount: createValueOrVariableState(
                getWiredRoomVariables(triggerable),
                (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[0] ?? ''),
                getWiredInt(triggerable, 2),
                option,
                (option === VALUE_OR_VARIABLE_OPTION_VALUE) ? getWiredInt(triggerable, 0) : 1,
            ),
        }, ctx);
    },
    readIntParams: form => [ form.amount.value, form.amount.option, form.amount.picker.target, form.operator ],
    readVariableIds: form => [ form.amount.picker.variableId ],
    furniSelectionTitle: () => 'wiredfurni.params.sources.furni.title.chests',
    mergedSelections: [ [ 1, 0 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    getMergedType: form => form.amount.picker.target,
    setMergedType: (form, _id, sourceType) => ({ ...form, amount: { ...form.amount, picker: setPickerTarget(form.amount.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    isInputSourceDisabled: (form, id, sourceType) => (sourceType === WIRED_SOURCE_MERGED) && (id === 0) && isValueOrVariableSourcePickingDisabled(form.amount),
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
};
