/**
 * `actiontypes/FreezeUser` (`wf_act_freeze`) - freezes the selected users in place with an
 * effect.
 *
 * Int params: `[ effect, cancel on teleport ]` - the effect 0 to 4
 * (`wiredfurni.params.freeze.effect.<n>`) and whether a teleport ends the freeze.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The effect dropdown's ids, 0 to 4. */
export const FREEZE_USER_EFFECTS = [ 0, 1, 2, 3, 4 ];

export interface FreezeUserActionForm {
    /** The dropdown's `selectedId`. */
    effect: number;
    cancelOnTeleport: boolean;
}

export const freezeUserAction: WiredElementDefinition<FreezeUserActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.FREEZE_USER,
    createForm: triggerable => ({ effect: getWiredInt(triggerable, 0), cancelOnTeleport: getWiredBoolean(triggerable, 1) }),
    readIntParams: form => [ form.effect, form.cancelOnTeleport ? 1 : 0 ],
};
