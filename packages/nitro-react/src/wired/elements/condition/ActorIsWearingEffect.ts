/**
 * `conditions/ActorIsWearingEffect` (`wf_cnd_wearing_effect`) - the user wears an avatar effect;
 * inverted (`NOT_ACTOR_IS_WEARING_EFFECT`, `wf_cnd_not_wearing_fx`), does not.
 *
 * Int params: `[ effect id ]` - any 32-bit int (`NumberInputParam(0, int min, int max, 200)`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

export interface ActorIsWearingEffectConditionForm {
    effectId: number;
}

export const actorIsWearingEffectCondition: WiredElementDefinition<ActorIsWearingEffectConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.ACTOR_IS_WEARING_EFFECT,
    negativeCode: ConditionCodes.NOT_ACTOR_IS_WEARING_EFFECT,
    createForm: triggerable => ({ effectId: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.effectId ],
};
