/**
 * `addons/MovePhysics.buildInputs` - one section (`select_options`) with the four physics
 * checkboxes.
 */
import { MOVE_PHYSICS_OPTIONS, MovePhysicsAddonForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export const MovePhysicsView: WiredElementView<MovePhysicsAddonForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.select_options}">
        <WiredCheckboxGroup
            options={MOVE_PHYSICS_OPTIONS.map((key, index) => ({ id: index, label: `\${wiredfurni.params.movephysics.${key}}`, selected: form.options[index] }))}
            onToggle={(id, selected) => setForm(current => ({ ...current, options: current.options.map((old, index) => ((index === id) ? selected : old)) }))}
        />
    </WiredSection>
);
