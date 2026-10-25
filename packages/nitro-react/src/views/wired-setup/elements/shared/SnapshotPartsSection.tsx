/**
 * The `conditions` section `actiontypes/SetFurniStateTo` and `conditions/StatesMatch` both build in
 * their `buildInputs`: four checkboxes, `wiredfurni.params.condition.state`, `.direction`,
 * `.position` and `.altitude` - the parts of the snapshot to restore, or to compare.
 */
import { SET_FURNI_STATE_TO_PARTS, setWiredFlag, WiredElementViewProps, WiredFlagsForm } from '#base/wired';

import { FlagsSection } from './FlagsSection';

const LABELS = SET_FURNI_STATE_TO_PARTS.map(part => `\${wiredfurni.params.condition.${part}}`);

export const SnapshotPartsSection = ({ form, setForm }: Pick<WiredElementViewProps<WiredFlagsForm>, 'form' | 'setForm'>) => (
    <FlagsSection
        title="${wiredfurni.params.conditions}"
        labels={LABELS}
        flags={form.flags}
        onToggle={(index, selected) => setForm(current => setWiredFlag(current, index, selected))}
    />
);
