/**
 * `actiontypes/§_-H2N§` (GIVE_SCORE_TO_PREDEFINED_TEAM) - `GiveScore` for a team: the same points,
 * times and add / remove inputs, then the team.
 *
 * Int params: `GiveScore`'s `[ points, times ]` followed by the team, 1 to 4
 * (`wiredfurni.params.team.<n>`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';
import { giveScoreAction, type GiveScoreActionForm } from './GiveScore';

/** The team radio's ids, `wiredfurni.params.team.1` to `.4`. */
export const PREDEFINED_TEAMS = [ 1, 2, 3, 4 ];

export interface GiveScoreToPredefinedTeamActionForm extends GiveScoreActionForm {
    team: number;
}

export const giveScoreToPredefinedTeamAction: WiredElementDefinition<GiveScoreToPredefinedTeamActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.GIVE_SCORE_TO_PREDEFINED_TEAM,
    createForm: (triggerable, ctx) => ({
        ...giveScoreAction.createForm(triggerable, ctx),
        team: getWiredInt(triggerable, 2),
    }),
    readIntParams: (form, ctx) => [ ...(giveScoreAction.readIntParams?.(form, ctx) ?? []), form.team ],
};
