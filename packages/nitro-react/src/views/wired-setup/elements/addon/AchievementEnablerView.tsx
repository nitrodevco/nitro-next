/**
 * `addons/§_-Iy§.buildInputs` - the text (`TextAreaParam(60, -1, -1, 100, 2000, "",
 * achievement_enabler.placeholder)`: 60 high, up to 2000 characters) in the
 * `achievement_enabler` section.
 */
import { ACHIEVEMENT_ENABLER_HEIGHT, ACHIEVEMENT_ENABLER_MAX_LENGTH, AchievementEnablerAddonForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredTextArea } from '../../kit/WiredTextArea';

export const AchievementEnablerView: WiredElementView<AchievementEnablerAddonForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.achievement_enabler}">
        <WiredTextArea
            value={form.text}
            onChange={text => setForm({ text })}
            height={ACHIEVEMENT_ENABLER_HEIGHT}
            maxCharacters={ACHIEVEMENT_ENABLER_MAX_LENGTH}
            placeholder="${wiredfurni.params.achievement_enabler.placeholder}"
        />
    </WiredSection>
);
