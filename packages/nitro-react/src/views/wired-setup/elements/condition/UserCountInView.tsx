/**
 * `conditions/UserCountIn.buildInputs` - the `usercountmin` and `usercountmax` sliders, 0 to 125
 * each, without number inputs (the value fills the title's `%value%`).
 */
import { SLIDER_CONVERTER_ECHO, USER_COUNT_IN_MAX, UserCountInConditionForm, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const UserCountInView: WiredElementView<UserCountInConditionForm> = ({ form, setForm }) => (
    <>
        <WiredSliderSection
            titleKey="wiredfurni.params.usercountmin"
            unitKey="value"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={USER_COUNT_IN_MAX}
            step={1}
            value={form.min}
            onChange={min => setForm({ min })}
            showInput={false}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.usercountmax"
            unitKey="value"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={USER_COUNT_IN_MAX}
            step={1}
            value={form.max}
            onChange={max => setForm({ max })}
            showInput={false}
        />
    </>
);
