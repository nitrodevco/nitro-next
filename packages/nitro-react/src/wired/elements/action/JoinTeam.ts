/**
 * `actiontypes/JoinTeam` (`wf_act_join_team`) - puts the selected users in a game team.
 *
 * Int params: `[ team, team type ]` - the team 1 to 4 (`wiredfurni.params.team.<n>`) and the kind
 * of team (`wiredfurni.params.team_type.0` to `.2`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

export interface JoinTeamActionForm {
    team: number;
    teamType: number;
}

export const joinTeamAction: WiredElementDefinition<JoinTeamActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.JOIN_TEAM,
    createForm: triggerable => ({ team: getWiredInt(triggerable, 0), teamType: getWiredInt(triggerable, 1) }),
    readIntParams: form => [ form.team, form.teamType ],
};
