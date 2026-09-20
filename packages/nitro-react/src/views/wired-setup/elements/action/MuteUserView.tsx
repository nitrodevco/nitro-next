/**
 * `actiontypes/MuteUser.buildInputs` - the message (`TextInputParam("", 100)`) in the
 * `wiredfurni.params.message` section, then the minutes slider (0 to 10).
 */
import { MUTE_USER_MAX_MINUTES, MUTE_USER_MESSAGE_MAX_LENGTH, MuteUserActionForm, SLIDER_CONVERTER_ECHO, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredSliderSection } from '../../kit/WiredSliderSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

export const MuteUserView: WiredElementView<MuteUserActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.message}">
            <WiredTextInput
                value={form.message}
                onChange={message => setForm({ message })}
                maxCharacters={MUTE_USER_MESSAGE_MAX_LENGTH}
            />
        </WiredSection>
        <WiredSliderSection
            titleKey="wiredfurni.params.length.minutes"
            unitKey="minutes"
            converter={SLIDER_CONVERTER_ECHO}
            min={0}
            max={MUTE_USER_MAX_MINUTES}
            step={1}
            value={form.minutes}
            onChange={minutes => setForm({ minutes })}
        />
    </>
);
