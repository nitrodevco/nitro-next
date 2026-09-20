/**
 * `conditions/§_-je§.buildInputs` (input source quantity) - the `comparison_selection` section and
 * the `setamount2` slider (0 to 100, with its number input). The merged source it counts is the
 * dialog's merged input source section.
 */
import { INPUT_SOURCE_QUANTITY_MAX, InputSourceQuantityConditionForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { ConditionComparisonSection } from './shared/ConditionComparisonSection';

export const InputSourceQuantityView: WiredElementView<InputSourceQuantityConditionForm> = ({ form, setForm }) => (
    <>
        <ConditionComparisonSection
            selected={form.comparison}
            onSelect={comparison => setForm({ comparison })}
        />
        <WiredSliderSection
            titleKey="wiredfurni.params.setamount2"
            unitKey=""
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={INPUT_SOURCE_QUANTITY_MAX}
            step={1}
            value={form.amount}
            onChange={amount => setForm({ amount })}
        />
    </>
);
