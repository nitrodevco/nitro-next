/**
 * `conditions/TimeElapsedMore` (`wf_cnd_time_more_than`) - more than the set time has passed since the
 * room's timer was last reset.
 *
 * Int params: `[ pulses ]` - half seconds, 2 to 1201. Flash's slider (`allowafter2`, 1 to 1200 in
 * half seconds) shows one pulse less than the box holds: `onEditStart` sets it to `pulses - 1`
 * and `readIntParamsFromForm` adds the pulse back.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection("wiredfurni.params.allowafter2", "", CONVERTER_PULSES, 1, 1200, 1)`. */
export const TIME_ELAPSED_MORE_MIN = 1;
export const TIME_ELAPSED_MORE_MAX = 1200;

export interface TimeElapsedMoreConditionForm {
    /** The slider's value: the box's pulses minus one. */
    time: number;
}

export const timeElapsedMoreCondition: WiredElementDefinition<TimeElapsedMoreConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.TIME_ELAPSED_MORE,
    createForm: triggerable => ({ time: clampConditionSliderValue(getWiredInt(triggerable, 0) - 1, TIME_ELAPSED_MORE_MIN, TIME_ELAPSED_MORE_MAX) }),
    readIntParams: form => [ form.time + 1 ],
};
