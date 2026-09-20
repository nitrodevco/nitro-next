/**
 * `conditions/DateMatches` (`wf_cnd_match_date`) - the date matches: a set of weekdays, a day of
 * the month (skipped, exact or a range), a set of months and a year (the same). Extends
 * `§_-02a§` (`TimezoneCondition`).
 *
 * Int params: `[ day used, year used, weekday mask, day min, day max, month mask, year min,
 * year max ]` - bit 0 of the weekday mask is `time.weekday.1`, bit 0 of the month mask
 * `time.month.1`; an unused day saves 1 to 1, an unused year 0 to 0. String param: the time zone.
 */
import { chronoRangeFilterFromState, ChronoRangeFilterState, chronoRangeStateFromFilter, createChronoFieldRangeFilter } from '../../common/ChronoFieldRangeFilter';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';
import { createTimezoneConditionForm, readTimezoneConditionString, rememberTimezoneConditionRead, TimezoneConditionForm } from './TimezoneCondition';

/** `createChronoRangeFilter(skip, exact, range, 1, 1, 31, 25)`. */
export const DATE_MATCHES_DAY_DEFAULT = 1;
export const DATE_MATCHES_DAY_MIN = 1;
export const DATE_MATCHES_DAY_MAX = 31;
export const DATE_MATCHES_DAY_WIDTH = 25;
/** `createChronoRangeFilter(skip, exact, range, 0, 0, 9999, 35)`. */
export const DATE_MATCHES_YEAR_DEFAULT = 0;
export const DATE_MATCHES_YEAR_MIN = 0;
export const DATE_MATCHES_YEAR_MAX = 9999;
export const DATE_MATCHES_YEAR_WIDTH = 35;
/** `buildWeekdayLabels` / `buildMonthLabels` count from 1. */
export const DATE_MATCHES_WEEKDAYS = 7;
export const DATE_MATCHES_MONTHS = 12;

export interface DateMatchesConditionForm extends TimezoneConditionForm {
    /** `ChronoMaskFilterPreset.mask` - only the bits it has a checkbox for. */
    weekdays: number;
    day: ChronoRangeFilterState;
    months: number;
    year: ChronoRangeFilterState;
}

export const dateMatchesCondition: WiredElementDefinition<DateMatchesConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.DATE_MATCHES,
    createForm: (triggerable, ctx) => ({
        ...createTimezoneConditionForm(ConditionCodes.DATE_MATCHES, triggerable, ctx),
        weekdays: getWiredInt(triggerable, 2) & ((1 << DATE_MATCHES_WEEKDAYS) - 1),
        day: chronoRangeStateFromFilter(createChronoFieldRangeFilter('day', getWiredInt(triggerable, 0) === 1, getWiredInt(triggerable, 3), getWiredInt(triggerable, 4), 1), DATE_MATCHES_DAY_DEFAULT),
        months: getWiredInt(triggerable, 5) & ((1 << DATE_MATCHES_MONTHS) - 1),
        year: chronoRangeStateFromFilter(createChronoFieldRangeFilter('year', getWiredInt(triggerable, 1) === 1, getWiredInt(triggerable, 6), getWiredInt(triggerable, 7), 0), DATE_MATCHES_YEAR_DEFAULT),
    }),
    readIntParams: (form) => {
        const day = chronoRangeFilterFromState('day', form.day, DATE_MATCHES_DAY_DEFAULT);
        const year = chronoRangeFilterFromState('year', form.year, DATE_MATCHES_YEAR_DEFAULT);

        return [
            day.useFilter ? 1 : 0,
            year.useFilter ? 1 : 0,
            form.weekdays,
            day.min,
            day.max,
            form.months,
            year.min,
            year.max,
        ];
    },
    readStringParam: form => readTimezoneConditionString(form),
    rememberOnRead: rememberTimezoneConditionRead,
};
