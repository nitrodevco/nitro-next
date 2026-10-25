/**
 * `variables/§_-51K§.buildInputs` - the variable name, the "has value" setting and the
 * availability radio (1: while the room is loaded, 10: persistent).
 */
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { FURNI_VARIABLE_AVAILABILITIES, FurniVariableForm, WiredElementView } from '#base/wired';

import { VariableAvailabilitySection } from './shared/VariableAvailabilitySection';
import { VariableSettingsSection } from './shared/VariableSettingsSection';

export const FurniVariableView: WiredElementView<FurniVariableForm> = ({ form, setForm }) => (
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
            availabilities={FURNI_VARIABLE_AVAILABILITIES}
            selected={form.availability}
            onSelect={availability => setForm({ availability })}
        />
    </>
);
