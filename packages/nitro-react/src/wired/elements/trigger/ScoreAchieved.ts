/**
 * `triggerconfs/ScoreAchieved` (SCORE_ACHIEVED) - fires when a team (or any team) reaches the
 * given score.
 *
 * Int params: `[ score, team ]` - the score 1 to `SCORE_ACHIEVED_MAX_SCORE`, the team 0 (any) to 4.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { TriggerConfCodes } from './triggerCodes';
import { clampSliderSectionValue } from './triggerShared';

/** `createSliderSection("wiredfurni.params.setscore2", "points", new §_-L3§(), 1, 1000, 1)`. */
export const SCORE_ACHIEVED_MIN_SCORE = 1;
export const SCORE_ACHIEVED_MAX_SCORE = 1000;

export interface ScoreAchievedTriggerForm {
    score: number;
    team: number;
}

export const scoreAchievedTrigger: WiredElementDefinition<ScoreAchievedTriggerForm> = {
    holder: 'trigger',
    code: TriggerConfCodes.SCORE_ACHIEVED,
    createForm: triggerable => ({
        score: clampSliderSectionValue(getWiredInt(triggerable, 0), SCORE_ACHIEVED_MIN_SCORE, SCORE_ACHIEVED_MAX_SCORE),
        team: getWiredInt(triggerable, 1),
    }),
    readIntParams: form => [ form.score, form.team ],
};
