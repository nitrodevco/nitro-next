/**
 * `conditions/ActorIsInTeam` (`wf_cnd_actor_in_team`) - the user is in a game team; inverted
 * (`NOT_ACTOR_IS_IN_TEAM`), is not.
 *
 * Int params: `[ team ]` - 0 any team (`team.any`), 1 to 4 the red, green, blue and yellow team.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

export interface ActorIsInTeamConditionForm {
    team: number;
}

export const actorIsInTeamCondition: WiredElementDefinition<ActorIsInTeamConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.ACTOR_IS_IN_TEAM,
    negativeCode: ConditionCodes.NOT_ACTOR_IS_IN_TEAM,
    createForm: triggerable => ({ team: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.team ],
};
