/**
 * `triggerconfs/UserClicksUser.buildInputs` - the `click_user.settings` section with its two
 * checkboxes: block the user menu from opening, do not rotate.
 */
import { setWiredFlag, USER_CLICKS_USER_OPTIONS, UserClicksUserTriggerForm, WiredElementView } from '#base/wired';

import { FlagsSection } from '../shared/FlagsSection';

const LABELS = USER_CLICKS_USER_OPTIONS.map(key => `\${${key}}`);

export const UserClicksUserView: WiredElementView<UserClicksUserTriggerForm> = ({ form, setForm }) => (
    <FlagsSection
        title="${wiredfurni.params.click_user.settings}"
        labels={LABELS}
        flags={form.flags}
        onToggle={(index, selected) => setForm(current => setWiredFlag(current, index, selected))}
    />
);
