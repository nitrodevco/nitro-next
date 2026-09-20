/**
 * `conditions/TimeMatches` (`wf_cnd_match_time`) - the time of day matches: each of hour, minute
 * and second is skipped, one exact value or a range. Extends `§_-02a§` (`TimezoneCondition`).
 *
 * Int params: `[ second used, minute used, hour used, second min, second max, minute min,
 * minute max, hour min, hour max ]` - a field that is not used saves its min and max as 0. String
 * param: the time zone.
 */
import { chronoRangeFilterFromState, ChronoRangeFilterState, chronoRangeStateFromFilter, createChronoFieldRangeFilter } from '../../common/ChronoFieldRangeFilter';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { createTimezoneConditionForm, readTimezoneConditionString, rememberTimezoneConditionRead, TimezoneConditionForm } from './TimezoneCondition';

/** `createChronoRangeFilter(skip, exact, range, 0, 0, max, 25)` - every field defaults to 0. */
export const TIME_MATCHES_DEFAULT = 0;
export const TIME_MATCHES_MAX_HOUR = 23;
export const TIME_MATCHES_MAX_MINUTE = 59;
export const TIME_MATCHES_MAX_SECOND = 59;
export const TIME_MATCHES_INPUT_WIDTH = 25;

export interface TimeMatchesConditionForm extends TimezoneConditionForm {
    hour: ChronoRangeFilterState;
    minute: ChronoRangeFilterState;
    second: ChronoRangeFilterState;
}

/** `applyFilter(new ChronoFieldRangeFilter(name, used == 1, min, max, 0))`. */
const applyFilter = (name: string, used: number, min: number, max: number): ChronoRangeFilterState =>
    chronoRangeStateFromFilter(createChronoFieldRangeFilter(name, used === 1, min, max, 0), TIME_MATCHES_DEFAULT);

export const timeMatchesCondition: WiredElementDefinition<TimeMatchesConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.TIME_MATCHES,
    createForm: (triggerable, ctx) => ({
        ...createTimezoneConditionForm(ConditionCodes.TIME_MATCHES, triggerable, ctx),
        second: applyFilter('second', getWiredInt(triggerable, 0), getWiredInt(triggerable, 3), getWiredInt(triggerable, 4)),
        minute: applyFilter('minute', getWiredInt(triggerable, 1), getWiredInt(triggerable, 5), getWiredInt(triggerable, 6)),
        hour: applyFilter('hour', getWiredInt(triggerable, 2), getWiredInt(triggerable, 7), getWiredInt(triggerable, 8)),
    }),
    readIntParams: (form) => {
        const second = chronoRangeFilterFromState('second', form.second, TIME_MATCHES_DEFAULT);
        const minute = chronoRangeFilterFromState('minute', form.minute, TIME_MATCHES_DEFAULT);
        const hour = chronoRangeFilterFromState('hour', form.hour, TIME_MATCHES_DEFAULT);

        return [
            second.useFilter ? 1 : 0,
            minute.useFilter ? 1 : 0,
            hour.useFilter ? 1 : 0,
            second.min,
            second.max,
            minute.min,
            minute.max,
            hour.min,
            hour.max,
        ];
    },
    readStringParam: form => readTimezoneConditionString(form),
    rememberOnRead: rememberTimezoneConditionRead,
};
