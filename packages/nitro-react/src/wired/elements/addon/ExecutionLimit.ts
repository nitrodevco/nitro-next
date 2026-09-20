/**
 * `addons/§_-412§` (EXECUTION_LIMIT, `wf_xtra_execution_limit`) - the stack runs at most so many
 * times (`setexecutions`, 1 to 100) within a time window (`settimewindow`, 1 to 20 pulses of
 * half a second).
 *
 * Int params: `[ executions, time window in pulses ]`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { AddonCodes } from './addonCodes';
import { clampWiredSliderValue } from './addonShared';

/** `createSliderSection("wiredfurni.params.setexecutions", "amount", CONVERTER_ECHO, 1, 100, 1, false)`. */
export const EXECUTION_LIMIT_MAX_EXECUTIONS = 100;
/** `createSliderSection("wiredfurni.params.settimewindow", "timewindow", new SliderValuePulses(), 1, 20, 1, false)`. */
export const EXECUTION_LIMIT_MAX_TIME_WINDOW = 20;

export interface ExecutionLimitAddonForm {
    executions: number;
    timeWindow: number;
}

export const executionLimitAddon: WiredElementDefinition<ExecutionLimitAddonForm> = {
    holder: 'addon',
    code: AddonCodes.EXECUTION_LIMIT,
    createForm: triggerable => ({
        executions: clampWiredSliderValue(getWiredInt(triggerable, 0), 1, EXECUTION_LIMIT_MAX_EXECUTIONS),
        timeWindow: clampWiredSliderValue(getWiredInt(triggerable, 1), 1, EXECUTION_LIMIT_MAX_TIME_WINDOW),
    }),
    readIntParams: form => [ form.executions, form.timeWindow ],
};
