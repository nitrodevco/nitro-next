/**
 * `conditions/LevelMatches` (USER_LEVEL) - the user's level compares to a number.
 *
 * Int params: `[ level, comparison ]` - the level 1 to 30 (`level_selection`) and the comparison
 * 0 less than, 1 equal, 2 greater than.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { clampConditionSliderValue } from './conditionShared';

/** `createSliderSection("wiredfurni.params.level_selection", "level", new §_-L3§(), 1, 30, 1)`. */
export const LEVEL_MATCHES_MIN = 1;
export const LEVEL_MATCHES_MAX = 30;

export interface LevelMatchesConditionForm {
    level: number;
    comparison: number;
}

export const levelMatchesCondition: WiredElementDefinition<LevelMatchesConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.USER_LEVEL,
    createForm: triggerable => ({
        level: clampConditionSliderValue(getWiredInt(triggerable, 0), LEVEL_MATCHES_MIN, LEVEL_MATCHES_MAX),
        comparison: getWiredInt(triggerable, 1),
    }),
    readIntParams: form => [ form.level, form.comparison ],
};
