/**
 * `actiontypes/ToggleFurniState` (`wf_act_toggle_state`) - moves the selected furni on to their
 * next state.
 *
 * Int params: `[ toggle type ]` - which way the state steps (`wiredfurni.params.toggletype.0` /
 * `.1`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

export interface ToggleFurniStateActionForm {
    toggleMode: number;
}

export const toggleFurniStateAction: WiredElementDefinition<ToggleFurniStateActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.TOGGLE_FURNI_STATE,
    createForm: triggerable => ({ toggleMode: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.toggleMode ],
};
