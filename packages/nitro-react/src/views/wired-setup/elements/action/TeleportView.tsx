/**
 * `actiontypes/§_-919§.buildInputs` (TELEPORT) - one section, `wiredfurni.params.teleport.options`,
 * holding a checkbox group with its single option.
 */
import { TeleportActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export const TeleportView: WiredElementView<TeleportActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.teleport.options}">
        <WiredCheckboxGroup
            options={[ { label: '${wiredfurni.params.teleport.options.0}', selected: form.stayIfAlreadyThere } ]}
            onToggle={(id, stayIfAlreadyThere) => setForm({ stayIfAlreadyThere })}
        />
    </WiredSection>
);
