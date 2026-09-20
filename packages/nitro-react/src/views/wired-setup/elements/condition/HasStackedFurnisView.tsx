/**
 * `conditions/HasStackedFurnis.buildInputs` - the `requireall` section: any picked furni
 * (`requireall.0`, 0) or all of them (`requireall.1`, 1).
 */
import { HasStackedFurnisConditionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const HasStackedFurnisView: WiredElementView<HasStackedFurnisConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.requireall}">
        <WiredRadioGroup
            options={[ { id: 0, label: '${wiredfurni.params.requireall.0}' }, { id: 1, label: '${wiredfurni.params.requireall.1}' } ]}
            selected={form.requireAll}
            onSelect={requireAll => setForm({ requireAll })}
        />
    </WiredSection>
);
