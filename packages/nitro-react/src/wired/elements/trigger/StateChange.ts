/**
 * `triggerconfs/StateChange` (STATE_CHANGE) - fires when one of the picked furni changes state:
 * option 1 or option 0 of `wiredfurni.params.state_trigger`. It has a state snapshot, so the
 * header shows "apply snapshot" and room clicks pick furni.
 *
 * Int params: `[ mode ]`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';

export interface StateChangeTriggerForm {
    mode: number;
}

export const stateChangeTrigger: WiredElementDefinition<StateChangeTriggerForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.STATE_CHANGE,
    hasStateSnapshot: true,
    createForm: triggerable => ({ mode: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.mode ],
};
