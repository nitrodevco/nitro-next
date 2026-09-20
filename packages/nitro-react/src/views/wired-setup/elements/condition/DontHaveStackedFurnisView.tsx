/**
 * `conditions/DontHaveStackedFurnis.buildInputs` - the `requireall` section with the negated
 * captions: `not_requireall.0` (0) and `not_requireall.1` (1).
 */
import { DontHaveStackedFurnisConditionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

export const DontHaveStackedFurnisView: WiredElementView<DontHaveStackedFurnisConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.requireall}">
        <WiredRadioGroup
            options={[ { id: 0, label: '${wiredfurni.params.not_requireall.0}' }, { id: 1, label: '${wiredfurni.params.not_requireall.1}' } ]}
            selected={form.requireAll}
            onSelect={requireAll => setForm({ requireAll })}
        />
    </WiredSection>
);
