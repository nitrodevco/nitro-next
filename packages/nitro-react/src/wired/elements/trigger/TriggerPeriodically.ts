/**
 * `triggerconfs/§_-A1z§` (TRIGGER_PERIODICALLY) - fires repeatedly at the given interval.
 *
 * Int params: `[ interval ]` - in half seconds (`SliderValuePulses`), 1 to
 * `TRIGGER_PERIODICALLY_MAX`. `§_-45§` (`PeriodicLong`) extends this class with a slider of its own.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';
import { clampSliderSectionValue, TriggerSliderForm } from './triggerShared';

/** `createSliderSection("wiredfurni.params.settime3", "", new SliderValuePulses(), 1, 120, 1)`. */
export const TRIGGER_PERIODICALLY_MIN = 1;
export const TRIGGER_PERIODICALLY_MAX = 120;

export const triggerPeriodicallyTrigger: WiredElementDefinition<TriggerSliderForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.TRIGGER_PERIODICALLY,
    createForm: triggerable => ({ value: clampSliderSectionValue(getWiredInt(triggerable, 0), TRIGGER_PERIODICALLY_MIN, TRIGGER_PERIODICALLY_MAX) }),
    readIntParams: form => [ form.value ],
};
