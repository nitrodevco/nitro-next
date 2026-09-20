/**
 * `conditions/ActorIsWearingBadge` (`wf_cnd_wearing_badge`) - the user wears a badge; inverted
 * (`NOT_ACTOR_IS_WEARING_BADGE`, `wf_cnd_not_wearing_b`), does not.
 *
 * String param: the badge code (`TextInputParam("", 1000, ...)`). No int params.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ConditionCodes } from './conditionCodes';

/** `TextInputParam("", 1000, ...)`'s limit. */
export const ACTOR_IS_WEARING_BADGE_MAX_LENGTH = 1000;

export interface ActorIsWearingBadgeConditionForm {
    badgeCode: string;
}

export const actorIsWearingBadgeCondition: WiredElementDefinition<ActorIsWearingBadgeConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.ACTOR_IS_WEARING_BADGE,
    negativeCode: ConditionCodes.NOT_ACTOR_IS_WEARING_BADGE,
    createForm: triggerable => ({ badgeCode: triggerable.stringParam }),
    readStringParam: form => form.badgeCode,
};
