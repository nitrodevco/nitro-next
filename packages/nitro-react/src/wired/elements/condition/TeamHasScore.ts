/**
 * `conditions/TeamHasScore` (`wf_cnd_team_has_score`) - a team's score compares to a number.
 *
 * Int params: `[ team, score, comparison ]` - the team is 0 for the triggering user's team
 * (`team.triggerer`) or 1 to 4, the score 0 to 1000 (`setscore2` slider) and the comparison
 * 0 less than, 1 equal, 2 greater than (`comparison.0` to `.2`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection("wiredfurni.params.setscore2", "points", new §_-L3§(), 0, 1000, 1)`. */
export const TEAM_HAS_SCORE_MAX = 1000;

export interface TeamHasScoreConditionForm {
    team: number;
    score: number;
    comparison: number;
}

export const teamHasScoreCondition: WiredElementDefinition<TeamHasScoreConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.TEAM_HAS_SCORE,
    createForm: triggerable => ({
        team: getWiredInt(triggerable, 0),
        score: clampConditionSliderValue(getWiredInt(triggerable, 1), 0, TEAM_HAS_SCORE_MAX),
        comparison: getWiredInt(triggerable, 2),
    }),
    readIntParams: form => [ form.team, form.score, form.comparison ],
};
