/**
 * `triggerconfs/TriggerOnce` (TRIGGER_ONCE) - fires once, the given time after the room loads.
 *
 * Int params: `[ pulses ]` - half seconds, 1 to `TRIGGER_ONCE_MAX_PULSES` (10 minutes).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';
import { clampSliderSectionValue, TriggerSliderForm } from './triggerShared';

/** `createSliderSection("wiredfurni.params.settime2", "", CONVERTER_PULSES, 1, 1200, 1)`. */
export const TRIGGER_ONCE_MIN_PULSES = 1;
export const TRIGGER_ONCE_MAX_PULSES = 1200;

export const triggerOnceTrigger: WiredElementDefinition<TriggerSliderForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.TRIGGER_ONCE,
    createForm: triggerable => ({ value: clampSliderSectionValue(getWiredInt(triggerable, 0), TRIGGER_ONCE_MIN_PULSES, TRIGGER_ONCE_MAX_PULSES) }),
    readIntParams: form => [ form.value ],
};
