/**
 * `actiontypes/KickFromRoom.buildInputs` - the message (`TextInputParam("", 100)`) in the
 * `wiredfurni.params.message` section.
 */
import { KICK_FROM_ROOM_MESSAGE_MAX_LENGTH, KickFromRoomActionForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredTextInput } from '../../kit/WiredTextInput';

export const KickFromRoomView: WiredElementView<KickFromRoomActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.message}">
        <WiredTextInput
            value={form.message}
            onChange={message => setForm({ message })}
            maxCharacters={KICK_FROM_ROOM_MESSAGE_MAX_LENGTH}
        />
    </WiredSection>
);
