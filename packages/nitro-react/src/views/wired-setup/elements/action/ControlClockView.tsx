/**
 * `actiontypes/ControlClock.buildInputs` - the command radio (`clock_control.0` to `.4`) in the
 * `clock_control` section.
 */
import { CONTROL_CLOCK_COMMANDS, ControlClockActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const OPTIONS = CONTROL_CLOCK_COMMANDS.map(id => ({ id, label: `\${wiredfurni.params.clock_control.${id}}` }));

export const ControlClockView: WiredElementView<ControlClockActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.clock_control}">
        <WiredRadioGroup
            options={OPTIONS}
            selected={form.command}
            onSelect={command => setForm({ command })}
        />
    </WiredSection>
);
