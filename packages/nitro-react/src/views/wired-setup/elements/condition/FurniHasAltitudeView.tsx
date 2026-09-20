/**
 * `conditions/FurniHasAltitude.buildInputs` - the `comparison_selection` section and the
 * `setaltitude` slider (0 to 8000 hundredths, `SliderValueHundredth`, with its number input).
 */
import { FURNI_HAS_ALTITUDE_MAX, FurniHasAltitudeConditionForm, SLIDER_CONVERTER_HUNDREDTH, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { ConditionComparisonSection } from './shared/ConditionComparisonSection';

export const FurniHasAltitudeView: WiredElementView<FurniHasAltitudeConditionForm> = ({ form, setForm }) => (
    <>
        <ConditionComparisonSection
            selected={form.comparison}
            onSelect={comparison => setForm({ comparison })}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.setaltitude"
            unitKey=""
            converter={SLIDER_CONVERTER_HUNDREDTH}
            min={0}
            max={FURNI_HAS_ALTITUDE_MAX}
            step={1}
            value={form.altitude}
            onChange={altitude => setForm({ altitude })}
        />
    </>
);
