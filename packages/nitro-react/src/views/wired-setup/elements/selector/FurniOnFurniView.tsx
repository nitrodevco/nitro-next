/**
 * `selectors/FurniOnFurni.buildInputs` - the `selection_type` radio, `onfurni.0` to `.3`.
 */
import { FURNI_ON_FURNI_IDS, FurniOnFurniSelectorForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const OPTIONS = FURNI_ON_FURNI_IDS.map(id => ({ id, label: `\${wiredfurni.params.onfurni.${id}}` }));

export const FurniOnFurniView: WiredElementView<FurniOnFurniSelectorForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.selection_type}">
        <WiredRadioGroup
            options={OPTIONS}
            selected={form.selectionType}
            onSelect={selectionType => setForm({ selectionType })}
        />
    </WiredSection>
);
