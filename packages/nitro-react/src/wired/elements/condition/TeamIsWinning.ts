/**
 * `conditions/TeamIsWinning` (`wf_cnd_team_has_rank`) - a team holds a placement in the game.
 *
 * Int params: `[ team, placement ]` - the team is 0 for the triggering user's team
 * (`team.triggerer`) or 1 to 4; the placement 0 to 3 (`placement.1` to `.4`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

export interface TeamIsWinningConditionForm {
    team: number;
    placement: number;
}

export const teamIsWinningCondition: WiredElementDefinition<TeamIsWinningConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.TEAM_IS_WINNING,
    createForm: triggerable => ({ team: getWiredInt(triggerable, 0), placement: getWiredInt(triggerable, 1) }),
    readIntParams: form => [ form.team, form.placement ],
};
