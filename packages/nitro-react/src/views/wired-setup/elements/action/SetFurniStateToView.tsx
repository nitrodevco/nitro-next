/**
 * `actiontypes/SetFurniStateTo.buildInputs` - four checkboxes (state, direction, position,
 * altitude, captioned `wiredfurni.params.condition.<part>`) in the `wiredfurni.params.conditions`
 * section.
 */
import { SET_FURNI_STATE_TO_PARTS, SetFurniStateToActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export const SetFurniStateToView: WiredElementView<SetFurniStateToActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.conditions}">
        <WiredCheckboxGroup
            options={SET_FURNI_STATE_TO_PARTS.map((part, index) => ({ label: `\${wiredfurni.params.condition.${part}}`, selected: form.parts[index] }))}
            onToggle={(id, selected) => setForm(current => ({ ...current, parts: current.parts.map((value, index) => ((index === id) ? selected : value)) }))}
        />
    </WiredSection>
);
