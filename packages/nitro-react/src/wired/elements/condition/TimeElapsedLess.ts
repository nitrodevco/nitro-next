/**
 * `conditions/TimeElapsedLess` (`wf_cnd_time_less_than`) - less than the set time has passed since the
 * room's timer was last reset.
 *
 * Int params: `[ pulses ]` - half seconds, 2 to 1201. Flash's slider (`allowbefore2`, 1 to 1200 in
 * half seconds) shows one pulse less than the box holds: `onEditStart` sets it to `pulses - 1`
 * and `readIntParamsFromForm` adds the pulse back.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection("wiredfurni.params.allowbefore2", "", CONVERTER_PULSES, 1, 1200, 1)`. */
export const TIME_ELAPSED_LESS_MIN = 1;
export const TIME_ELAPSED_LESS_MAX = 1200;

export interface TimeElapsedLessConditionForm {
    /** The slider's value: the box's pulses minus one. */
    time: number;
}

export const timeElapsedLessCondition: WiredElementDefinition<TimeElapsedLessConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.TIME_ELAPSED_LESS,
    createForm: triggerable => ({ time: clampConditionSliderValue(getWiredInt(triggerable, 0) - 1, TIME_ELAPSED_LESS_MIN, TIME_ELAPSED_LESS_MAX) }),
    readIntParams: form => [ form.time + 1 ],
};
