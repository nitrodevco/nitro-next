/**
 * `selectors/FurniWithAltitude.buildInputs` - the comparison radio (`comparison.0` to `.2`,
 * `ComparisonSection`), then the altitude slider (0 to 80.00, in hundredths) with its number input.
 */
import { FURNI_WITH_ALTITUDE_MAX, FurniWithAltitudeSelectorForm, SLIDER_CONVERTER_HUNDREDTH, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { ComparisonSection } from '../shared/ComparisonSection';

export const FurniWithAltitudeView: WiredElementView<FurniWithAltitudeSelectorForm> = ({ form, setForm }) => (
    <>
        <ComparisonSection
            selected={form.comparison}
            onSelect={comparison => setForm({ comparison })}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.setaltitude"
            unitKey="altitude"
            converter={SLIDER_CONVERTER_HUNDREDTH}
            min={0}
            max={FURNI_WITH_ALTITUDE_MAX}
            step={1}
            value={form.altitude}
            onChange={altitude => setForm({ altitude })}
        />
    </>
);
