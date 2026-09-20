/**
 * `actiontypes/AdjustClock.buildInputs` - the operator radio (`operator.0` to `.2`) in the
 * `choose_type` section, then the minutes slider (0 to 99) and the seconds slider (half seconds,
 * 0 to 119), both carrying their value in the title instead of an input.
 */
import { ADJUST_CLOCK_MAX_HALF_SECONDS, ADJUST_CLOCK_MAX_MINUTES, AdjustClockActionForm, SLIDER_CONVERTER_ECHO, SLIDER_CONVERTER_PULSES, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';

const OPERATOR_OPTIONS = [ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.operator.${id}}` }));

export const AdjustClockView: WiredElementView<AdjustClockActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.choose_type}">
            <WiredRadioGroup
                options={OPERATOR_OPTIONS}
                selected={form.operator}
                onSelect={operator => setForm({ operator })}
            />
        </WiredSection>
        <WiredSliderSection
            titleKey="wiredfurni.params.clock_minutes"
            unitKey="minutes"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={ADJUST_CLOCK_MAX_MINUTES}
            step={1}
            value={form.minutes}
            onChange={minutes => setForm({ minutes })}
            showInput={false}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.clock_seconds"
            unitKey="seconds"
            converter={SLIDER_CONVERTER_PULSES}
            min={0}
            max={ADJUST_CLOCK_MAX_HALF_SECONDS}
            step={1}
            value={form.halfSeconds}
            onChange={halfSeconds => setForm({ halfSeconds })}
            showInput={false}
        />
    </>
);
