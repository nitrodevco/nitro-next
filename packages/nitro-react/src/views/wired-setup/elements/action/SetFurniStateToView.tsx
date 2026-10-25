/**
 * `actiontypes/SetFurniStateTo.buildInputs` - four checkboxes (state, direction, position,
 * altitude, captioned `wiredfurni.params.condition.<part>`) in the `wiredfurni.params.conditions`
 * section (`SnapshotPartsSection`).
 */
import { SetFurniStateToActionForm, WiredElementView } from '#base/wired';

import { SnapshotPartsSection } from '../shared/SnapshotPartsSection';

export const SetFurniStateToView: WiredElementView<SetFurniStateToActionForm> = ({ form, setForm }) => (
    <SnapshotPartsSection
        form={form}
        setForm={setForm}
    />
);
