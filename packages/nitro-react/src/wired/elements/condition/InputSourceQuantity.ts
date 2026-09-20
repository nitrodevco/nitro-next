/**
 * `conditions/§_-je§` (INPUT_SOURCE_QUANTITY, `wf_cnd_slc_quantity`) - the number of furni or users the box's merged
 * input source selects compares to a number.
 *
 * Int params: `[ counts users, amount, comparison ]` - 1 when the merged source is set to users
 * (`getMergedType` answers `USER_SOURCE`, else furni), the amount 0 to 100 (`setamount2`) and the
 * comparison 0 less than, 1 equal, 2 greater than. The merged section `[ 0, 0 ]` is drawn by the
 * dialog, and the advanced settings that hold it are always shown.
 */
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, type WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection("wiredfurni.params.setamount2", "", new §_-L3§(), 0, 100, 1)`. */
export const INPUT_SOURCE_QUANTITY_MAX = 100;

export interface InputSourceQuantityConditionForm {
    /** `§_-xw§` - the merged source counts users. */
    users: boolean;
    amount: number;
    comparison: number;
}

export const inputSourceQuantityCondition: WiredElementDefinition<InputSourceQuantityConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.INPUT_SOURCE_QUANTITY,
    createForm: triggerable => ({
        users: getWiredBoolean(triggerable, 0),
        amount: clampConditionSliderValue(getWiredInt(triggerable, 1), 0, INPUT_SOURCE_QUANTITY_MAX),
        comparison: getWiredInt(triggerable, 2),
    }),
    readIntParams: form => [ form.users ? 1 : 0, form.amount, form.comparison ],
    mergedSelections: [ [ 0, 0 ] ],
    getMergedType: form => (form.users ? WIRED_SOURCE_USER : WIRED_SOURCE_FURNI),
    setMergedType: (form, _id, sourceType) => ({ ...form, users: sourceType === WIRED_SOURCE_USER }),
    advancedAlwaysVisible: true,
};
