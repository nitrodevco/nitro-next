/**
 * `selectors/UsersByName.buildInputs` - the names, one per line, in a 140 high text area of at
 * most 20 lines and 1000 characters (`TextAreaParam(140, -1, 20, -1, 1000)`).
 */
import { USERS_BY_NAME_HEIGHT, USERS_BY_NAME_MAX_CHARACTERS, USERS_BY_NAME_MAX_LINES, UsersByNameSelectorForm, WiredElementView } from '#base/wired';

import { WiredSection } from '../../kit/WiredSection';
import { WiredTextArea } from '../../kit/WiredTextArea';

export const UsersByNameView: WiredElementView<UsersByNameSelectorForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.enter_names}">
        <WiredTextArea
            value={form.names}
            onChange={names => setForm({ names })}
            height={USERS_BY_NAME_HEIGHT}
            maxLines={USERS_BY_NAME_MAX_LINES}
            maxCharacters={USERS_BY_NAME_MAX_CHARACTERS}
        />
    </WiredSection>
);
