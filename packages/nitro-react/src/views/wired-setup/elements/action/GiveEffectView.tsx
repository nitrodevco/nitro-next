/**
 * `actiontypes/GiveEffect.buildInputs` - the effect id input (0 to 10000) in the `give_effect.id`
 * section, the priority input (0 to 2) in the `give_effect.priority` section and the type radio
 * (two columns) in the `give_effect.type` section.
 */
import { GIVE_EFFECT_MAX_ID, GIVE_EFFECT_MAX_PRIORITY, GiveEffectActionForm, WiredElementView } from '#base/wired';

import { WiredNumberInput } from '../../kit/WiredNumberInput';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const TYPE_OPTIONS = [ 0, 1 ].map(id => ({ id, label: `\${wiredfurni.params.give_effect.type.${id}}` }));

/** `createRadioGroup(..., null, 2)`. */
const TYPE_COLUMNS = 2;

export const GiveEffectView: WiredElementView<GiveEffectActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.give_effect.id}">
            <WiredNumberInput
                value={form.effectId}
                onChange={effectId => setForm({ effectId })}
                min={0}
                max={GIVE_EFFECT_MAX_ID}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.give_effect.priority}">
            <WiredNumberInput
                value={form.priority}
                onChange={priority => setForm({ priority })}
                min={0}
                max={GIVE_EFFECT_MAX_PRIORITY}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.give_effect.type}">
            <WiredRadioGroup
                options={TYPE_OPTIONS}
                selected={form.type}
                onSelect={type => setForm({ type })}
                columns={TYPE_COLUMNS}
            />
        </WiredSection>
    </>
);
