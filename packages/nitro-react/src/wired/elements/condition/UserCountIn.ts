/**
 * `conditions/UserCountIn` (`wf_cnd_user_count_in`) - the number of users in the room is within a
 * range; inverted (`NOT_USER_COUNT_IN`), outside it.
 *
 * Int params: `[ minimum, maximum ]`, each 0 to 125 (`usercountmin` / `usercountmax` sliders
 * without a number input).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection(..., new §_-L3§(), 0, 125, 1, false)` - both sliders. */
export const USER_COUNT_IN_MAX = 125;

export interface UserCountInConditionForm {
    min: number;
    max: number;
}

export const userCountInCondition: WiredElementDefinition<UserCountInConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.USER_COUNT_IN,
    negativeCode: ConditionCodes.NOT_USER_COUNT_IN,
    createForm: triggerable => ({
        min: clampConditionSliderValue(getWiredInt(triggerable, 0), 0, USER_COUNT_IN_MAX),
        max: clampConditionSliderValue(getWiredInt(triggerable, 1), 0, USER_COUNT_IN_MAX),
    }),
    readIntParams: form => [ form.min, form.max ],
};
