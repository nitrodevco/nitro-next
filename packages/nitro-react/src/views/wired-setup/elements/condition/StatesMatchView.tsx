/**
 * `conditions/StatesMatch.buildInputs` - the `conditions` section (`SnapshotPartsSection`): one
 * checkbox per part of the snapshot that has to match (`condition.state`, `.direction`,
 * `.position`, `.altitude`).
 */
import { StatesMatchConditionForm, WiredElementView } from '#base/wired';

import { SnapshotPartsSection } from '../shared/SnapshotPartsSection';

export const StatesMatchView: WiredElementView<StatesMatchConditionForm> = ({ form, setForm }) => (
    <SnapshotPartsSection
        form={form}
        setForm={setForm}
    />
);
