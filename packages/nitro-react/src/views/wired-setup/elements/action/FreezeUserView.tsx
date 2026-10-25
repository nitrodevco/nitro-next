/**
 * `actiontypes/FreezeUser.buildInputs` - the effect dropdown (`freeze.effect.0` to `.4`) over the
 * "cancel on teleport" checkbox, in one `freeze.effect_selection` section.
 */
import { FREEZE_USER_EFFECTS, FreezeUserActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';

const EFFECT_OPTIONS = FREEZE_USER_EFFECTS.map(id => ({ id, label: `\${wiredfurni.params.freeze.effect.${id}}` }));

export const FreezeUserView: WiredElementView<FreezeUserActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.freeze.effect_selection}">
        <WiredSimpleList>
            <WiredDropdown
                options={EFFECT_OPTIONS}
                selected={form.effect}
                onSelect={effect => setForm({ effect })}
                caption="${wiredfurni.params.freeze.effect_selection}"
            />
            <WiredCheckboxGroup
                options={[ { id: 0, label: '${wiredfurni.params.freeze.cancel_on_teleport}', selected: form.cancelOnTeleport } ]}
                onToggle={(_, cancelOnTeleport) => setForm({ cancelOnTeleport })}
            />
        </WiredSimpleList>
    </WiredSection>
);
