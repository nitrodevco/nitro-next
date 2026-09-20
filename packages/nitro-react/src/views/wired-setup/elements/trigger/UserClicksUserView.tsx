/**
 * `triggerconfs/UserClicksUser.buildInputs` - the `click_user.settings` section with its two
 * checkboxes: block the user menu from opening, do not rotate.
 */
import { USER_CLICKS_USER_OPTIONS, UserClicksUserTriggerForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export const UserClicksUserView: WiredElementView<UserClicksUserTriggerForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.click_user.settings}">
        <WiredCheckboxGroup
            options={USER_CLICKS_USER_OPTIONS.map((key, id) => ({ id, label: `\${${key}}`, selected: form.options[id] ?? false }))}
            onToggle={(id, selected) => setForm(current => ({ ...current, options: current.options.map((value, index) => (index === id) ? selected : value) }))}
        />
    </WiredSection>
);
