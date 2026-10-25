/**
 * `conditions/ActorIsWearingEffect.buildInputs` - the `effectid` section: a 200 wide number input
 * taking any 32-bit int, with the `wiredfurni.tooltip.effectid` tooltip.
 */
import { ActorIsWearingEffectConditionForm, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementView } from '#base/wired';

import { WiredNumberInput } from '../../kit/WiredNumberInput';
import { WiredSection } from '../../kit/WiredSection';

/** `NumberInputParam(0, int min, int max, 200, ...)`. */
const EFFECT_INPUT_WIDTH = 200;

export const ActorIsWearingEffectView: WiredElementView<ActorIsWearingEffectConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.effectid}">
        <WiredNumberInput
            value={form.effectId}
            onChange={effectId => setForm({ effectId })}
            min={WIRED_INT_MIN}
            max={WIRED_INT_MAX}
            width={EFFECT_INPUT_WIDTH}
            tooltip="${wiredfurni.tooltip.effectid}"
        />
    </WiredSection>
);
