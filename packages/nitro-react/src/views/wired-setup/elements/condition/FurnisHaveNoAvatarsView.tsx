/**
 * `conditions/FurnisHaveNoAvatars.buildInputs` - the `requireall` section, with id 1 listed first
 * (`not_requireall.2`) and 0 second (`not_requireall.3`).
 */
import { FurnisHaveNoAvatarsConditionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const FurnisHaveNoAvatarsView: WiredElementView<FurnisHaveNoAvatarsConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.requireall}">
        <WiredRadioGroup
            options={[ { id: 1, label: '${wiredfurni.params.not_requireall.2}' }, { id: 0, label: '${wiredfurni.params.not_requireall.3}' } ]}
            selected={form.requireAll}
            onSelect={requireAll => setForm({ requireAll })}
        />
    </WiredSection>
);
