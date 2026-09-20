/**
 * `selectors/UsersByType.buildInputs` - the `usertype` radio: `usertype.1`, `.2`, `.4`.
 */
import { USERS_BY_TYPE_IDS, UsersByTypeSelectorForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const OPTIONS = USERS_BY_TYPE_IDS.map(id => ({ id, label: `\${wiredfurni.params.usertype.${id}}` }));

export const UsersByTypeView: WiredElementView<UsersByTypeSelectorForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.usertype}">
        <WiredRadioGroup
            options={OPTIONS}
            selected={form.userType}
            onSelect={userType => setForm({ userType })}
        />
    </WiredSection>
);
