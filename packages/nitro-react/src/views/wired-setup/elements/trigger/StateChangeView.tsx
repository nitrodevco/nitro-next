/**
 * `triggerconfs/StateChange.buildInputs` - the mode radio, option 1 first:
 * `[ RadioButtonParam(1, l("state_trigger.1")), RadioButtonParam(0, l("state_trigger.0")) ]`.
 */
import { StateChangeTriggerForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const StateChangeView: WiredElementView<StateChangeTriggerForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.select_options}">
        <WiredRadioGroup
            options={[ { id: 1, label: '${wiredfurni.params.state_trigger.1}' }, { id: 0, label: '${wiredfurni.params.state_trigger.0}' } ]}
            selected={form.mode}
            onSelect={mode => setForm({ mode })}
        />
    </WiredSection>
);
