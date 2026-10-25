/**
 * `selectors/UsersByType.buildInputs` - the `usertype` radio (`UserTypeSection`): `usertype.1`,
 * `.2`, `.4`.
 */
import { UsersByTypeSelectorForm, WiredElementView } from '#base/wired';

import { UserTypeSection } from '../shared/UserTypeSection';

export const UsersByTypeView: WiredElementView<UsersByTypeSelectorForm> = ({ form, setForm }) => (
    <UserTypeSection
        selected={form.userType}
        onSelect={userType => setForm({ userType })}
    />
);
