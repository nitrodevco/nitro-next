/**
 * `variables/§_-g16§.buildInputs` - the variable name, the "has value" setting and the
 * availability radio (0: while the user is in the room, 10: persistent, 11: shared).
 */
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { USER_VARIABLE_AVAILABILITIES, UserVariableForm, WiredElementView } from '#base/wired';

import { VariableAvailabilitySection } from './shared/VariableAvailabilitySection';
import { VariableSettingsSection } from './shared/VariableSettingsSection';

export const UserVariableView: WiredElementView<UserVariableForm> = ({ form, setForm }) => (
    <>
        <WiredVariableNameSection
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <VariableSettingsSection
            label="${wiredfurni.params.variables.settings.has_value}"
            selected={form.hasValue}
            onToggle={hasValue => setForm({ hasValue })}
        />
        <VariableAvailabilitySection
            availabilities={USER_VARIABLE_AVAILABILITIES}
            selected={form.availability}
            onSelect={availability => setForm({ availability })}
        />
    </>
);
