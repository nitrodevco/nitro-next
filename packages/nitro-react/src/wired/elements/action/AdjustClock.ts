/**
 * `actiontypes/AdjustClock` (`wf_act_adjust_clock`) - sets, adds to or takes from the time on the
 * selected game clocks.
 *
 * Int params: `[ seconds, minutes, half second, operator ]`. The seconds slider counts half
 * seconds (0 to 119, shown as 0 to 59.5); the box stores whole seconds and the half apart:
 * `seconds = floor(value / 2)`, `half second = value % 2`. Minutes 0 to 99, the operator 0 to 2
 * (`wiredfurni.params.operator.<n>`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `createSliderSection("wiredfurni.params.clock_seconds", "seconds", new SliderValuePulses(), 0, 119, 1, false)`. */
export const ADJUST_CLOCK_MAX_HALF_SECONDS = 119;
/** `createSliderSection("wiredfurni.params.clock_minutes", "minutes", CONVERTER_ECHO, 0, 99, 1, false)`. */
export const ADJUST_CLOCK_MAX_MINUTES = 99;

export interface AdjustClockActionForm {
    /** The seconds slider: half seconds. */
    halfSeconds: number;
    minutes: number;
    operator: number;
}

export const adjustClockAction: WiredElementDefinition<AdjustClockActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.ADJUST_CLOCK,
    createForm: triggerable => ({
        halfSeconds: (getWiredInt(triggerable, 0) * 2) + getWiredInt(triggerable, 2),
        minutes: getWiredInt(triggerable, 1),
        operator: getWiredInt(triggerable, 3),
    }),
    readIntParams: form => [ Math.floor(form.halfSeconds / 2), form.minutes, form.halfSeconds % 2, form.operator ],
};
