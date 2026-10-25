/**
 * `variables/§_-H1e§.buildInputs` - the variable name and the "has value" setting.
 */
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { ContextVariableForm, WiredElementView } from '#base/wired';

import { VariableSettingsSection } from './shared/VariableSettingsSection';

export const ContextVariableView: WiredElementView<ContextVariableForm> = ({ form, setForm }) => (
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
    </>
);
