/**
 * `actiontypes/chests/§_-f1U§` - the base of the two boxes that hand out what a wired chest holds
 * (`GiveItemsFromChest`, GIVE_FURNI_FROM_CHEST, and `§_-9e§`, GIVE_CURRENCY_FROM_CHEST). It has
 * no code of its own; the boxes spread `giveFromChestBase()` into their definitions and extend
 * `createGiveFromChestForm` / `readGiveFromChestIntParams` with one more int.
 *
 * Int params: `[ rewarding mode, amount value, amount option, amount variable target,
 * show popup by default ]` - the mode is `GIVE_FROM_CHEST_MODE_AMOUNT` (the amount below) or
 * `GIVE_FROM_CHEST_MODE_ALL` (everything; the amount section greys out), and the amount is a
 * `ValueOrVariableSection` (1 and up, or a variable of merged section 0). Variable ids:
 * `[ the amount variable ]`. String param: the reward popup's text (at most 200 characters).
 *
 * Selections: the furni are the chests (`...furni.title.chests`), the users the ones rewarded
 * (`...users.title.reward_user`); merged section 0 pairs furni selection 1 with user selection 1
 * for the amount variable.
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { setPickerTarget } from '../../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../../common/WiredVariableSections';
import { WIRED_SOURCE_MERGED, type WiredElementDefinition } from '../../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables, type WiredTriggerable } from '../../../WiredTriggerable';
import { WIRED_VARIABLE_ID_NONE } from '../ActionVariableReference';

/** `§_-f1U§.MODE_AMOUNT` / `MODE_ALL`. */
export const GIVE_FROM_CHEST_MODE_AMOUNT = 0;
export const GIVE_FROM_CHEST_MODE_ALL = 1;
/** `TextAreaParam(45, -1, 3, -1, 200, ...)` - the reward popup text's field height, line and character limits. */
export const GIVE_FROM_CHEST_POPUP_HEIGHT = 45;
export const GIVE_FROM_CHEST_POPUP_MAX_LINES = 3;
export const GIVE_FROM_CHEST_POPUP_MAX_LENGTH = 200;

export interface GiveFromChestForm {
    rewardingMode: number;
    /** The amount `ValueOrVariableSection`; its picker's target is merged section 0's type. */
    amount: WiredValueOrVariableState;
    popupText: string;
    showPopupByDefault: boolean;
}

/** `§_-f1U§.onEditStart`. */
export const createGiveFromChestForm = (triggerable: WiredTriggerable): GiveFromChestForm => {
    const rewardingMode = getWiredInt(triggerable, 0);
    const option = getWiredInt(triggerable, 2);

    let variableId = triggerable.variableIds[0] ?? '';
    let value = getWiredInt(triggerable, 1);

    // Flash: the amount is a value (no variable, `WiredVariable.§_-i8§`) or a variable (value 1); "give all" resets both.
    if ((rewardingMode === GIVE_FROM_CHEST_MODE_AMOUNT) && (option === VALUE_OR_VARIABLE_OPTION_VALUE)) {
        variableId = WIRED_VARIABLE_ID_NONE;
    } else if (rewardingMode === GIVE_FROM_CHEST_MODE_AMOUNT) {
        value = 1;
    } else {
        variableId = WIRED_VARIABLE_ID_NONE;
        value = 1;
    }

    return {
        rewardingMode,
        amount: createValueOrVariableState(getWiredRoomVariables(triggerable), variableId, getWiredInt(triggerable, 3), option, value),
        popupText: triggerable.stringParam,
        showPopupByDefault: getWiredBoolean(triggerable, 4),
    };
};

/** `§_-f1U§.readIntParamsFromForm`. */
export const readGiveFromChestIntParams = (form: GiveFromChestForm): number[] => [
    form.rewardingMode,
    form.amount.value,
    form.amount.option,
    form.amount.picker.target,
    form.showPopupByDefault ? 1 : 0,
];

/** The members `§_-f1U§` overrides besides `code`, `onEditStart` and `readIntParamsFromForm`, for a box whose form extends `GiveFromChestForm`. */
export const giveFromChestBase = <F extends GiveFromChestForm>(): Omit<WiredElementDefinition<F>, 'code' | 'createForm'> => ({
    holder: 'action',
    readVariableIds: form => [ form.amount.picker.variableId ],
    readStringParam: form => form.popupText,
    isInputSourceDisabled: (form, id, sourceType) =>
        (sourceType === WIRED_SOURCE_MERGED) && (id === 0) && (isValueOrVariableSourcePickingDisabled(form.amount) || (form.rewardingMode === GIVE_FROM_CHEST_MODE_ALL)),
    mergedSelections: [ [ 1, 1 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.variables_reference',
    furniSelectionTitle: () => 'wiredfurni.params.sources.furni.title.chests',
    userSelectionTitle: () => 'wiredfurni.params.sources.users.title.reward_user',
    getMergedType: form => form.amount.picker.target,
    setMergedType: (form, id, sourceType) => ({ ...form, amount: { ...form.amount, picker: setPickerTarget(form.amount.picker, sourceType) } }),
    getCustomSourcesForMergedType: () => [ Number(VariableExtraSourceTypes.GLOBAL_SOURCE), Number(VariableExtraSourceTypes.CONTEXT_SOURCE) ],
    hasCustomTypePicker: () => true,
    advancedAlwaysVisible: true,
    forceHidePickFurniInstructions: true,
});
