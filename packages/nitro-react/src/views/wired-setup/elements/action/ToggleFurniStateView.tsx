/**
 * `actiontypes/ToggleFurniState.buildInputs` - the toggle type radio (`toggletype.0` / `.1`) in the
 * `toggletype_selection` section.
 */
import { ToggleFurniStateActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const OPTIONS = [ 0, 1 ].map(id => ({ id, label: `\${wiredfurni.params.toggletype.${id}}` }));

export const ToggleFurniStateView: WiredElementView<ToggleFurniStateActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.toggletype_selection}">
        <WiredRadioGroup
            options={OPTIONS}
            selected={form.toggleMode}
            onSelect={toggleMode => setForm({ toggleMode })}
        />
    </WiredSection>
);
