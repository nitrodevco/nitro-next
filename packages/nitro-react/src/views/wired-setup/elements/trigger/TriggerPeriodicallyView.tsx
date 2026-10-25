/**
 * `triggerconfs/§_-A1z§.buildInputs` - the interval slider, in half seconds, with its number input.
 */
import { SLIDER_CONVERTER_PULSES, TRIGGER_PERIODICALLY_MAX, TRIGGER_PERIODICALLY_MIN, TriggerSliderForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const TriggerPeriodicallyView: WiredElementView<TriggerSliderForm> = ({ form, setForm }) => (
    <WiredSliderSection
        titleKey="wiredfurni.params.settime3"
        unitKey=""
        converter={SLIDER_CONVERTER_PULSES}
        min={TRIGGER_PERIODICALLY_MIN}
        max={TRIGGER_PERIODICALLY_MAX}
        step={1}
        value={form.value}
        onChange={value => setForm({ value })}
    />
);
