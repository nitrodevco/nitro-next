/**
 * `conditions/StatesMatch.buildInputs` - the `conditions` section: one checkbox per part of the
 * snapshot that has to match (`condition.state`, `.direction`, `.position`, `.altitude`).
 */
import { STATES_MATCH_PARTS, StatesMatchConditionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export const StatesMatchView: WiredElementView<StatesMatchConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.conditions}">
        <WiredCheckboxGroup
            options={STATES_MATCH_PARTS.map((part, index) => ({ label: `\${wiredfurni.params.condition.${part}}`, selected: form.parts[index] }))}
            onToggle={(index, selected) => setForm(current => ({ ...current, parts: current.parts.map((value, i) => ((i === index) ? selected : value)) }))}
        />
    </WiredSection>
);
