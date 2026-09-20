/**
 * `actiontypes/§_-lX§.buildInputs` (OVERRIDE_HEIGHT) - the type radio
 * (`wiredfurni.params.override_height.type.0` / `.1`) and the height slider section (0 to 8000,
 * with its number input), which `onChangeType` disables for type 1.
 */
import { OVERRIDE_HEIGHT_MAX, OVERRIDE_HEIGHT_TYPE_NO_HEIGHT, OverrideHeightActionForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';

export const OverrideHeightView: WiredElementView<OverrideHeightActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.override_height.type}">
            <WiredRadioGroup
                options={[ { id: 0, label: '${wiredfurni.params.override_height.type.0}' }, { id: 1, label: '${wiredfurni.params.override_height.type.1}' } ]}
                selected={form.type}
                onSelect={type => setForm({ type })}
            />
        </WiredSection>
        <WiredSliderSection
            titleKey="wiredfurni.params.override_height.height"
            unitKey=""
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={OVERRIDE_HEIGHT_MAX}
            step={1}
            value={form.height}
            onChange={height => setForm({ height })}
            sectionProps={{ disabled: form.type === OVERRIDE_HEIGHT_TYPE_NO_HEIGHT }}
        />
    </>
);
