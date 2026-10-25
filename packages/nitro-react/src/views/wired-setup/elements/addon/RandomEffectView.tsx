/**
 * `addons/§_-S1S§.buildInputs` - the "pick amount" slider (1 to 100) above the "skip actions"
 * slider (0 to 100), neither with a number input.
 */
import { RANDOM_EFFECT_MAX, RandomEffectAddonForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const RandomEffectView: WiredElementView<RandomEffectAddonForm> = ({ form, setForm }) => (
    <>
        <WiredSliderSection
            titleKey="wiredfurni.params.pickamount"
            unitKey="picks"
            converter={SLIDER_CONVERTER_ECHO}
            min={1}
            max={RANDOM_EFFECT_MAX}
            step={1}
            value={form.pick}
            onChange={pick => setForm({ pick })}
            showInput={false}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.skipactions"
            unitKey="skips"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={RANDOM_EFFECT_MAX}
            step={1}
            value={form.skip}
            onChange={skip => setForm({ skip })}
            showInput={false}
        />
    </>
);
