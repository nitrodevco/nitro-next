/**
 * `conditions/FurnisHaveAvatars.buildInputs` - the `requireall` section: any picked furni
 * (`requireall.2`, 0) or all of them (`requireall.3`, 1).
 */
import { FurnisHaveAvatarsConditionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const FurnisHaveAvatarsView: WiredElementView<FurnisHaveAvatarsConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.requireall}">
        <WiredRadioGroup
            options={[ { id: 0, label: '${wiredfurni.params.requireall.2}' }, { id: 1, label: '${wiredfurni.params.requireall.3}' } ]}
            selected={form.requireAll}
            onSelect={requireAll => setForm({ requireAll })}
        />
    </WiredSection>
);
