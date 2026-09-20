/**
 * `triggerconfs/§_-45§` (PERIODIC_LONG) - fires repeatedly at a long interval. It extends
 * `§_-A1z§` (`TriggerPeriodically`) and replaces its slider with one in steps of five seconds.
 *
 * Int params: `[ interval ]` - in units of five seconds (`SliderValueSeconds5`), 1 to `PERIODIC_LONG_MAX`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';
import { clampSliderSectionValue, TriggerSliderForm } from './triggerShared';

/** `createSliderSection("wiredfurni.params.settime3", "", new SliderValueSeconds5(), 1, 120, 1)`. */
export const PERIODIC_LONG_MIN = 1;
export const PERIODIC_LONG_MAX = 120;

export const periodicLongTrigger: WiredElementDefinition<TriggerSliderForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.PERIODIC_LONG,
    createForm: triggerable => ({ value: clampSliderSectionValue(getWiredInt(triggerable, 0), PERIODIC_LONG_MIN, PERIODIC_LONG_MAX) }),
    readIntParams: form => [ form.value ],
};
