/**
 * `conditions/TimeMatches.buildInputs` - one `ChronoRangeFilterPreset` section each for the hour
 * (0 to 23), minute and second (0 to 59) - skip (`time.skip`), exactly (`time.exact`) or between
 * (`time.range`), 25 wide inputs - then the time zone section.
 */
import { TIME_MATCHES_INPUT_WIDTH, TIME_MATCHES_MAX_HOUR, TIME_MATCHES_MAX_MINUTE, TIME_MATCHES_MAX_SECOND, TimeMatchesConditionForm, WiredElementView } from '#base/wired';

import { WiredChronoRangeFilter } from '../../kit/WiredChronoRangeFilter';
import { WiredSection } from '../../kit/WiredSection';
import { ConditionTimezoneSection } from './shared/ConditionTimezoneSection';

const SKIP = '${wiredfurni.params.time.skip}';
const EXACT = '${wiredfurni.params.time.exact}';
const RANGE = '${wiredfurni.params.time.range}';

export const TimeMatchesView: WiredElementView<TimeMatchesConditionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.time.hour_selection}">
            <WiredChronoRangeFilter
                skipLabel={SKIP}
                exactLabel={EXACT}
                rangeLabel={RANGE}
                min={0}
                max={TIME_MATCHES_MAX_HOUR}
                width={TIME_MATCHES_INPUT_WIDTH}
                state={form.hour}
                onChange={hour => setForm({ hour })}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.time.minute_selection}">
            <WiredChronoRangeFilter
                skipLabel={SKIP}
                exactLabel={EXACT}
                rangeLabel={RANGE}
                min={0}
                max={TIME_MATCHES_MAX_MINUTE}
                width={TIME_MATCHES_INPUT_WIDTH}
                state={form.minute}
                onChange={minute => setForm({ minute })}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.time.second_selection}">
            <WiredChronoRangeFilter
                skipLabel={SKIP}
                exactLabel={EXACT}
                rangeLabel={RANGE}
                min={0}
                max={TIME_MATCHES_MAX_SECOND}
                width={TIME_MATCHES_INPUT_WIDTH}
                state={form.second}
                onChange={second => setForm({ second })}
            />
        </WiredSection>
        <ConditionTimezoneSection
            form={form}
            onSelect={timezoneId => setForm({ timezoneId })}
        />
    </>
);
