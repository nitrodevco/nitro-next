/**
 * `actiontypes/ControlClock` (`wf_act_control_clock`) - starts, stops, pauses, resumes or resets
 * the selected game clocks.
 *
 * Int params: `[ command ]` - 0 to 4, each captioned `wiredfurni.params.clock_control.<n>`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The radio's ids, `clock_control.0` to `.4`. */
export const CONTROL_CLOCK_COMMANDS = [ 0, 1, 2, 3, 4 ];

export interface ControlClockActionForm {
    command: number;
}

export const controlClockAction: WiredElementDefinition<ControlClockActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.CONTROL_CLOCK,
    createForm: triggerable => ({ command: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.command ],
};
