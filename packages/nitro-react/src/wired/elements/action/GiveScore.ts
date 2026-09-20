/**
 * `actiontypes/GiveScore` (`wf_act_give_score`) - gives the selected users points in the game
 * they are playing.
 *
 * Int params: `[ points, times ]`. A negative `points` takes points away (the operation radio),
 * and `times` is how often one user can get them per game, 0 meaning as often as it fires - the
 * slider shows that as its last stop, `GIVE_SCORE_UNLIMITED_TIMES`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

/** `GiveScore.§_-GZ§` - the most times a user can be limited to. */
export const GIVE_SCORE_MAX_TIMES = 10;
/** `GiveScore.§_-V27§` - the slider stop after the last count, shown as "unlimited" and saved as 0. */
export const GIVE_SCORE_UNLIMITED_TIMES = GIVE_SCORE_MAX_TIMES + 1;

export interface GiveScoreActionForm {
    points: number;
    /** 1 to `GIVE_SCORE_UNLIMITED_TIMES`. */
    times: number;
    /** `timesSlider.visible` - Flash hides the slider on a box that was saved as unlimited. */
    timesVisible: boolean;
    /** 0 adds the points, 1 removes them. */
    operation: number;
}

export const giveScoreAction: WiredElementDefinition<GiveScoreActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.GIVE_SCORE,
    createForm: (triggerable) => {
        const points = triggerable.intParams[0];
        const times = triggerable.intParams[1];

        return {
            points: Math.abs(points),
            times: (times === 0) ? GIVE_SCORE_UNLIMITED_TIMES : times,
            timesVisible: times !== 0,
            operation: (points < 0) ? 1 : 0,
        };
    },
    readIntParams: form => [
        (form.operation === 1) ? -form.points : form.points,
        (form.times === GIVE_SCORE_UNLIMITED_TIMES) ? 0 : form.times,
    ],
};
