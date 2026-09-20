/**
 * `conditions/ClockTimeMatches.buildInputs` - the `comparison_selection` section, then the
 * `clock_minutes_elapsed` slider (0 to 99) and the `clock_seconds_elapsed` slider (0 to 119 half
 * seconds, `SliderValuePulses`), both without number inputs.
 */
import { CLOCK_TIME_MATCHES_MAX_MINUTES, CLOCK_TIME_MATCHES_MAX_PULSES, ClockTimeMatchesConditionForm, SLIDER_CONVERTER_ECHO, SLIDER_CONVERTER_PULSES, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { ConditionComparisonSection } from './shared/ConditionComparisonSection';

export const ClockTimeMatchesView: WiredElementView<ClockTimeMatchesConditionForm> = ({ form, setForm }) => (
    <>
        <ConditionComparisonSection
            selected={form.comparison}
            onSelect={comparison => setForm({ comparison })}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.clock_minutes_elapsed"
            unitKey="minutes"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={CLOCK_TIME_MATCHES_MAX_MINUTES}
            step={1}
            value={form.minutes}
            onChange={minutes => setForm({ minutes })}
            showInput={false}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.clock_seconds_elapsed"
            unitKey="seconds"
            converter={SLIDER_CONVERTER_PULSES}
            min={0}
            max={CLOCK_TIME_MATCHES_MAX_PULSES}
            step={1}
            value={form.pulses}
            onChange={pulses => setForm({ pulses })}
            showInput={false}
        />
    </>
);
