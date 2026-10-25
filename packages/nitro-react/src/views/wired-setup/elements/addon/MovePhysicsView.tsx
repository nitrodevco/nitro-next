/**
 * `addons/MovePhysics.buildInputs` - one section (`select_options`) with the four physics
 * checkboxes.
 */
import { MOVE_PHYSICS_OPTIONS, MovePhysicsAddonForm, setWiredFlag, WiredElementView } from '#base/wired';

import { FlagsSection } from '../shared/FlagsSection';

const LABELS = MOVE_PHYSICS_OPTIONS.map(key => `\${wiredfurni.params.movephysics.${key}}`);

export const MovePhysicsView: WiredElementView<MovePhysicsAddonForm> = ({ form, setForm }) => (
    <FlagsSection
        title="${wiredfurni.params.select_options}"
        labels={LABELS}
        flags={form.flags}
        onToggle={(index, selected) => setForm(current => setWiredFlag(current, index, selected))}
    />
);
