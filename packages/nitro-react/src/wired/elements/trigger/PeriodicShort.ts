/**
 * `triggerconfs/§_-wP§` (PERIODIC_SHORT) - fires repeatedly at a short interval.
 *
 * Int params: `[ interval ]` - in units of 50 milliseconds (`SliderValueMilliseconds50`), 1 to `PERIODIC_SHORT_MAX`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';
import { clampSliderSectionValue, TriggerSliderForm } from './triggerShared';

/** `createSliderSection("wiredfurni.params.setshorttime", "ms", new SliderValueMilliseconds50(), 1, 10, 1, false)`. */
export const PERIODIC_SHORT_MIN = 1;
export const PERIODIC_SHORT_MAX = 10;

export const periodicShortTrigger: WiredElementDefinition<TriggerSliderForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.PERIODIC_SHORT,
    createForm: triggerable => ({ value: clampSliderSectionValue(getWiredInt(triggerable, 0), PERIODIC_SHORT_MIN, PERIODIC_SHORT_MAX) }),
    readIntParams: form => [ form.value ],
};
