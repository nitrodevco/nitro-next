/**
 * `selectors/FurniWithAltitude.buildInputs` - the comparison radio (`comparison.0` to `.2`), then
 * the altitude slider (0 to 80.00, in hundredths) with its number input.
 */
import { FURNI_WITH_ALTITUDE_COMPARISON_IDS, FURNI_WITH_ALTITUDE_MAX, FurniWithAltitudeSelectorForm, SLIDER_CONVERTER_HUNDREDTH, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';

const COMPARISON_OPTIONS = FURNI_WITH_ALTITUDE_COMPARISON_IDS.map(id => ({ id, label: `\${wiredfurni.params.comparison.${id}}` }));

export const FurniWithAltitudeView: WiredElementView<FurniWithAltitudeSelectorForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.comparison_selection}">
            <WiredRadioGroup
                options={COMPARISON_OPTIONS}
                selected={form.comparison}
                onSelect={comparison => setForm({ comparison })}
            />
        </WiredSection>
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
