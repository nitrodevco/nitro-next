/**
 * `actiontypes/§_-P1o§.buildInputs` (CLICK_SETTINGS) - two sections with a dropdown each: what a
 * click on a user does (`wiredfurni.params.click_settings.user.0` to `.2`) and what a click on a
 * furni does (`...furni.0` / `.1`), each captioned with its section title.
 */
import { CLICK_SETTINGS_FURNI_OPTIONS, CLICK_SETTINGS_USER_OPTIONS, ClickSettingsActionForm, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';

const USER_OPTIONS = CLICK_SETTINGS_USER_OPTIONS.map(id => ({ id, label: `\${wiredfurni.params.click_settings.user.${id}}` }));
const FURNI_OPTIONS = CLICK_SETTINGS_FURNI_OPTIONS.map(id => ({ id, label: `\${wiredfurni.params.click_settings.furni.${id}}` }));

export const ClickSettingsView: WiredElementView<ClickSettingsActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.click_settings.user}">
            <WiredDropdown
                options={USER_OPTIONS}
                selected={form.user}
                onSelect={user => setForm({ user })}
                caption="${wiredfurni.params.click_settings.user}"
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.click_settings.furni}">
            <WiredDropdown
                options={FURNI_OPTIONS}
                selected={form.furni}
                onSelect={furni => setForm({ furni })}
                caption="${wiredfurni.params.click_settings.furni}"
            />
        </WiredSection>
    </>
);
