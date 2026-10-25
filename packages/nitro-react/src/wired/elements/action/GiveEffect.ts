/**
 * `actiontypes/GiveEffect` (`wf_act_give_effect`) - puts an avatar effect on the selected users.
 *
 * Int params: `[ effect id, priority, type ]` - the effect 0 to 10000, the priority 0 to 2, and
 * the type flag (`wiredfurni.params.give_effect.type.0` / `.1`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `NumberInputParam(13, 0, 10000)`. */
export const GIVE_EFFECT_MAX_ID = 10000;
/** `NumberInputParam(2, 0, 2)`. */
export const GIVE_EFFECT_MAX_PRIORITY = 2;

export interface GiveEffectActionForm {
    effectId: number;
    priority: number;
    type: number;
}

export const giveEffectAction: WiredElementDefinition<GiveEffectActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.GIVE_EFFECT,
    createForm: triggerable => ({
        effectId: getWiredInt(triggerable, 0),
        priority: getWiredInt(triggerable, 1),
        type: getWiredBoolean(triggerable, 2) ? 1 : 0,
    }),
    readIntParams: form => [ form.effectId, form.priority, form.type ],
};
