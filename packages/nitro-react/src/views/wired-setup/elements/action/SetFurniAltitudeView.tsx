/**
 * `actiontypes/SetFurniAltitude.buildInputs` - the operator radio (`operator.0` to `.2`) in the
 * `choose_type` section, then the altitude slider (0 to 8000 hundredths, with its input).
 */
import { SET_FURNI_ALTITUDE_MAX, SetFurniAltitudeActionForm, SLIDER_CONVERTER_HUNDREDTH, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';

const OPERATOR_OPTIONS = [ 0, 1, 2 ].map(id => ({ id, label: `\${wiredfurni.params.operator.${id}}` }));

export const SetFurniAltitudeView: WiredElementView<SetFurniAltitudeActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.choose_type}">
            <WiredRadioGroup
                options={OPERATOR_OPTIONS}
                selected={form.operator}
                onSelect={operator => setForm({ operator })}
            />
        </WiredSection>
        <WiredSliderSection
            titleKey="wiredfurni.params.setaltitude"
            unitKey="altitude"
            converter={SLIDER_CONVERTER_HUNDREDTH}
            min={0}
            max={SET_FURNI_ALTITUDE_MAX}
            step={1}
            value={form.altitude}
            onChange={altitude => setForm({ altitude })}
        />
    </>
);
