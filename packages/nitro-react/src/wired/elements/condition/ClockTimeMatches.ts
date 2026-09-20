/**
 * `conditions/ClockTimeMatches` (`wf_cnd_counter_time_matches`) - the room's wired clock compares to a time.
 *
 * Int params: `[ seconds, minutes, half second, comparison ]` - whole seconds, minutes (0 to 99),
 * 1 when half a second is added, and the comparison 0 less than, 1 equal, 2 greater than. The
 * seconds slider counts half seconds (0 to 119, `SliderValuePulses`), so `onEditStart` joins the
 * first and third param into it (`seconds * 2 + half`) and the save splits them again.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection("wiredfurni.params.clock_seconds_elapsed", "seconds", new SliderValuePulses(), 0, 119, 1, false)`. */
export const CLOCK_TIME_MATCHES_MAX_PULSES = 119;
/** `createSliderSection("wiredfurni.params.clock_minutes_elapsed", "minutes", new §_-L3§(), 0, 99, 1, false)`. */
export const CLOCK_TIME_MATCHES_MAX_MINUTES = 99;

export interface ClockTimeMatchesConditionForm {
    /** Half seconds. */
    pulses: number;
    minutes: number;
    comparison: number;
}

export const clockTimeMatchesCondition: WiredElementDefinition<ClockTimeMatchesConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.CLOCK_TIME_MATCHES,
    createForm: triggerable => ({
        pulses: clampConditionSliderValue((getWiredInt(triggerable, 0) * 2) + getWiredInt(triggerable, 2), 0, CLOCK_TIME_MATCHES_MAX_PULSES),
        minutes: clampConditionSliderValue(getWiredInt(triggerable, 1), 0, CLOCK_TIME_MATCHES_MAX_MINUTES),
        comparison: getWiredInt(triggerable, 3),
    }),
    readIntParams: form => [ Math.floor(form.pulses / 2), form.minutes, form.pulses % 2, form.comparison ],
};
