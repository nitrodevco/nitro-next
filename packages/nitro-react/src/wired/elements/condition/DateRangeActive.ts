/**
 * `conditions/DateRangeActive` (`wf_cnd_date_rng_active`) - the current time is between two dates.
 *
 * Int params: `[ start, end ]` in Unix seconds. Both are typed as text in the pattern
 * `yyyy/MM/dd HH:mm` (local time, `DateTimeFormatter("en-US")` on open, `Date.parse` on save).
 * A start that does not parse saves no params at all, an end that does not parse only the start.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ConditionCodes } from './conditionCodes';

/** The two inputs' tooltip, a literal in Flash. */
export const DATE_RANGE_ACTIVE_PATTERN_HINT = 'YYYY/MM/DD HH:MM';

/** `TextInputParam("", 1000, ...)`'s limit. */
export const DATE_RANGE_ACTIVE_MAX_LENGTH = 1000;

export interface DateRangeActiveConditionForm {
    start: string;
    end: string;
}

const pad = (value: number, length: number = 2): string => value.toString().padStart(length, '0');

/** `DateTimeFormatter.format` with `yyyy/MM/dd HH:mm`, in local time. */
const formatDate = (seconds: number): string => {
    const date = new Date(seconds * 1000);

    return `${pad(date.getFullYear(), 4)}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** `int(Date.parse(text) / 1000)` - `null` for Flash's `NaN`. */
const parseSeconds = (text: string): number | null => {
    const time = Date.parse(text);

    return Number.isNaN(time) ? null : (Math.trunc(time / 1000) | 0);
};

export const dateRangeActiveCondition: WiredElementDefinition<DateRangeActiveConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.DATE_RANGE_ACTIVE,
    createForm: triggerable => ({
        start: (triggerable.intParams.length > 0) ? formatDate(triggerable.intParams[0]) : '',
        end: (triggerable.intParams.length > 1) ? formatDate(triggerable.intParams[1]) : '',
    }),
    readIntParams: (form) => {
        const params: number[] = [];
        const start = parseSeconds(form.start);

        if (start !== null) {
            params.push(start);

            const end = parseSeconds(form.end);

            if (end !== null) params.push(end);
        }

        return params;
    },
};
