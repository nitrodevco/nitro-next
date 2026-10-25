/**
 * `triggerconfs/§_-wP§.buildInputs` - the interval slider, in steps of 50 milliseconds, without a number input.
 */
import { PERIODIC_SHORT_MAX, PERIODIC_SHORT_MIN, SLIDER_CONVERTER_MILLISECONDS50, TriggerSliderForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const PeriodicShortView: WiredElementView<TriggerSliderForm> = ({ form, setForm }) => (
    <WiredSliderSection
        titleKey="wiredfurni.params.setshorttime"
        unitKey="ms"
        converter={SLIDER_CONVERTER_MILLISECONDS50}
        min={PERIODIC_SHORT_MIN}
        max={PERIODIC_SHORT_MAX}
        step={1}
        value={form.value}
        onChange={value => setForm({ value })}
        showInput={false}
    />
);
