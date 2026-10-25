/**
 * `variables/§_-EH§.buildInputs` - the variable name, the inspection section with the variable's
 * current value (`variables.inspection.current_value` with `%value%` filled in, as
 * `onEditStart` registers it) and the availability radio (1, 10, 11).
 */
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredText } from '#base/views/wired-setup/kit/WiredText';
import { WiredVariableNameSection } from '#base/views/wired-setup/kit/WiredVariableNameSection';
import { GLOBAL_VARIABLE_AVAILABILITIES, GlobalVariableForm, WiredElementView } from '#base/wired';

import { VariableAvailabilitySection } from './shared/VariableAvailabilitySection';

export const GlobalVariableView: WiredElementView<GlobalVariableForm> = ({ form, setForm, ctx }) => (
    <>
        <WiredVariableNameSection
            value={form.name}
            onChange={name => setForm({ name })}
        />
        <WiredSection title="${wiredfurni.params.variables.inspection}">
            <WiredText text={ctx.localize('wiredfurni.params.variables.inspection.current_value', { value: form.currentValue })} />
        </WiredSection>
        <VariableAvailabilitySection
            availabilities={GLOBAL_VARIABLE_AVAILABILITIES}
            selected={form.availability}
            onSelect={availability => setForm({ availability })}
        />
    </>
);
