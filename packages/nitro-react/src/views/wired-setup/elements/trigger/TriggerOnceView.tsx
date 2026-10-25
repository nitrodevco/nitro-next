/**
 * `triggerconfs/TriggerOnce.buildInputs` - the time slider, in half seconds, with its number input.
 */
import { SLIDER_CONVERTER_PULSES, TRIGGER_ONCE_MAX_PULSES, TRIGGER_ONCE_MIN_PULSES, TriggerSliderForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const TriggerOnceView: WiredElementView<TriggerSliderForm> = ({ form, setForm }) => (
    <WiredSliderSection
        titleKey="wiredfurni.params.settime2"
        unitKey=""
        converter={SLIDER_CONVERTER_PULSES}
        min={TRIGGER_ONCE_MIN_PULSES}
        max={TRIGGER_ONCE_MAX_PULSES}
        step={1}
        value={form.value}
        onChange={value => setForm({ value })}
    />
);
