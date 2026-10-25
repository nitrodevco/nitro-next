/**
 * `conditions/DateMatches.buildInputs` - the weekdays (`time.weekday.1` to `.7`, two columns),
 * the day of the month (skip / exactly / between, 1 to 31, 25 wide), the months (`time.month.1`
 * to `.12`, three columns), the year (0 to 9999, 35 wide) and the time zone section.
 */
import { DATE_MATCHES_DAY_MAX, DATE_MATCHES_DAY_MIN, DATE_MATCHES_DAY_WIDTH, DATE_MATCHES_MONTHS, DATE_MATCHES_WEEKDAYS, DATE_MATCHES_YEAR_MAX, DATE_MATCHES_YEAR_MIN, DATE_MATCHES_YEAR_WIDTH, DateMatchesConditionForm, WiredElementView } from '#base/wired';

import { WiredChronoMaskFilter } from '../../kit/WiredChronoMaskFilter';
import { WiredChronoRangeFilter } from '../../kit/WiredChronoRangeFilter';
import { WiredSection } from '../../kit/WiredSection';
import { ConditionTimezoneSection } from './shared/ConditionTimezoneSection';

const SKIP = '${wiredfurni.params.time.skip}';
const EXACT = '${wiredfurni.params.time.exact}';
const RANGE = '${wiredfurni.params.time.range}';

/** `buildWeekdayLabels` / `buildMonthLabels`. */
const WEEKDAY_LABELS = Array.from({ length: DATE_MATCHES_WEEKDAYS }, (_, index) => `\${wiredfurni.params.time.weekday.${index + 1}}`);
const MONTH_LABELS = Array.from({ length: DATE_MATCHES_MONTHS }, (_, index) => `\${wiredfurni.params.time.month.${index + 1}}`);

export const DateMatchesView: WiredElementView<DateMatchesConditionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.time.weekday_selection}">
            <WiredChronoMaskFilter
                labels={WEEKDAY_LABELS}
                mask={form.weekdays}
                onChange={weekdays => setForm({ weekdays })}
                columns={2}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.time.day_selection}">
            <WiredChronoRangeFilter
                skipLabel={SKIP}
                exactLabel={EXACT}
                rangeLabel={RANGE}
                min={DATE_MATCHES_DAY_MIN}
                max={DATE_MATCHES_DAY_MAX}
                width={DATE_MATCHES_DAY_WIDTH}
                state={form.day}
                onChange={day => setForm({ day })}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.time.month_selection}">
            <WiredChronoMaskFilter
                labels={MONTH_LABELS}
                mask={form.months}
                onChange={months => setForm({ months })}
                columns={3}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.time.year_selection}">
            <WiredChronoRangeFilter
                skipLabel={SKIP}
                exactLabel={EXACT}
                rangeLabel={RANGE}
                min={DATE_MATCHES_YEAR_MIN}
                max={DATE_MATCHES_YEAR_MAX}
                width={DATE_MATCHES_YEAR_WIDTH}
                state={form.year}
                onChange={year => setForm({ year })}
            />
        </WiredSection>
        <ConditionTimezoneSection
            form={form}
            onSelect={timezoneId => setForm({ timezoneId })}
        />
    </>
);
