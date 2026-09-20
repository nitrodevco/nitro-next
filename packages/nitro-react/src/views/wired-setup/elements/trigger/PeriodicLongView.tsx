/**
 * `triggerconfs/§_-45§.buildInputs` - the interval slider, in steps of five seconds, with its number input.
 */
import { PERIODIC_LONG_MAX, PERIODIC_LONG_MIN, SLIDER_CONVERTER_SECONDS5, TriggerSliderForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const PeriodicLongView: WiredElementView<TriggerSliderForm> = ({ form, setForm }) => (
    <WiredSliderSection
        titleKey="wiredfurni.params.settime3"
        unitKey=""
        converter={SLIDER_CONVERTER_SECONDS5}
        min={PERIODIC_LONG_MIN}
        max={PERIODIC_LONG_MAX}
        step={1}
        value={form.value}
        onChange={value => setForm({ value })}
    />
);
