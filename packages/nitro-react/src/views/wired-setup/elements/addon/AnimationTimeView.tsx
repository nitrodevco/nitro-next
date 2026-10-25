/**
 * `addons/AnimationTime.buildInputs` - the animation time slider, 50 to 2000 ms in steps of 50,
 * with its number input.
 */
import { ANIMATION_TIME_MAX, ANIMATION_TIME_MIN, ANIMATION_TIME_STEP, AnimationTimeAddonForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const AnimationTimeView: WiredElementView<AnimationTimeAddonForm> = ({ form, setForm }) => (
    <WiredSliderSection
        titleKey="wiredfurni.params.setanimationtime2"
        unitKey=""
        converter={SLIDER_CONVERTER_ECHO}
        min={ANIMATION_TIME_MIN}
        max={ANIMATION_TIME_MAX}
        step={ANIMATION_TIME_STEP}
        value={form.time}
        onChange={time => setForm({ time })}
    />
);
