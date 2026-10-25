/**
 * `conditions/TimeElapsedLess.buildInputs` - the `allowbefore2` slider: 1 to 1200 half seconds
 * (`CONVERTER_PULSES`), with its number input.
 */
import { SLIDER_CONVERTER_PULSES, TIME_ELAPSED_LESS_MAX, TIME_ELAPSED_LESS_MIN, TimeElapsedLessConditionForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const TimeElapsedLessView: WiredElementView<TimeElapsedLessConditionForm> = ({ form, setForm }) => (
    <WiredSliderSection
        titleKey="wiredfurni.params.allowbefore2"
        unitKey=""
        converter={SLIDER_CONVERTER_PULSES}
        min={TIME_ELAPSED_LESS_MIN}
        max={TIME_ELAPSED_LESS_MAX}
        step={1}
        value={form.time}
        onChange={time => setForm({ time })}
    />
);
