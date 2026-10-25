/**
 * `conditions/TimeElapsedMore.buildInputs` - the `allowafter2` slider: 1 to 1200 half seconds
 * (`CONVERTER_PULSES`), with its number input.
 */
import { SLIDER_CONVERTER_PULSES, TIME_ELAPSED_MORE_MAX, TIME_ELAPSED_MORE_MIN, TimeElapsedMoreConditionForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const TimeElapsedMoreView: WiredElementView<TimeElapsedMoreConditionForm> = ({ form, setForm }) => (
    <WiredSliderSection
        titleKey="wiredfurni.params.allowafter2"
        unitKey=""
        converter={SLIDER_CONVERTER_PULSES}
        min={TIME_ELAPSED_MORE_MIN}
        max={TIME_ELAPSED_MORE_MAX}
        step={1}
        value={form.time}
        onChange={time => setForm({ time })}
    />
);
