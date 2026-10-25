/**
 * `conditions/DateRangeActive.buildInputs` - the `startdate` and `enddate` sections, a text input
 * each with the pattern `YYYY/MM/DD HH:MM` as its tooltip.
 */
import { DATE_RANGE_ACTIVE_MAX_LENGTH, DATE_RANGE_ACTIVE_PATTERN_HINT, DateRangeActiveConditionForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

export const DateRangeActiveView: WiredElementView<DateRangeActiveConditionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.startdate}">
            <WiredTextInput
                value={form.start}
                onChange={start => setForm({ start })}
                maxCharacters={DATE_RANGE_ACTIVE_MAX_LENGTH}
                tooltip={DATE_RANGE_ACTIVE_PATTERN_HINT}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.enddate}">
            <WiredTextInput
                value={form.end}
                onChange={end => setForm({ end })}
                maxCharacters={DATE_RANGE_ACTIVE_MAX_LENGTH}
                tooltip={DATE_RANGE_ACTIVE_PATTERN_HINT}
            />
        </WiredSection>
    </>
);
