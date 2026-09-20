/**
 * `triggerconfs/ClockReachTime` (CLOCK_REACH_TIME) - fires when a counter clock reaches the given
 * time.
 *
 * Int params: `[ seconds, minutes, half second ]` - the seconds slider works in half seconds
 * (0 to 119), and `readIntParamsFromForm` splits it into whole seconds and a 0/1 half.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';
import { clampSliderSectionValue } from './triggerShared';

/** `createSliderSection("wiredfurni.params.clock_seconds_elapsed", "seconds", new SliderValuePulses(), 0, 119, 1, false)`. */
export const CLOCK_REACH_TIME_MAX_HALF_SECONDS = 119;
/** `createSliderSection("wiredfurni.params.clock_minutes_elapsed", "minutes", new §_-L3§(), 0, 99, 1, false)`. */
export const CLOCK_REACH_TIME_MAX_MINUTES = 99;

export interface ClockReachTimeTriggerForm {
    /** The seconds slider, in half seconds. */
    halfSeconds: number;
    minutes: number;
}

export const clockReachTimeTrigger: WiredElementDefinition<ClockReachTimeTriggerForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.CLOCK_REACH_TIME,
    createForm: triggerable => ({
        halfSeconds: clampSliderSectionValue((getWiredInt(triggerable, 0) * 2) + getWiredInt(triggerable, 2), 0, CLOCK_REACH_TIME_MAX_HALF_SECONDS),
        minutes: clampSliderSectionValue(getWiredInt(triggerable, 1), 0, CLOCK_REACH_TIME_MAX_MINUTES),
    }),
    readIntParams: form => [ Math.floor(form.halfSeconds / 2), form.minutes, form.halfSeconds % 2 ],
};
