/**
 * `actiontypes/MoveUserToFurni.buildInputs` - the walk mode radio (`user_move.walkmode.0` to `.2`)
 * in the `user_move.walkmode` section.
 */
import { MOVE_USER_TO_FURNI_WALK_MODES, MoveUserToFurniActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const OPTIONS = MOVE_USER_TO_FURNI_WALK_MODES.map(id => ({ id, label: `\${wiredfurni.params.user_move.walkmode.${id}}` }));

export const MoveUserToFurniView: WiredElementView<MoveUserToFurniActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.user_move.walkmode}">
        <WiredRadioGroup
            options={OPTIONS}
            selected={form.walkMode}
            onSelect={walkMode => setForm({ walkMode })}
        />
    </WiredSection>
);
