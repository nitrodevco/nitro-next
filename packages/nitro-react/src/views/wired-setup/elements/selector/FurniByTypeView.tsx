/**
 * `selectors/FurniByType.buildInputs` - the `select_options` section with its one checkbox,
 * `state_match`.
 */
import { FurniByTypeSelectorForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export const FurniByTypeView: WiredElementView<FurniByTypeSelectorForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.select_options}">
        <WiredCheckboxGroup
            options={[ { id: 0, label: '${wiredfurni.params.state_match}', selected: form.stateMatch } ]}
            onToggle={(_, stateMatch) => setForm({ stateMatch })}
        />
    </WiredSection>
);
