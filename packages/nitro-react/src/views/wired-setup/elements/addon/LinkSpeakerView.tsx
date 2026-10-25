/**
 * `_-z14` (Link Speaker) `.buildInputs` (WIN63-202610201032) - "Speak for:" with the two
 * checkboxes, Message (0) and Dataframe (1).
 */
import { LinkSpeakerForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export const LinkSpeakerView: WiredElementView<LinkSpeakerForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.link_speaker.speak_for}">
        <WiredCheckboxGroup
            options={[
                { id: 0, label: '${wiredfurni.params.link_speaker.message}', selected: form.message },
                { id: 1, label: '${wiredfurni.params.link_speaker.dataframe}', selected: form.dataframe },
            ]}
            onToggle={(id, selected) => setForm((id === 0) ? { message: selected } : { dataframe: selected })}
        />
    </WiredSection>
);
