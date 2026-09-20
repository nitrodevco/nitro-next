/**
 * `addons/CarryUsers.buildInputs` - the carry mode radio in its section.
 */
import { CarryUsersAddonForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const CarryUsersView: WiredElementView<CarryUsersAddonForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.carry_mode}">
        <WiredRadioGroup
            options={[ { id: 0, label: '${wiredfurni.params.carry_mode.0}' }, { id: 1, label: '${wiredfurni.params.carry_mode.1}' } ]}
            selected={form.mode}
            onSelect={mode => setForm({ mode })}
        />
    </WiredSection>
);
